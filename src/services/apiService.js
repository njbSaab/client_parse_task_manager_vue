import axios from "axios";
import { API_BASE_URL } from "../consts/const";

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks/parser`, taskData);
    console.log("apiService:", taskData);
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);
    throw error.response?.data || { error: "Неизвестная ошибка" };
  }
};

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    throw error.response?.data || { error: "Неизвестная ошибка" };
  }
};

export const fetchTaskLogs = async (taskId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}/logs`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении логов задачи:", error.message);
    throw error.response?.data || { error: "Неизвестная ошибка" };
  }
};
