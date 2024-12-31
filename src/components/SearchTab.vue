<template>
    <div>
      <!-- Кнопка для открытия/закрытия всех аккордеонов -->
      <button
        @click="toggleAll"
        type="button"
        class="mb-4 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        {{ areAllOpen ? "Закрыть все" : "Открыть все" }}
      </button>
  
      <!-- Аккордеоны -->
      <div
        v-for="item in items"
        :key="item.id"
        class="form-items border-b border-slate-200"
      >
        <button
          @click="toggleAccordion(item.id)"
          type="button"
          class="w-full flex justify-between items-center py-5 text-slate-800"
        >
          <span>{{ item.title }}</span>
          <span class="text-slate-800 transition-transform duration-300" v-auto-animate>
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
        <div v-if="item.isOpen" class="overflow-hidden transition-all duration-300 ease-in-out"  v-auto-animate>
          <slot :name="'content-' + item.id" />
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { ref, computed } from "vue";
  
  // Массив с данными аккордеонов
  const items = ref([
    { id: 1, title: "Input Search", isOpen: false },
    { id: 2, title: "Text Search", isOpen: false },
    { id: 3, title: "Select Search", isOpen: false },
  ]);
  
  // Вычисляемое свойство для определения, открыты ли все аккордеоны
  const areAllOpen = computed(() => items.value.every((item) => item.isOpen));
  
  // Функция для открытия/закрытия всех аккордеонов
  const toggleAll = () => {
    const shouldOpen = !areAllOpen.value; // Если все открыты, закрываем, и наоборот
    items.value.forEach((item) => {
      item.isOpen = shouldOpen;
    });
  };
  
  // Функция для управления отдельным аккордеоном
  const toggleAccordion = (id) => {
    const item = items.value.find((accordion) => accordion.id === id);
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