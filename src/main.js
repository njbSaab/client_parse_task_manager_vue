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

app.mount("#app");
