<script setup>
import { ref, onMounted } from "vue";

const telegramUser = ref(null);

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
    } catch (error) {
      console.error("Ошибка при парсинге tgWebAppData:", error);
    }
  } else {
    const localData = localStorage.getItem("telegram_user");
    if (localData) {
      telegramUser.value = JSON.parse(localData);
      console.log("Данные из localStorage:", telegramUser.value);
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
      <p>Ваш Telegram ID: {{ telegramUser.id }}</p>
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