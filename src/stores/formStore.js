import { defineStore } from "pinia";
import { createTask, fetchTasks, fetchTaskLogs } from "../services/apiService";

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
    taskLogs: {}, // Логи задач
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

      if (!this.formData.frequency || !periodMap[this.formData.period]) {
        console.error("Неверные данные для расчета интервала:", this.formData);
        return "0m"; // Возвращаем значение по умолчанию
      }

      const totalMinutes =
        periodMap[this.formData.period] / this.formData.frequency;
      const interval = `${Math.round(totalMinutes)}m`;
      console.log("Рассчитанный интервал:", interval);
      return interval;
    },
    async submitForm() {
      if (this.isSubmitting) {
        console.warn("Попытка повторной отправки задачи");
        return;
      }
      this.isSubmitting = true;

      try {
        console.log("Форма отправляется...");

        // Получаем Telegram данные из localStorage
        const telegramUser = JSON.parse(localStorage.getItem("telegram_user"));

        if (!telegramUser?.id) {
          throw new Error(
            "Ошибка: Не удалось получить telegram_id из localStorage"
          );
        }

        // Устанавливаем telegram_id как userId
        this.formData.userId = telegramUser.id;

        // Рассчитываем интервал
        this.formData.interval = this.calculateInterval();

        // Подготавливаем данные для отправки
        const cleanFormData = {
          ...this.formData, // Копируем данные из формы
          userId: String(telegramUser.id), // Убедимся, что ID передается как строка (если сервер этого требует)
        };

        console.log("Чистый объект для отправки на сервер:", cleanFormData);

        // Отправляем запрос на создание задачи
        const response = await createTask(cleanFormData);

        console.log("Ответ от сервера:", response);

        // Показываем уведомление об успешном создании задачи
        this.notification.isVisible = true;
        this.notification.type = "success";

        // Обновляем список задач
        await this.loadTasks();
      } catch (error) {
        console.error("Ошибка при создании задачи:", error);

        // Показываем уведомление об ошибке
        this.notification.isVisible = true;
        this.notification.type = "error";
      } finally {
        this.isSubmitting = false;

        // Скрываем уведомление через 3 секунды
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
    async loadTaskLogs(taskId) {
      if (this.taskLogs[taskId]) {
        console.log(`Логи для задачи ${taskId} уже загружены.`);
        return; // Избегаем повторного запроса
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
