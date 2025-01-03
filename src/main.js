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

app.use(router); // Подключение маршрутизации
app.use(autoAnimatePlugin); // Подключение плагина анимации
app.use(pinia); // Подключение Pinia

// Извлечение токена из URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

console.log(token);

if (token) {
  localStorage.setItem("user_token", token); // Сохраняем токен в localStorage
}

// Переадресация на домашнюю страницу, если есть токен
if (token && window.location.pathname === "/") {
  router.replace({ name: "home" });
}

app.mount("#app");
