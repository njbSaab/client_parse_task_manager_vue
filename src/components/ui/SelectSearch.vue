<template>
  <div class="flex flex-col space-y-4 w-[95%] md:max-w-sm md:min-w-[80%] mx-auto">
    <span>Выберите сколько раз в (час, день, неделю, месяц) выполнить поиск</span>

    <!-- Списки -->
    <Dropdown :items="firstItems" v-model="selectedFirstItem" />
    <Dropdown :items="secondItems" v-model="selectedSecondItem" />

    <!-- Динамический текст -->
    <span>
      Выполнить <strong>{{ selectedFirstItem?.label || "..." }}</strong> поиск(а) в
      <strong>{{ selectedSecondItem?.label || "..." }}</strong>
    </span>

    <!-- Кнопка отправки -->
    <BtnSearch @click="handleSubmit" />

    <!-- Уведомление -->
    <PopoverIsSuccess />

    <!-- Логи запросов -->
    <div v-if="logs.length" class="mt-28 p-4 border rounded bg-gray-100 text-slate-300">
      <h2 class="font-bold text-lg">Логи запросов</h2>
      <ul class="text-sm">
        <li v-for="(log, index) in logs" :key="index">
          <span class="font-bold">Запрос:</span> {{ log.request }} <br />
          <span class="font-bold">Ответ:</span> {{ log.response }} <br />
          <span class="font-bold">Время:</span> {{ log.time }}
        </li>
      </ul>
    </div>
    <div v-else class="mt-4 text-gray-500">
      Логи запросов отсутствуют.
    </div>

    <!-- Отображение данных из localStorage -->
    <div class="mt-4 p-4 border rounded bg-gray-100">
      <h2 class="font-bold text-lg">Данные из localStorage</h2>
      <pre class="text-sm bg-gray-200 p-2 rounded">
        {{ telegramUserFromStorage }}
      </pre>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import Dropdown from "./Dropdown.vue";
import { useFormStore } from "@/stores/formStore";
import BtnSearch from "./BtnSearch.vue";
import PopoverIsSuccess from "./PopoverIsSuccess.vue";

const formStore = useFormStore();
const logs = ref([]); // Массив для хранения логов
const telegramUserFromStorage = ref(null); // Telegram данные из localStorage

// Данные для выпадающих списков
const firstItems = ref([
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "5" },
]);
const secondItems = ref([
  { id: 1, label: "Час" },
  { id: 2, label: "День" },
  { id: 3, label: "Неделю" },
  { id: 4, label: "Месяц" },
]);

const selectedFirstItem = ref(firstItems.value[0]);
const selectedSecondItem = ref(secondItems.value[0]);

// Слушаем изменения в выпадающих списках
watch([selectedFirstItem, selectedSecondItem], ([first, second]) => {
  const periodMap = {
    Час: 60,
    День: 1440,
    Неделю: 10080,
    Месяц: 43200,
  };

  if (!first || !second) return;

  formStore.formData.frequency = parseInt(first.label);
  formStore.formData.period = second.label;

  const totalMinutes = periodMap[second.label];
  const calculatedInterval = Math.round(totalMinutes / formStore.formData.frequency);
  formStore.formData.interval = `${calculatedInterval}m`;
});

const handleSubmit = async () => {
  try {
    console.log("Кнопка нажата...");
    await formStore.submitForm();

    // Добавляем успешный лог
    logs.value.push({
      request: JSON.stringify(formStore.formData),
      response: "Задача успешно создана",
      time: new Date().toLocaleTimeString(),
    });
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);

    // Добавляем лог ошибки
    logs.value.push({
      request: JSON.stringify(formStore.formData),
      response: error.message || "Неизвестная ошибка",
      time: new Date().toLocaleTimeString(),
    });
  }
};

// Загружаем данные из localStorage при монтировании компонента
onMounted(() => {
  try {
    const storedUser = localStorage.getItem("telegram_user");
    if (storedUser) {
      telegramUserFromStorage.value = JSON.parse(storedUser);
      console.log("Данные из localStorage:", telegramUserFromStorage.value);
    } else {
      console.warn("Нет данных в localStorage по ключу 'telegram_user'.");
    }
  } catch (error) {
    console.error("Ошибка при чтении из localStorage:", error);
  }
});
</script>