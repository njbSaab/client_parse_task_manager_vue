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
        this.formData.interval = this.calculateInterval();

        const response = await createTask(this.formData); // Вызов createTask
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
