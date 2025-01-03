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

// Получение данных от Telegram Web App
const tg = window.Telegram?.WebApp;

if (tg) {
  const initData = tg.initData || null;

  if (initData) {
    const params = new URLSearchParams(initData);
    const userData = Object.fromEntries(params);
    console.log("Данные Telegram Web App:", userData);

    // Проверяем подпись
    fetch(`${API_BASE_URL}/users/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Авторизация успешна.") {
          console.log("Пользователь авторизован:", data.user);
          localStorage.setItem("telegram_user", JSON.stringify(data.user));
        } else {
          console.error("Ошибка авторизации:", data.error);
        }
      })
      .catch((error) => console.error("Ошибка при авторизации:", error));
  }
}

app.mount("#app");
