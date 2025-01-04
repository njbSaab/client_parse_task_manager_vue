<template>
  <div class="flex flex-col space-y-4 w-full md:max-w-sm md:min-w-[80%] mx-auto">
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
    <BtnSearch @click="formStore.submitForm" />
    <!-- Уведомление -->
    <PopoverIsSuccess />

  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Dropdown from "./Dropdown.vue";
import { useFormStore } from "@/stores/formStore";
import BtnSearch from "./BtnSearch.vue"
import PopoverIsSuccess from "./PopoverIsSuccess.vue"

const formStore = useFormStore();

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

watch([selectedFirstItem, selectedSecondItem], ([first, second]) => {
  console.log("Dropdown values updated:", { first, second });

  const periodMap = {
    Час: 60,
    День: 1440,
    Неделю: 10080,
    Месяц: 43200,
  };

  if (!first || !second) {
    console.log("Dropdown values are not properly set.");
    return;
  }

  formStore.formData.period = second.label; // Обновляем period
  console.log("Updated period in formData:", formStore.formData.period);

  const totalMinutes = periodMap[second.label];
  const calculatedInterval = Math.round(totalMinutes / parseInt(first.label));
  formStore.formData.interval = `${calculatedInterval}m`;
  
  console.log("Перед отправкой: formData.period:", this.formData.period);
  console.log("Чистый объект для отправки на сервер:", cleanFormData);
  console.log("Updated interval in formData:", formStore.formData.interval);
});
</script>
