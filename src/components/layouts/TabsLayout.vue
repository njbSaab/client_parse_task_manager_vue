<script setup>
import { ref } from "vue";

// Вкладки
const tabs = ref([
  { id: "all", label: "Всё" },
  { id: "search", label: "Новая задача" },
  { id: "report", label: "Отчёт" },
]);

// Активная вкладка
const activeTab = ref("search"); // Значение по умолчанию "search"

// Смена вкладки по клику
const setActiveTab = (id) => {
  activeTab.value = id;
};
</script>

<template>
  <div class="tabs-layout">
    <!-- Навигация по вкладкам -->
    <ul class="flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100">
      <li v-for="tab in tabs" :key="tab.id" class="z-30 flex-auto text-center">
        <button
          @click="setActiveTab(tab.id)"
          :class="
            activeTab === tab.id ? 'text-white bg-gray-800' : 'text-slate-600 bg-inherit'
          "
          class="w-full px-0 py-2 text-sm mb-0 border-0 rounded-md font-bold"
        >
          {{ tab.label }}
        </button>
      </li>
    </ul>

    <!-- Содержимое вкладок -->
    <div class="py-5" v-auto-animate>
      <slot name="content-all" v-if="activeTab === 'all'" />
      <slot name="content-search" v-if="activeTab === 'search'" />
      <slot name="content-report" v-if="activeTab === 'report'" />
    </div>
  </div>
</template>