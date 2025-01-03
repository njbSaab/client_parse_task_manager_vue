import { defineStore } from "pinia";

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

        const taskData = {
          url: this.formData.url,
          content: this.formData.content,
          interval: this.formData.interval,
          frequency: this.formData.frequency,
          period: this.formData.period,
          userId: 1, // Замените на фактический userId
        };

        const response = await createTask(taskData);

        console.log("Задача успешно создана:", response);

        // Уведомление об успехе
        this.notification.isVisible = true;
        this.notification.type = "success";
      } catch (error) {
        console.error("Ошибка при создании задачи:", error);

        // Уведомление об ошибке
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
