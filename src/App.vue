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

    serverResponse.value = {
      status: response.status,
      statusText: response.statusText,
      requestUrl,
    };

    if (!response.ok) {
      throw new Error(`HTTP ошибка: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Ответ сервера не является JSON");
    }

    const data = await response.json();
    serverResponse.value.data = data;

    if (data.success) {
      telegramUser.value = data.user;
    } else {
      userNotFound.value = true;
      errorDetails.value = {
        message: data.message || "Пользователь не найден",
        telegramId: telegramIdValue.value,
      };
    }
  } catch (error) {
    userNotFound.value = true;
    errorDetails.value = {
      message: "Ошибка при запросе к серверу",
      details: error.message,
      telegramId: telegramIdValue.value,
      requestUrl,
    };
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const tgWebAppData = urlParams.get("tgWebAppData");

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
  <div class="app-container">
    <!-- Если данные загружаются -->
    <span v-if="isLoading" class="text-blue-500">Загрузка данных...</span>

    <!-- Если пользователь найден -->
    <h1 v-else-if="telegramUser" class="text-xl font-bold text-center my-4">
      <span class="text-lg font-normal">👋 Добро пожаловать в </span>
      Task Manager
      <span class="block">{{ telegramUser.first_name }} 🚀</span>
    </h1>

    <!-- Если пользователь не найден -->
    <div v-else class="text-red-500">
      <p><strong>Пользователь не найден</strong></p>
      <p v-if="errorDetails">Ошибка: {{ errorDetails.message }}</p>
      <p v-if="errorDetails?.details">Детали: {{ errorDetails.details }}</p>
      <p v-if="errorDetails?.telegramId">Telegram ID: {{ errorDetails.telegramId }}</p>
    </div>

    <!-- Отображение данных ответа сервера -->
    <div v-if="serverResponse" class="mt-8 p-4 border rounded bg-gray-50">
      <h2 class="font-bold text-lg">Данные сервера</h2>
      <p><strong>HTTP Статус:</strong> {{ serverResponse.status }} - {{ serverResponse.statusText }}</p>
      <p><strong>Запрос:</strong> {{ serverResponse.requestUrl }}</p>
      <pre class="text-sm bg-gray-100 p-2 rounded overflow-auto">
        {{ serverResponse.data }}
      </pre>
    </div>

    <!-- Отображение деталей запроса -->
    <div v-if="serverRequestDetails" class="mt-4 p-4 border rounded bg-gray-50">
      <h2 class="font-bold text-lg">Детали запроса</h2>
      <p><strong>URL:</strong> {{ serverRequestDetails.url }}</p>
      <p><strong>Telegram ID:</strong> {{ serverRequestDetails.telegramId }}</p>
    </div>

    <!-- Отображение типа и значения telegramId -->
    <div class="mt-4 p-4 border rounded bg-gray-50">
      <h2 class="font-bold text-lg">Детали Telegram ID</h2>
      <p><strong>Тип данных:</strong> {{ telegramIdType }}</p>
      <p><strong>Значение:</strong> "{{ telegramIdValue }}"</p>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>