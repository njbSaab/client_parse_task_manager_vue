// stores/taskStore.js
import { defineStore } from "pinia";
import { fetchTasks, fetchTaskLogs } from "../services/apiService";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [], // Список задач
    taskLogs: {}, // Логи задач
    selectedTask: null, // Выбранная задача
    isLoading: false, // Флаг загрузки
    error: null, // Ошибка при загрузке
  }),
  actions: {
    async loadTasks() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await fetchTasks();
        if (!Array.isArray(data)) {
          throw new Error("Сервер вернул данные, не являющиеся массивом");
        }
        this.tasks = data.map((task) => ({
          ...task,
          created_at: task.created_at
            ? new Date(task.created_at).toLocaleString()
            : "Неизвестно",
        }));
        this.selectedTask = this.tasks.length > 0 ? this.tasks[0] : null;
        console.log("Загруженные задачи:", this.tasks);
      } catch (error) {
        if (
          error.message ===
          "У вас нет задач. Вам нужно перейти в новую задачу и создать."
        ) {
          console.warn(error.message);
          this.tasks = [];
        } else {
          this.error = error.message || "Ошибка при загрузке задач";
          console.error("Ошибка при загрузке задач:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },
    selectTask(task) {
      this.selectedTask = task;
    },
    async loadTaskLogs(taskId) {
      if (this.taskLogs[taskId]) {
        console.log(`Логи для задачи ${taskId} уже загружены.`);
        return;
      }
      try {
        const logs = await fetchTaskLogs(taskId);
        console.log(`Загруженные логи для задачи ${taskId}:`, logs);
        this.taskLogs[taskId] = logs;
      } catch (error) {
        console.error(`Ошибка при загрузке логов задачи ${taskId}:`, error);
      }
    },
  },
});
