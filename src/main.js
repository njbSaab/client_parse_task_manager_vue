import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { VueTelegramPlugin } from "vue-tg";
import "./style.css";
const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(autoAnimatePlugin);
app.use(pinia);
app.use(VueTelegramPlugin);

console.log("VueTelegramPlugin доступен:", VueTelegramPlugin);
console.log("Telegram API доступен:", window.Telegram);
console.log("Telegram WebApp доступен:", window.Telegram?.WebApp);

// const telegram = window.Telegram?.WebApp;

// if (telegram) {
//   telegram.expand();
//   telegram.ready();
//   console.log("Telegram WebApp инициализировано");

//   const initData = telegram.initData;
//   console.log("Получено initData:", initData);

//   if (initData) {
//     console.warn("Telegram WebApp API initData не требуется в этом варианте.");
//   }
// } else {
//   console.warn("Telegram WebApp API не доступен.");
// }

app.mount("#app");
