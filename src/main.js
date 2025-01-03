import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);

console.log("Telegram API доступен:", window.Telegram);
console.log("Telegram WebApp доступен:", window.Telegram?.WebApp);

const telegram = window.Telegram?.WebApp;

telegram.onEvent("activated", () => {
  console.log("Mini App активирован.");
});

if (telegram) {
  telegram.ready(); // Сигнализируем Telegram, что Mini App готово
  console.log("Telegram WebApp инициализировано");

  const initData = telegram.initData;
  console.log("Получено initData:", initData);

  if (initData) {
    fetch("http://localhost:3082/api/users/verify-init-data", {
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
          localStorage.setItem("telegram_user", JSON.stringify(data.user));
        } else {
          console.error("Ошибка авторизации:", data.error);
        }
      })
      .catch((error) => console.error("Ошибка при авторизации:", error));
  } else {
    console.warn("initData отсутствует.");
  }
} else {
  console.warn("Telegram WebApp не доступен.");
}

app.mount("#app");
