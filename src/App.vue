<script setup>
import { onMounted } from 'vue';
import { useTelegramService } from './services/telegramService';

// Используем сервис
const {
  telegramUser,
  userNotFound,
  errorDetails,
  isLoading,
  isStoredInLocalStorage,
  initializeFromTelegramData,
} = useTelegramService();

onMounted(() => {
  // Инициализируем данные из Telegram при монтировании
  initializeFromTelegramData();
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
      <span v-else-if="isLoading"> Загрузка данных... </span>
      <span v-else> Пожалуйста, войдите через Telegram для доступа к приложению. </span>
    </h1>

    <!-- Сообщение об ошибке -->
    <div v-if="userNotFound && !isLoading" class="text-red-500 text-center">
      {{ errorDetails?.message || 'Произошла ошибка' }}
    </div>

    <!-- Проверка записи в localStorage -->
    <!-- <div v-if="isStoredInLocalStorage" class="text-green-500 text-center">
      Данные успешно записаны в localStorage! 🚀
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