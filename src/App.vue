<script setup>
import { ref, onMounted } from "vue";

const telegramUser = ref(null); // Данные пользователя
const serverResponse = ref(null); // Ответ от сервера
const userNotFound = ref(false); // Флаг "пользователь не найден"
const errorDetails = ref(null); // Детали ошибки
const telegramIdType = ref(""); // Тип данных telegramId
const telegramIdValue = ref(""); // Значение telegramId
const serverRequestDetails = ref(null); // Детали запроса
const isLoading = ref(true); // Флаг загрузки данных

async function fetchUserFromServer(telegramId) {
  telegramIdType.value = typeof telegramId;
  telegramIdValue.value = String(telegramId); // Преобразуем в строку
  console.log('start',telegramIdValue.value);
  
  const requestUrl = `https://095d-176-37-193-72.ngrok-free.app/api/users/${telegramIdValue.value}`;
  serverRequestDetails.value = { url: requestUrl, telegramId: telegramIdValue.value };
  isLoading.value = true;

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "ngrok-skip-browser-warning": "true", // Устранение предупреждения ngrok
      },
    });

    // Логируем ответ для отладки
    console.log(`HTTP ${response.status}: ${response.statusText}`);

    serverResponse.value = {
      status: response.status,
      statusText: response.statusText,
      requestUrl,
    };

    // Проверяем статус ответа
    if (!response.ok) {
      throw new Error(`HTTP ошибка: ${response.status} ${response.statusText}`);
    }

    // Проверяем тип контента
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Ответ сервера не является JSON");
    }

    // Парсим ответ
    const data = await response.json();
    serverResponse.value.data = data;

    // Проверяем успешность ответа
    if (data.success) {
      telegramUser.value = data.user; // Сохраняем данные пользователя
    } else {
      userNotFound.value = true;
      errorDetails.value = {
        message: data.message || "Пользователь не найден",
        telegramId: telegramIdValue.value,
      };
    }
  } catch (error) {
    // Обрабатываем ошибки
    userNotFound.value = true;
    errorDetails.value = {
      message: "Ошибка при запросе к серверу",
      details: error.message,
      telegramId: telegramIdValue.value,
      requestUrl,
    };
    console.error("Ошибка запроса:", error);
  } finally {
    // Убираем состояние загрузки
    isLoading.value = false;
  }
}
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const tgWebAppData = urlParams.get("tgWebAppData");
  console.log('onMounted',telegramIdValue.value);
  
  if (tgWebAppData) {
    try {
      const userData = JSON.parse(decodeURIComponent(tgWebAppData));
      if (!userData.id) {
        throw new Error("Telegram ID отсутствует в данных");
      }

      serverResponse.value = { telegramData: userData }; // Данные Telegram
      fetchUserFromServer(userData.id); // Проверяем пользователя на сервере
    } catch (error) {
      userNotFound.value = true;
      errorDetails.value = {
        message: "Ошибка при обработке tgWebAppData",
        details: error.message,
      };
      isLoading.value = false;
    }
  } else {
    userNotFound.value = true;
    errorDetails.value = { message: "tgWebAppData отсутствует в URL" };
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="app-container" v-auto-animate>
    <!-- Приветствие, если пользователь найден -->
    <h1 class="text-xl font-bold text-center my-4">
      <span v-if="telegramUser">
        <span class="text-lg font-normal">👋 Добро пожаловать в </span>
        Task Manager
        <span class="block"> {{ telegramUser.first_name }} 🚀 </span>
      </span>
      
      <!-- Сообщение, если пользователь не найден -->
      <span v-else>
        Пожалуйста, войдите через Telegram для доступа к приложению.
      </span>
    </h1>
    
    <!-- Вывод контента на основе роутов -->
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>