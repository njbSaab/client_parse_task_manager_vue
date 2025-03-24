<template>
  <IsLoading v-if="taskStore.isLoading" />

  <div v-else class="container mx-auto pt-0 pb-6 px-2">
    <h1 class="text-2xl font-bold flex flex-col items-center">
      Детали задачи:
      <span class="font-normal text-gray-500 text-sm">{{
        task?.name || "Загрузка..."
      }}</span>
    </h1>

    <div v-if="task" class="bg-white shadow-lg rounded-lg flex flex-col items-start overflow-hidden my-2">
      <p class="flex items-center justify-between gap-1 px-2">
        <strong>ID:</strong>
        <span class="text-gray-700"> {{ task.id }} </span>
      </p>
      <p class="flex items-center justify-between gap-1 px-2">
        <strong>Название:</strong>
        <span class="text-nowrap w-full truncate overflow-x-auto">
          {{ task.name }}
        </span>
      </p>
      <p class="flex items-center justify-between gap-1 px-2">
        <strong>URL:</strong>
        <span class="text-nowrap w-full truncate overflow-x-auto">
          {{ task.url }}
        </span>
      </p>
      <p class="flex items-center justify-between gap-1 px-2">
        <strong>Содержимое:</strong>
        <span class="text-nowrap w-full truncate overflow-x-auto">
          {{ task.content }}
        </span>
      </p>
      <p class="flex items-center justify-between gap-1 px-2">
        <strong>Интервал:</strong>
        <span>
          {{ task.interval }}
        </span>
      </p>
      <p class="flex items-center justify-between gap-1 px-2">
        <strong>Частота:</strong>
        <span>
          {{ task.frequency || "Не указано" }}
        </span>
      </p>
      <p class="flex items-center justify-between gap-1 px-2">
        <strong>Период:</strong>
        <span>
          {{ task.period || "Не указано" }}
        </span>
      </p>
      <p class="flex items-center justify-between gap-1 px-2">
        <strong>Дата создания:</strong>
        <span>
          {{ task.created_at }}
        </span>
      </p>
      <p class="flex items-center justify-between gap-1 px-2">
        <strong>Статус:</strong> <span class="text-green-500">Ok</span>
      </p>

      <div class="w-full">
        <TaskLogsTable :logs="taskLogs[taskId] || []" />
      </div>
    </div>

    <div v-else class="text-red-500">
      <p>Задача не найдена или произошла ошибка: {{ error }}</p>
    </div>

    <router-link
      to="/"
      class="mt-4 text-blue-600 hover:underline flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ml-2 h-4 w-4 svg-arrow-r rotate-180"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
      Назад к списку задач
    </router-link>
  </div>
</template>

<script setup>
import IsLoading from "@/components/ui/isLoading.vue";
import TaskLogsTable from "@/components/layouts/task/TaskLogsTable.vue";
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "../../../stores/taskStore";

const route = useRoute();
const taskStore = useTaskStore();

const taskId = route.params.id;

// Вычисляемые свойства для удобства доступа
const task = computed(() => taskStore.selectedTask);
const taskLogs = computed(() => taskStore.taskLogs);
const isLoading = computed(() => taskStore.isLoading);
const error = computed(() => taskStore.error);

onMounted(async () => {
  try {
    // Загружаем задачи, если их ещё нет
    if (!taskStore.tasks.length) {
      await taskStore.loadTasks();
    }
    // Устанавливаем выбранную задачу (приводим taskId к числу для корректного сравнения)
    const selectedTask = taskStore.tasks.find((t) => t.id === Number(taskId));
    if (selectedTask) {
      taskStore.selectTask(selectedTask);
      // Загружаем логи для этой задачи
      await taskStore.loadTaskLogs(taskId);
    } else {
      taskStore.error = `Задача с ID ${taskId} не найдена`;
    }
  } catch (err) {
    taskStore.error = err.message || "Неизвестная ошибка при загрузке данных";
    console.error("Ошибка в onMounted:", err);
  }
});
</script>
