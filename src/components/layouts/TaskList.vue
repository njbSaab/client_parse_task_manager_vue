<template>
    <div>
      <h1 class="text-xl font-bold">Список задач</h1>
      <div v-if="formStore.isLoading" class="text-gray-500">Загрузка...</div>
      <div v-else-if="formStore.error" class="text-red-500">{{ formStore.error }}</div>
  
      <div v-else>
        <div v-if="formStore.tasks.length === 0" class="text-gray-500">
          Задач пока нет.
        </div>
        <div class="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <TaskCard
            v-for="task in formStore.tasks"
            :key="task.id"
            :task="task"
            :isSelected="task.id === formStore.selectedTask?.id"
            @click="formStore.selectTask(task)"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  import { useFormStore } from "@/stores/formStore";
  import TaskCard from "@/components/ui/CardSearch.vue";
  
  const formStore = useFormStore();
  
  onMounted(() => {
    formStore.loadTasks(); // Загружаем задачи при монтировании
  });
  </script>