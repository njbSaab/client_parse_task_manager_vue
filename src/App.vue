<script setup>
import { ref, onMounted } from "vue";

const telegramUser = ref(null);

async function saveUserDataToServer(userData) {
  try {
    const response = await fetch("http://localhost:3082/api/users/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    if (result.success) {
      console.log("Данные пользователя успешно сохранены:", result);
    } else {
      console.error("Ошибка при сохранении данных на сервере:", result.error);
    }
  } catch (error) {
    console.error("Ошибка при отправке данных на сервер:", error);
  }
}

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const tgWebAppData = urlParams.get("tgWebAppData");

  if (tgWebAppData) {
    try {
      const userData = JSON.parse(decodeURIComponent(tgWebAppData));
      console.log("Данные пользователя из tgWebAppData:", userData);

      // Сохраняем в localStorage
      localStorage.setItem("telegram_user", JSON.stringify(userData));
      telegramUser.value = userData;

      // Отправляем данные на сервер
      saveUserDataToServer(userData);
    } catch (error) {
      console.error("Ошибка при парсинге tgWebAppData:", error);
    }
  } else {
    const localData = localStorage.getItem("telegram_user");
    if (localData) {
      try {
        telegramUser.value = JSON.parse(localData);
        console.log("Данные из localStorage:", telegramUser.value);
      } catch (error) {
        console.error("Ошибка при чтении данных из localStorage:", error);
        localStorage.removeItem("telegram_user");
      }
    } else {
      console.warn("tgWebAppData отсутствует, и localStorage пустой.");
    }
  }
});
</script>

<template>
  <div class="app-container">
    <h1 class="text-2xl font-bold text-center mb-4">Task Manager</h1>
    <div v-if="telegramUser">
      <p>Добро пожаловать, {{ telegramUser.first_name }}!</p>
    </div>
    <div v-else>
      <p>Пожалуйста, войдите через Telegram для доступа к приложению.</p>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>