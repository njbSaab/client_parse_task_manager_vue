import axios from "axios";

const API_BASE_URL = "http://localhost:3082/api";

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks/parser`, taskData);
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);
    throw error.response?.data || { error: "Неизвестная ошибка" };
  }
};
