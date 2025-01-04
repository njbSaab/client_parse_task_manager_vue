<template>
    <div
      class="task-card p-4 border rounded-lg shadow hover:shadow-lg cursor-pointer"
      :class="{ 'bg-blue-50': isSelected }"
      @click="$emit('click')"
    >
      <h2 class="text-lg font-bold text-gray-800 truncate">{{ task.name }}</h2>
      <p class="text-sm text-gray-600 mt-2 truncate">{{ task.content }}</p>
      <div class="text-sm text-gray-500 mt-4">
        Интервал: <strong>{{ task.interval }}</strong>
        <br />
        Период: <strong>{{ task.period }}</strong>
      </div>
      <a
        href="#"
        class="mt-4 inline-block text-blue-500 hover:underline text-sm"
      >
        Подробнее
      </a>
    </div>
</template>
  
<script setup>
  const props = defineProps({
    task: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  });
</script>
  
<style scoped>
  .task-card {
    transition: all 0.3s;
  }
  .task-card:hover {
    transform: translateY(-3px);
  }
</style>