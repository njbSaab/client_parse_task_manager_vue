<template>
    <div>
      <div
        v-for="item in accordionItems"
        :key="item.id"
        class="form-items border-b border-slate-200"
        v-auto-animate
      >
        <button
          @click="toggleAccordion(item.id)"
          type="button"
          class="w-full flex justify-between items-center py-5 text-slate-800"
        >
          <span :class="{ 'text-green-500': item.isOpen, 'text-slate-400': !item.isOpen }">Шаг: {{ item.id }}</span>
          <span>{{ item.title }}</span>
          <span class="text-slate-800 transition-transform duration-300">
            <svg
              v-if="!item.isOpen"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="w-4 h-4"
            >
              <path
                d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="w-4 h-4"
            >
              <path
                d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z"
              />
            </svg>
          </span>
        </button>
        <div v-if="item.isOpen" class="overflow-hidden transition-all duration-300 ease-in-out" v-auto-animate>
          <slot :name="'content-' + item.id" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const accordionItems = ref([
    { id: 1, title: "Введите сайт", isOpen: false },
    { id: 2, title: "Введите данные для поиска", isOpen: false },
    { id: 3, title: "Параметры задачи", isOpen: false },
  ]);
  
  const toggleAccordion = (id) => {
    const item = accordionItems.value.find((accordion) => accordion.id === id);
    if (item) {
      item.isOpen = !item.isOpen;
    }
  };
  </script>
  
  <style scoped>
  .form-items:last-child {
    border-color: transparent;
  }
  </style>