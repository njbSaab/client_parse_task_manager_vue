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

// Извлечение токена из URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

if (token) {
  localStorage.setItem("user_token", token);
}

// Проверка токена при загрузке приложения
const storedToken = localStorage.getItem("user_token");
console.log("Извлеченный токен из localStorage:", storedToken);

if (storedToken) {
  fetch(`${API_BASE_URL}/users/auth?token=${storedToken}`)
    .then((response) => {
      console.log("Ответ сервера:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Данные сервера:", data);
      if (data.message === "Авторизация успешна.") {
        console.log("Пользователь успешно авторизован:", data.user);
        // Дополнительная логика, если нужно
      } else {
        console.error("Ошибка авторизации:", data.error);
      }
    })
    .catch((error) => console.error("Ошибка при авторизации:", error));
}
app.mount("#app");
