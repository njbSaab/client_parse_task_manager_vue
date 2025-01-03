<script setup>
import { ref } from "vue";

// Получаем токен из localStorage
const token = ref(localStorage.getItem("user_token"));
</script>

<template>
  <div class="app-container p-4">
    <h1 class="text-2xl font-bold text-center mb-4">Task Manager</h1>
    <div v-if="token" class="text-center text-green-500">
      Токен успешно получен: <strong>{{ token }}</strong>
    </div>
    <div v-else class="text-center text-red-500">
      Токен не найден. Пожалуйста, авторизуйтесь.
    </div>
    <RouterView /> <!-- Динамический рендеринг страниц -->
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>