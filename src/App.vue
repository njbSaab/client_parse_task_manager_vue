<script setup>
import { onMounted } from "vue";
import { useUser } from "./composables/useUser";
import IsLoading from "@/components/ui/IsLoading.vue"; 
const {
  telegramUser,
  serverResponse,
  userNotFound,
  errorDetails,
  isLoading,
  fetchUserFromServer,
} = useUser();

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
    }
  } else {
    userNotFound.value = true;
    errorDetails.value = { message: "tgWebAppData отсутствует в URL" };
  }
});
</script>

<template>
  <div class="app-container bg-white h-full">
    <IsLoading v-if="isLoading" />
    
    <div v-else>
      <h1 class="text-xl font-bold text-center my-4">
        <span v-if="telegramUser">
          <span class="text-lg font-normal">👋 Добро пожаловать в </span>
          Task Manager
          <span class="block"> {{ telegramUser.first_name }} 🚀 </span>
        </span>
        <span v-else>
          Пожалуйста, войдите через Telegram для доступа к приложению.
        </span>
      </h1>
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>