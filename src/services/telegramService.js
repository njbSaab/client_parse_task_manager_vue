import { ref } from "vue";
import { API_BASE_URL } from "../consts/const";

export function useTelegramService() {
  const telegramUser = ref(null);
  const serverResponse = ref(null);
  const userNotFound = ref(false);
  const errorDetails = ref(null);
  const telegramIdType = ref("");
  const telegramIdValue = ref("");
  const serverRequestDetails = ref(null);
  const isLoading = ref(true);
  const isStoredInLocalStorage = ref(false);

  // Пробуем получить Telegram API через window.Telegram.WebApp
  const telegram = window.Telegram?.WebApp;

  // Функция для загрузки данных пользователя с сервера
  async function fetchUserFromServer(telegramId) {
    telegramIdType.value = typeof telegramId;
    telegramIdValue.value = String(telegramId);

    const requestUrl = `${API_BASE_URL}/users/${telegramIdValue.value}`;
    serverRequestDetails.value = {
      url: requestUrl,
      telegramId: telegramIdValue.value,
    };
    isLoading.value = true;

    try {
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      serverResponse.value = {
        status: response.status,
        statusText: response.statusText,
        requestUrl,
      };

      if (!response.ok) {
        throw new Error(
          `HTTP ошибка: ${response.status} ${response.statusText}`
        );
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Ответ сервера не является JSON");
      }

      const data = await response.json();
      serverResponse.value.data = data;

      if (data.success) {
        telegramUser.value = data.user;
        localStorage.setItem("telegram_user", JSON.stringify(data.user));
        isStoredInLocalStorage.value = true;
      } else {
        userNotFound.value = true;
        errorDetails.value = {
          message: data.message || "Пользователь не найден",
          telegramId: telegramIdValue.value,
        };
      }
    } catch (error) {
      userNotFound.value = true;
      errorDetails.value = {
        message: "Ошибка при запросе к серверу",
        details: error.message,
        telegramId: telegramIdValue.value,
        requestUrl,
      };
    } finally {
      isLoading.value = false;
    }
  }

  // Функция для инициализации данных из Telegram WebApp
  async function initializeTelegram() {
    console.log("Telegram в сервисе:", telegram); // Отладка
    if (telegram) {
      try {
        telegram.ready(); // Сообщаем Telegram, что приложение готово
        telegram.expand(); // Разворачиваем приложение на полный экран

        const userData = telegram.initDataUnsafe?.user;
        console.log("UserData из Telegram:", userData); // Отладка
        if (!userData || !userData.id) {
          throw new Error("Telegram ID отсутствует в данных WebApp");
        }

        serverResponse.value = { telegramData: userData };
        await fetchUserFromServer(userData.id);
      } catch (error) {
        userNotFound.value = true;
        errorDetails.value = {
          message: "Ошибка при инициализации Telegram WebApp",
          details: error.message,
        };
        isLoading.value = false;
      }
    } else {
      userNotFound.value = true;
      errorDetails.value = { message: "Telegram WebApp API не доступен" };
      isLoading.value = false;

      // Временная заглушка для тестирования вне Telegram
      console.warn("Используется заглушка для тестирования");
      await fetchUserFromServer("123456789"); // Пример ID для теста
    }
  }

  return {
    telegramUser,
    serverResponse,
    userNotFound,
    errorDetails,
    telegramIdType,
    telegramIdValue,
    serverRequestDetails,
    isLoading,
    isStoredInLocalStorage,
    fetchUserFromServer,
    initializeTelegram,
  };
}
