<template>
    <div class="flex flex-col space-y-4">
      <!-- Первый список -->
      <span>Выберите сколько раз в (час, день, неделю, месяц) выполнить поиск</span>
      <div class="relative flex flex-col rounded-lg bg-white shadow-sm border border-slate-200">
        <!-- Активный элемент -->
        <div
          v-if="!isFirstDropdownOpen"
          role="button"
          @click="toggleFirstDropdown"
          class="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
        >
          {{ selectedFirstItem.label }}
        </div>
    
        <!-- Список всех элементов -->
        <nav v-else class="flex min-w-[240px] flex-col gap-1 p-1.5">
          <div
            v-for="item in firstItems"
            :key="item.id"
            role="button"
            @click="selectFirstItem(item)"
            class="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
          >
            {{ item.label }}
          </div>
        </nav>
      </div>
  
      <!-- Динамический текст -->
      <span>Выполнить <strong>{{ selectedFirstItem.label }} </strong> поиск(а) в <strong>{{ selectedSecondItem.label }}</strong> </span>
  
      <!-- Второй список -->
      <div class="relative flex flex-col rounded-lg bg-white shadow-sm border border-slate-200">
        <!-- Активный элемент -->
        <div
          v-if="!isSecondDropdownOpen"
          role="button"
          @click="toggleSecondDropdown"
          class="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
        >
          {{ selectedSecondItem.label }}
        </div>
    
        <!-- Список всех элементов -->
        <nav v-else class="flex min-w-[240px] flex-col gap-1 p-1.5">
          <div
            v-for="item in secondItems"
            :key="item.id"
            role="button"
            @click="selectSecondItem(item)"
            class="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
          >
            {{ item.label }}
          </div>
        </nav>
      </div>
      
    </div>
    <div class="btn-wrapper mt-[30px]">
        <BtnSearch />
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import BtnSearch from "./BtnSearch.vue";
  // Первый список
  const firstItems = ref([
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
  ]);
  const selectedFirstItem = ref(firstItems.value[0]);
  const isFirstDropdownOpen = ref(false);
  const toggleFirstDropdown = () => {
    isFirstDropdownOpen.value = !isFirstDropdownOpen.value;
  };
  const selectFirstItem = (item) => {
    selectedFirstItem.value = item;
    isFirstDropdownOpen.value = false;
  };
  
  // Второй список
  const secondItems = ref([
    { id: 1, label: "Час" },
    { id: 2, label: "День" },
    { id: 3, label: "Неделю" },
    { id: 4, label: "Месяц" },
  ]);
  const selectedSecondItem = ref(secondItems.value[0]);
  const isSecondDropdownOpen = ref(false);
  const toggleSecondDropdown = () => {
    isSecondDropdownOpen.value = !isSecondDropdownOpen.value;
  };
  const selectSecondItem = (item) => {
    selectedSecondItem.value = item;
    isSecondDropdownOpen.value = false;
  };
  </script>
  
  <style scoped>
  /* Дополнительные стили */
  </style>