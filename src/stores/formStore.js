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
      userId: null,
    },
    notification: {
      isVisible: false,
      type: "success",
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

        this.formData.userId = telegramUser.id;
        this.formData.interval = this.calculateInterval();

        // Преобразуем в чистый объект
        const cleanFormData = JSON.parse(JSON.stringify(this.formData));
        console.log("Чистый объект для отправки на сервер:", cleanFormData);

        const response = await createTask(cleanFormData);
        console.log("Ответ от сервера:", response);

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
