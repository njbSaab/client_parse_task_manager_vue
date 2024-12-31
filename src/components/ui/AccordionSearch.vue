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
          class="hover:bg-slate-50 rounded-md transition-all w-full flex justify-self-start md:justify-center items-center py-5 text-slate-800 gap-4 p-2"
        >
          <span class="flex-1 md:flex-none text-left" :class="{ 'text-green-500': item.isOpen, 'text-slate-400': !item.isOpen }">Шаг: {{ item.id }}</span>
          <span class="md:font-bold md:text-lg md:flex-1">{{ item.title }}</span>
          <span class="text-slate-800 transition-transform duration-300">
            <svg v-if="!item.isOpen"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="2 4" stroke-dashoffset="6" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9"><animate attributeName="stroke-dashoffset" dur="0.6s" repeatCount="indefinite" values="6;0"/></path><path stroke-dasharray="32" stroke-dashoffset="32" d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.1s" dur="0.4s" values="32;0"/></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M12 8v7.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="10;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0"/></path></g></svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" style="transform: rotate(180deg)" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="2 4" stroke-dashoffset="6" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9"><animate attributeName="stroke-dashoffset" dur="0.6s" repeatCount="indefinite" values="6;0"/></path><path stroke-dasharray="32" stroke-dashoffset="32" d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.1s" dur="0.4s" values="32;0"/></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M12 8v7.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="10;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0"/></path></g></svg>

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