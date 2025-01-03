// main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import "@material-tailwind/html/scripts/ripple";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(autoAnimatePlugin);
app.use(pinia);

const API_BASE_URL = "http://localhost:3082/api";

// Извлечение initData
const initData = window.Telegram.WebApp.initData || "";
console.log("Получен initData:", initData);

if (initData) {
  // Отправляем initData на сервер для проверки
  fetch(`${API_BASE_URL}/users/verify-init-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ initData }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Авторизация успешна:", data.user);
        // Сохраняем информацию о пользователе, если нужно
      } else {
        console.error("Ошибка авторизации:", data.error);
      }
    })
    .catch((error) => console.error("Ошибка при авторизации:", error));
}

app.mount("#app");
