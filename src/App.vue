<script setup>
import { ref, onMounted } from "vue";

const telegramUser = ref(null);

onMounted(() => {
  const userData = localStorage.getItem("telegram_user");
  console.log("Данные из localStorage:", userData);

  if (userData) {
    telegramUser.value = JSON.parse(userData);
    console.log("Загруженные данные пользователя:", telegramUser.value);
  } else {
    console.warn("Данные пользователя в localStorage отсутствуют.");
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