<script setup>
import { onMounted } from 'vue';
import { useTelegramService } from './services/telegramService';

const {
  telegramUser,
  userNotFound,
  errorDetails,
  isLoading,
  isStoredInLocalStorage,
  initializeTelegram,
} = useTelegramService();

onMounted(() => {
  initializeTelegram();
});
</script>

<template>
  <div class="app-container bg-white h-full">
    <h1 class="text-xl font-bold text-center my-4">
      <span v-if="telegramUser">
        <span class="text-lg font-normal">👋 Добро пожаловать в </span>
        Task Manager
        <span class="block"> {{ telegramUser.first_name }} 🚀 </span>
      </span>
      <span v-else-if="isLoading"> Загрузка данных... </span>
      <span v-else> Пожалуйста, войдите через Telegram для доступа к приложению. </span>
    </h1>

    <div v-if="userNotFound && !isLoading" class="text-red-500 text-center">
      {{ errorDetails?.message || 'Произошла ошибка' }}
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