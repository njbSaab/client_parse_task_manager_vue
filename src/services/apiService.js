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
