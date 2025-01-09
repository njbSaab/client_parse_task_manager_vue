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
          "Content-Type": "application/json",
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

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    console.log("Ответ от API:", response.data); // Лог API-ответа
    return response.data; // Убедитесь, что это массив
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    throw error.response?.data || { error: "Неизвестная ошибка" };
  }
};

export const fetchTaskLogs = async (taskId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}/logs`);
    console.log("fetchTaskLogs", response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении логов задачи:", error.message);
    throw error.response?.data || { error: "Неизвестная ошибка" };
  }
};
