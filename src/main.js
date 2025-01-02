import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import "@material-tailwind/html/scripts/ripple";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

const app = createApp(App);

app.use(router); // Подключение маршрутизации
app.use(autoAnimatePlugin); // Подключение плагина анимации

app.mount("#app");
