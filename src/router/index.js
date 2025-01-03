import { createRouter, createWebHistory } from "vue-router";
import TaskManagerView from "../views/TaskManagerView.vue";

const routes = [
  { path: "/", name: "home", component: TaskManagerView },
  {
    path: "/alls-task",
    name: "alls-task",
    component: () => import("../components/ui/CardSearch.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
