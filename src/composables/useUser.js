import { ref } from "vue";

export function useUser() {
  const telegramUser = ref(null);
  const serverResponse = ref(null);
  const userNotFound = ref(false);
  const errorDetails = ref(null);
  const telegramIdType = ref("");
  const telegramIdValue = ref("");
  const serverRequestDetails = ref(null);
  const isLoading = ref(true);
  const isStoredInLocalStorage = ref(false);

  async function fetchUserFromServer(telegramId) {
    telegramIdType.value = typeof telegramId;
    telegramIdValue.value = String(telegramId);
    const requestUrl = `${import.meta.env.VITE_API_BASE_URL}/users/${
      telegramIdValue.value
    }`;
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
          "ngrok-skip-browser-warning": "true", // Обход предупреждения ngrok
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
  };
}
