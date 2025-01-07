<script setup>
import { ref, onMounted } from "vue";

const telegramUser = ref(null); // Данные пользователя
const serverResponse = ref(null); // Ответ от сервера
const userNotFound = ref(false); // Флаг "пользователь не найден"
const errorDetails = ref(null); // Детали ошибки
const telegramIdType = ref(""); // Тип данных telegramId
const telegramIdValue = ref(""); // Значение telegramId

// Функция для проверки пользователя на сервере
async function fetchUserFromServer(telegramId) {
  telegramIdType.value = typeof telegramId; // Определяем тип данных
  telegramIdValue.value = telegramId; // Сохраняем значение

  try {
    const response = await fetch(`http://localhost:3082/api/users/${telegramId}`, {
      method: "GET",
    });

    // Сохраняем статус ответа
    serverResponse.value = {
      status: response.status,
      statusText: response.statusText,
    };

    const data = await response.json();
    serverResponse.value.data = data;

    if (data.success) {
      telegramUser.value = data.user;
    } else {
      userNotFound.value = true;
      errorDetails.value = {
        message: data.message || "Пользователь не найден",
        telegramId,
      };
    }
  } catch (error) {
    userNotFound.value = true;
    errorDetails.value = {
      message: "Ошибка при запросе к серверу",
      details: error.message,
      telegramId,
    };
  }
}

// Обработка при монтировании компонента
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const tgWebAppData = urlParams.get("tgWebAppData");

  if (tgWebAppData) {
    try {
      const userData = JSON.parse(decodeURIComponent(tgWebAppData));
      serverResponse.value = { telegramData: userData }; // Данные Telegram
      fetchUserFromServer(userData.id); // Проверяем пользователя на сервере
    } catch (error) {
      userNotFound.value = true;
      errorDetails.value = {
        message: "Ошибка при парсинге tgWebAppData",
        details: error.message,
      };
    }
  } else {
    userNotFound.value = true;
    errorDetails.value = { message: "tgWebAppData отсутствует в URL" };
  }
});
</script><template>
  <div class="app-container">
    <!-- Если пользователь найден -->
    <h1 class="text-xl font-bold text-center my-4">
      <span v-if="telegramUser">
        <span class="text-lg font-normal">👋 Добро пожаловать в </span>
        Task Manager
        <span class="block"> {{ telegramUser.first_name }} 🚀 </span>
      </span>

      <!-- Если пользователь не найден -->
      <span v-else-if="userNotFound" class="text-red-500">
        <p><strong>Пользователь не найден</strong></p>
        <p v-if="errorDetails">Ошибка: {{ errorDetails.message }}</p>
        <p v-if="errorDetails?.details">Детали: {{ errorDetails.details }}</p>
        <p v-if="errorDetails?.telegramId">Telegram ID: {{ errorDetails.telegramId }}</p>
      </span>

      <!-- Если данные загружаются -->
      <span v-else>
        Загрузка данных...
      </span>
    </h1>

    <!-- Отображение данных ответа сервера -->
    <div v-if="serverResponse" class="mt-8 p-4 border rounded bg-gray-50">
      <h2 class="font-bold text-lg">Данные сервера</h2>
      <p><strong>HTTP Статус:</strong> {{ serverResponse.status }} - {{ serverResponse.statusText }}</p>
      <pre class="text-sm bg-gray-100 p-2 rounded overflow-auto">
        {{ serverResponse.data }}
      </pre>
    </div>

    <!-- Отображение типа и значения telegramId -->
    <div class="mt-4 p-4 border rounded bg-gray-50">
      <h2 class="font-bold text-lg">Детали Telegram ID</h2>
      <p><strong>Тип данных:</strong> {{ telegramIdType }}</p>
      <p><strong>Значение:</strong> {{ telegramIdValue }}</p>
    </div>

    <RouterView v-if="telegramUser" />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>