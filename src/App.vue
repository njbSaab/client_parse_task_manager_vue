<script setup>
import { ref, onMounted } from "vue";

const telegramUser = ref(null);
const userNotFound = ref(false);

// Функция для проверки пользователя на сервере
async function fetchUserFromServer(telegramId) {
  try {
    const response = await fetch(`http://localhost:3082/api/users/${telegramId}`, {
      method: "GET",
    });
    const data = await response.json();

    if (data.success) {
      console.log("Пользователь найден на сервере:", data.user);
      telegramUser.value = data.user;
    } else {
      console.warn("Пользователь не найден:", data.message);
      userNotFound.value = true;
    }
  } catch (error) {
    console.error("Ошибка при проверке пользователя на сервере:", error);
    userNotFound.value = true;
  }
}

// Обработка при монтировании компонента
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const tgWebAppData = urlParams.get("tgWebAppData");

  if (tgWebAppData) {
    try {
      const userData = JSON.parse(decodeURIComponent(tgWebAppData));
      console.log("Данные пользователя из tgWebAppData:", userData);

      // Проверяем пользователя на сервере
      fetchUserFromServer(userData.id);
    } catch (error) {
      console.error("Ошибка при парсинге tgWebAppData:", error);
      userNotFound.value = true;
    }
  } else {
    console.warn("tgWebAppData отсутствует в URL.");
    userNotFound.value = true;
  }
});
</script>

<template>
  <div class="app-container" v-auto-animate>
    <!-- Отображение данных пользователя -->
    <h1 class="text-xl font-bold text-center my-4">
      <span v-if="telegramUser">
        <span class="text-lg font-normal">👋 Добро пожаловать в </span>
        Task Manager
        <span class="block"> {{ telegramUser.first_name }} 🚀 </span>
      </span>
      <!-- Сообщение, если пользователь не найден -->
      <span v-else-if="userNotFound">
        Пожалуйста, зарегистрируйтесь через Telegram для доступа к приложению.
      </span>
      <!-- Сообщение, если данные всё ещё загружаются -->
      <span v-else>
        Загрузка данных...
      </span>
    </h1>

    <RouterView v-if="telegramUser" />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>