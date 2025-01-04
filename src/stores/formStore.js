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
        const telegramUser = JSON.parse(localStorage.getItem("telegram_user"));
        if (!telegramUser?.id) {
          throw new Error("Ошибка: Не удалось получить userId из localStorage");
        }
        console.log("user-", telegramUser);

        this.formData.userId = telegramUser.id;
        console.log("userID", this.formData.userId);

        this.formData.interval = this.calculateInterval();
        console.log("userID", this.formData.interval);

        const response = await createTask(this.formData);
        console.log("Задача успешно создана:", response);

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
