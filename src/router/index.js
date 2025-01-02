import { createRouter, createWebHistory } from "vue-router";
import TaskManagerView from "../views/TaskManagerView.vue";

const routes = [{ path: "/", name: "home", component: TaskManagerView }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
