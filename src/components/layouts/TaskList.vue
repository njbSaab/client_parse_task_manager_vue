<template>
  <div class="relative w-[95%] mx-auto" v-auto-animate>
    <h1 class="text-xl font-bold">Список задач</h1>
    <IsLoading v-if="formStore.isLoading" />
    <div v-else>
      <div v-if="formStore.tasks.length === 0" class="message-info bg-slate-50">
        <span class="block font-bold">У вас пока нет задач.</span> 
                Вам нужно перейти и создать
        <router-link
          to="/"
          class="text-slate-800 font-semibold inline-block hover:underline"
        >
          новую задачу
        </router-link>
      </div>
      <div class="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2">
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
import IsLoading from "@/components/ui/isLoading.vue";
const formStore = useFormStore();

onMounted(() => {
  formStore.loadTasks(); // Загружаем задачи при монтировании
});
</script>

<style scoped>
.nj-position-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
