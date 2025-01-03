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

const initData = window.Telegram?.WebApp?.initData || null;

console.log("initData из Telegram:", initData);

if (initData) {
  console.log("Отправка initData на сервер:", initData);
  fetch(`${API_BASE_URL}/users/verify-init-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ initData }),
  })
    .then((response) => {
      console.log("Ответ сервера на verify-init-data:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Данные от сервера verify-init-data:", data);
      if (data.success) {
        console.log(
          "Авторизация успешна. Сохранение данных пользователя:",
          data.user
        );
        localStorage.setItem("telegram_user", JSON.stringify(data.user));
      } else {
        console.error("Ошибка авторизации:", data.error);
      }
    })
    .catch((error) => console.error("Ошибка при авторизации:", error));
} else {
  console.warn("Telegram WebApp не доступен. Приложение открыто вне Telegram.");
}
app.mount("#app");
