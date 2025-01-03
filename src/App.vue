<script setup>
import { onMounted } from "vue";

const API_BASE_URL = "http://localhost:3082/api";

onMounted(() => {
  const token = localStorage.getItem("user_token");
  if (token) {
    fetch(`${API_BASE_URL}/users/auth?token=${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Авторизация успешна.") {
          console.log("Пользователь успешно авторизован:", data.user);
          // Обновите состояние приложения или отобразите информацию о пользователе
        } else {
          console.error("Ошибка авторизации:", data.error);
        }
      })
      .catch((error) => console.error("Ошибка при авторизации:", error));
  }
});
</script>

<template>
  <div class="app-container">
    <h1 class="text-2xl font-bold text-center mb-4">Task Manager</h1>
    <RouterView /> <!-- Подключение роутов -->
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>