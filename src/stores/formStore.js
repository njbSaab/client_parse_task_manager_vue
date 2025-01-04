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
      console.log(
        "Calculating interval. Period:",
        this.formData.period,
        "Frequency:",
        this.formData.frequency
      );

      const totalMinutes =
        periodMap[this.formData.period] / this.formData.frequency;
      const interval = `${Math.round(totalMinutes)}m`;

      console.log("Calculated interval:", interval);
      return interval;
    },
    async submitForm() {
      try {
        const telegramUser = JSON.parse(localStorage.getItem("telegram_user"));
        if (!telegramUser?.id) {
          throw new Error("Ошибка: Не удалось получить userId из localStorage");
        }
        console.log("Telegram user data:", telegramUser);

        this.formData.userId = telegramUser.id;
        console.log("Form data before submission:", this.formData);

        const response = await createTask(this.formData);
        console.log("Server response:", response);

        this.notification.isVisible = true;
        this.notification.type = "success";
      } catch (error) {
        console.error("Ошибка при создании задачи:", error);
        this.notification.isVisible = true;
        this.notification.type = "error";
      } finally {
        setTimeout(() => {
          this.notification.isVisible = false;
        }, 3000);
      }
    },
  },
});
