<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Детали задачи: {{ task?.name || 'Загрузка...' }}</h1>

    <div v-if="task" class="bg-white shadow-lg rounded-lg p-6">
      <p><strong>ID:</strong> {{ task.id }}</p>
      <p><strong>Название:</strong> {{ task.name }}</p>
      <p><strong>URL:</strong> {{ task.url }}</p>
      <p><strong>Содержимое:</strong> {{ task.content }}</p>
      <p><strong>Интервал:</strong> {{ task.interval }}</p>
      <p><strong>Частота:</strong> {{ task.frequency || 'Не указано' }}</p>
      <p><strong>Период:</strong> {{ task.period || 'Не указано' }}</p>
      <p><strong>Дата создания:</strong> {{ task.created_at }}</p>
      <p><strong>Статус:</strong> <span class="text-green-500">Ok</span></p>

      <!-- Логи задачи -->
      <div v-if="taskLogs[task.id]?.length" class="mt-4">
        <h2 class="text-xl font-semibold">Логи задачи</h2>
        <ul class="list-disc pl-5">
          <li
            v-for="log in taskLogs[task.id]"
            :key="log.id"
            class="text-sm text-slate-600"
          >
            {{ log.message }} ({{ new Date(log.created_at).toLocaleString() }})
          </li>
        </ul>
      </div>
      <p v-else class="mt-4 text-slate-500">Логов пока нет.</p>
    </div>

    <div v-else-if="isLoading" class="text-center">
      <p>Загрузка...</p>
    </div>
    <div v-else class="text-red-500">
      <p>Задача не найдена или произошла ошибка: {{ error }}</p>
    </div>

    <router-link to="/" class="mt-4 inline-block text-blue-600 hover:underline">
      Назад к списку задач
    </router-link>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskStore } from '../../../stores/taskStore';

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
    taskStore.error = err.message || 'Неизвестная ошибка при загрузке данных';
    console.error('Ошибка в onMounted:', err);
  }
});
</script>