<script setup>
import { onMounted } from "vue";

const API_BASE_URL = "http://localhost:3082/api";

onMounted(() => {
  const token = localStorage.getItem("user_token");
  console.log("Токен при монтировании:", token);
  
  if (token) {
    fetch(`${API_BASE_URL}/users/auth?token=${token}`)
      .then((response) => {
        console.log("Ответ от сервера в onMounted:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Данные авторизации в onMounted:", data);
        if (data.message === "Авторизация успешна.") {
          console.log("Пользователь успешно авторизован:", data.user);
        } else {
          console.error("Ошибка авторизации:", data.error);
        }
      })
      .catch((error) => console.error("Ошибка при авторизации в onMounted:", error));
  }
});
</script>

<template>
  <div class="app-container">
    <h1 class="text-2xl font-bold text-center mb-4">Task Manager</h1>
    <p v-if="token">Ваш токен: {{ token }}</p>
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>