<template>
  <div>
    <!-- Отображение состояния загрузки -->
    <div v-if="formStore.isLoading">Загрузка задач...</div>

    <!-- Отображение ошибки -->
    <div v-else-if="formStore.error">Ошибка: {{ formStore.error }}</div>

    <!-- Таблица задач -->
    <table v-else>
      <thead>
        <tr>
          <th>Имя задачи</th>
          <th>URL</th>
          <th>Дата создания</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in formStore.tasks" :key="task.id">
          <td>{{ task.name }}</td>
          <td>{{ task.url }}</td>
          <td>{{ new Date(task.created_at).toLocaleString() }}</td>
          <td>
            <button @click="viewLogs(task.id)">Посмотреть логи</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Логи выбранной задачи -->
    <div v-if="selectedTaskId && formStore.taskLogs[selectedTaskId]">
      <h3>Логи задачи {{ selectedTaskId }}</h3>
      <ul>
        <li v-for="log in formStore.taskLogs[selectedTaskId]" :key="log.id">
          <strong>{{ log.status }}</strong> - {{ log.message }}
          <br />
          <small>{{ new Date(log.created_at).toLocaleString() }}</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { useFormStore } from "@/stores/formStore";
  import { ref, onMounted } from "vue";

const formStore = useFormStore();
const selectedTaskId = ref(null);

onMounted(() => {
  formStore.loadTaskLogs()
});

const viewLogs = (taskId) => {
  selectedTaskId.value = taskId;
  formStore.loadTaskLogs(taskId);
};
</script>