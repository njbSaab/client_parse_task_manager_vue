<script setup>
import { ref, onMounted } from "vue";
import { API_BASE_URL } from "./consts/const";

const telegramUser = ref(null); // Данные пользователя
const serverResponse = ref(null); // Ответ от сервера
const userNotFound = ref(false); // Флаг "пользователь не найден"
const errorDetails = ref(null); // Детали ошибки
const telegramIdType = ref(""); // Тип данных telegramId
const telegramIdValue = ref(""); // Значение telegramId
const serverRequestDetails = ref(null); // Детали запроса
const isLoading = ref(true); // Флаг загрузки данных
const isStoredInLocalStorage = ref(false); // Флаг успешной записи в localStorage

async function fetchUserFromServer(telegramId) {
  telegramIdType.value = typeof telegramId;
  telegramIdValue.value = String(telegramId); // Преобразуем в строку

  const requestUrl = `${API_BASE_URL}/users/${telegramIdValue.value}`;
  serverRequestDetails.value = { url: requestUrl, telegramId: telegramIdValue.value };
  isLoading.value = true;

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
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

      // Записываем данные в localStorage
      localStorage.setItem("telegram_user", JSON.stringify(data.user));
      isStoredInLocalStorage.value = true; // Флаг успешной записи
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

      serverResponse.value = { telegramData: userData };
      fetchUserFromServer(userData.id);
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
  <div class="app-container bg-white h-full">
    <!-- Приветствие, если пользователь найден -->
    <h1 class="text-xl font-bold text-center my-4">
      <span v-if="telegramUser">
        <span class="text-lg font-normal">👋 Добро пожаловать в </span>
        Task Manager
        <span class="block"> {{ telegramUser.first_name }} 🚀 </span>
      </span>
      <span v-else> Пожалуйста, войдите через Telegram для доступа к приложению. </span>
    </h1>

    <!-- Проверка записи в localStorage -->
    <!-- <div v-if="isStoredInLocalStorage" class="text-green-500 text-center">
      Данные успешно записаны в localStorage! 🚀
    </div> -->

    <!-- <div v-if="!isLoading && telegramUser" class="text-red-500 text-center">
      Не удалось записать данные в localStorage.
    </div> -->

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
