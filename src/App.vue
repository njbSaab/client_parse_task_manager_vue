<script setup>
import { ref, onMounted } from "vue";

const telegramUser = ref(null);

async function saveUserDataToServer(userData) {
  try {
    const response = await 
    fetch("http://localhost:3082/api/users/save", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
})
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      console.log("Пользователь успешно сохранен:", data.user);
    } else {
      console.error("Ошибка при сохранении пользователя:", data.error);
    }
  })
  .catch((error) => console.error("Ошибка запроса:", error));
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
  <div class="app-container" v-auto-animate>
    <h1 class="text-xl font-bold text-center my-4">
      <span v-if="telegramUser">
         <span class="text-lg font-normal">👋 Добро пожаловать в </span>
         Task Manager
       <span class="block">  {{ telegramUser.first_name }} 🚀 </span>
      </span>
      <span v-else> Пожалуйста, войдите через Telegram для доступа к приложению.</span> 
    </h1>
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>