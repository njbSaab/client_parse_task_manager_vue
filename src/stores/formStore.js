import { defineStore } from "pinia";
import { createTask, fetchTasks } from "../services/apiService";

export const useFormStore = defineStore("form", {
  state: () => ({
    formData: {
      url: "",
      content: "",
      interval: "",
      frequency: 1,
      period: "Час",
      userId: null,
    },
    tasks: [], // Список задач
    selectedTask: null, // Выбранная задача
    notification: {
      isVisible: false,
      type: "success",
    },
    isSubmitting: false, // Флаг предотвращения повторной отправки
    isLoading: false, // Флаг загрузки задач
    error: null, // Ошибка при загрузке
  }),
  actions: {
    calculateInterval() {
      const periodMap = {
        Час: 60,
        День: 1440,
        Неделя: 10080,
        Месяц: 43200,
      };
      const totalMinutes =
        periodMap[this.formData.period] / this.formData.frequency;
      return `${Math.round(totalMinutes)}m`;
    },
    async submitForm() {
      if (this.isSubmitting) {
        console.warn("Попытка повторной отправки задачи");
        return;
      }
      this.isSubmitting = true;
      try {
        console.log("Форма отправляется...");
        const telegramUser = JSON.parse(localStorage.getItem("telegram_user"));

        if (!telegramUser?.id) {
          throw new Error("Ошибка: Не удалось получить userId из localStorage");
        }

        this.formData.userId = telegramUser.id;
        this.formData.interval = this.calculateInterval();

        const cleanFormData = JSON.parse(JSON.stringify(this.formData));
        console.log("Чистый объект для отправки на сервер:", cleanFormData);

        const response = await createTask(cleanFormData);
        console.log("Ответ от сервера:", response);

        this.notification.isVisible = true;
        this.notification.type = "success";

        // После создания задачи обновляем список задач
        await this.loadTasks();
      } catch (error) {
        console.error("Ошибка при создании задачи:", error);
        this.notification.isVisible = true;
        this.notification.type = "error";
      } finally {
        this.isSubmitting = false;
        setTimeout(() => {
          this.notification.isVisible = false;
        }, 3000);
      }
    },
    async loadTasks() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await fetchTasks();
        this.tasks = data;
        this.selectedTask = data.length > 0 ? data[0] : null; // Устанавливаем первую задачу
        console.log("Загруженные задачи:", this.tasks);
      } catch (error) {
        this.error = error.message || "Ошибка при загрузке задач";
        console.error("Ошибка при загрузке задач:", error);
      } finally {
        this.isLoading = false;
      }
    },
    selectTask(task) {
      this.selectedTask = task;
    },
  },
});
