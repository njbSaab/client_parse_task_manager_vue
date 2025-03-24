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

  // Функция для ожидания Telegram WebApp
  async function waitForTelegramWebApp() {
    return new Promise((resolve, reject) => {
      if (window.Telegram?.WebApp) {
        resolve(window.Telegram.WebApp);
      } else {
        const interval = setInterval(() => {
          if (window.Telegram?.WebApp) {
            clearInterval(interval);
            resolve(window.Telegram.WebApp);
          }
        }, 100);
        // Тайм-аут 5 секунд
        setTimeout(() => {
          clearInterval(interval);
          reject(new Error("Telegram WebApp не загрузился вовремя"));
        }, 5000);
      }
    });
  }

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
    try {
      const telegram = await waitForTelegramWebApp(); // Ждём готовности Telegram WebApp
      console.log("Telegram WebApp инициализирован:", telegram);

      telegram.ready(); // Сообщаем Telegram, что приложение готово
      telegram.expand(); // Разворачиваем приложение на полный экран

      const userData = telegram.initDataUnsafe?.user;
      console.log("UserData из Telegram:", userData);

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
