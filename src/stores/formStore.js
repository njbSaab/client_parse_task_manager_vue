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

        const response = await fetch("http://localhost:3082/api/tasks/parser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });

        if (!response.ok) {
          throw new Error("Ошибка при отправке формы");
        }

        const data = await response.json();
        console.log("Задача успешно создана:", data);

        // Устанавливаем уведомление как успешное
        this.notification.isVisible = true;
        this.notification.type = "success";
      } catch (error) {
        console.error("Ошибка при создании задачи:", error);

        // Устанавливаем уведомление как ошибочное
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
