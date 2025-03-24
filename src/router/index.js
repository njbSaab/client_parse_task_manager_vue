import { createRouter, createWebHistory } from "vue-router";
import TaskManagerView from "../views/TaskManagerView.vue";

const routes = [
  { path: "/", name: "home", component: TaskManagerView },
  {
    path: "/alls-task",
    name: "alls-task",
    component: () => import("../components/ui/CardSearch.vue"),
  },
  {
    path: "/report",
    name: "report",
    component: () => import("../components/ui/RaportTable.vue"),
  },
  {
    path: "/tasks",
    name: "report",
    component: () => import("../components/layouts/task/TaskDetailsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
