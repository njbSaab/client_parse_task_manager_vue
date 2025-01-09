import axios from "axios";
import { API_BASE_URL } from "../consts/const";

export const createTask = async (taskData) => {
  try {
    console.log("Отправка задачи с данными:", taskData);
    const response = await axios.post(
      `${API_BASE_URL}/tasks/parser`,
      taskData,
      {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true", // Устранение предупреждения ngrok
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при создании задачи:",
      error.response?.data || error.message
    );
    throw error.response?.data || { error: "Неизвестная ошибка" };
  }
};

// export const fetchTasks = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/tasks`, {
//       headers: {
//         Accept: "application/json",
//         "ngrok-skip-browser-warning": "true", // Устранение предупреждения ngrok
//       },
//     });
//     console.log("Ответ от API:", response.data); // Лог API-ответа
//     return response.data; // Убедитесь, что это массив
//   } catch (error) {
//     console.error("Ошибка при получении задач:", error);
//     throw error.response?.data || { error: "Неизвестная ошибка" };
//   }
// };

export const fetchTasks = async () => {
  try {
    const telegramUser = JSON.parse(localStorage.getItem("telegram_user"));

    if (!telegramUser?.telegram_id) {
      throw new Error(
        "Ошибка: Не удалось получить telegram_id из localStorage"
      );
    }

    const response = await axios.get(
      `${API_BASE_URL}/tasks/by-telegram/${telegramUser.telegram_id}`,
      {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true", // Устранение предупреждения ngrok
        },
      }
    );

    console.log("Ответ от API:", response.data); // Лог API-ответа
    return response.data; // Убедитесь, что это массив
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    throw error.response?.data || { error: "Неизвестная ошибка" };
  }
};

export const fetchTaskLogs = async (taskId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}/logs`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true", // Устранение предупреждения ngrok
      },
    });
    console.log("fetchTaskLogs", response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении логов задачи:", error.message);
    throw error.response?.data || { error: "Неизвестная ошибка" };
  }
};
