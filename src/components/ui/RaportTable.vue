<template>
  <div>
    <!-- Состояние загрузки -->
    <div v-if="formStore.isLoading">Загрузка данных...</div>
    <!-- Ошибка -->
    <div v-else-if="formStore.error">Ошибка: {{ formStore.error }}</div>
    <!-- Таблица задач -->
    <table v-else class="w-full text-left table-auto min-w-max text-slate-800">
      <thead>
        <tr>
          <th class="p-4">Имя задачи</th>
          <th class="p-4">URL</th>
          <th class="p-4">Дата создания</th>
          <th class="p-4">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in formStore.tasks" :key="task.id">
          <td class="p-4">{{ task.name }}</td>
          <td class="p-4">{{ task.url }}</td>
          <td class="p-4">{{ new Date(task.created_at).toLocaleString() }}</td>
          <td class="p-4">
            <button @click="viewLogs(task.id)" class="text-blue-600 hover:underline">
              Посмотреть логи
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Логи выбранной задачи -->
    <div v-if="selectedTaskId && formStore.taskLogs[selectedTaskId]">
      <h3>Логи задачи {{ selectedTaskId }}</h3>
      <table class="w-full text-left table-auto min-w-max text-slate-800">
        <thead>
          <tr>
            <th class="p-4">Статус</th>
            <th class="p-4">Сообщение</th>
            <th class="p-4">Дата</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in formStore.taskLogs[selectedTaskId]" :key="log.id">
            <td class="p-4">{{ log.status }}</td>
            <td class="p-4">{{ log.message }}</td>
            <td class="p-4">{{ new Date(log.created_at).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useFormStore } from "@/stores/formStore";
import { ref, onMounted } from "vue";

const formStore = useFormStore();
const selectedTaskId = ref(null);

onMounted(() => {
  formStore.loadTasks();
});

const viewLogs = (taskId) => {
  selectedTaskId.value = taskId;
  formStore.loadTaskLogs(taskId);
};
</script>