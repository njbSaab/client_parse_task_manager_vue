import { defineStore } from "pinia";
import { createTask } from "../services/apiService";

export const useFormStore = defineStore("form", {
  state: () => ({
    formData: {
      url: "",
      content: "",
      interval: "",
      frequency: 1,
      period: "Час",
      userId: null, // Добавляем userId
    },
    notification: {
      isVisible: false,
      type: "success", // "success" или "error"
    },
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
      try {
        // Получаем userId из localStorage
        const telegramUser = JSON.parse(localStorage.getItem("telegram_user"));
        if (!telegramUser?.id) {
          throw new Error("Ошибка: Не удалось получить userId из localStorage");
        }
        this.formData.userId = telegramUser.id;

        // Вычисляем интервал
        this.formData.interval = this.calculateInterval();

        // Отправляем запрос на создание задачи
        const response = await createTask(this.formData); // Вызов createTask
        console.log("Задача успешно создана:", response);

        // Отображаем уведомление об успехе
        this.notification.isVisible = true;
        this.notification.type = "success";
      } catch (error) {
        console.error("Ошибка при создании задачи:", error);

        // Отображаем уведомление об ошибке
        this.notification.isVisible = true;
        this.notification.type = "error";
      } finally {
        // Прячем уведомление через 3 секунды
        setTimeout(() => {
          this.notification.isVisible = false;
        }, 3000);
      }
    },
  },
});
