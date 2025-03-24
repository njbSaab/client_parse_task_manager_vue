<template>
    <div v-if="logs?.length" class="mt-4 w-full">
      <div class="title-group flex items-center justify-between">
        <h2 class="text-xl font-semibold">Логи задачи</h2>
        <div class="flex items-center">
          <label class="mr-2 text-sm text-slate-500">Логов на странице:</label>
          <select v-model="itemsPerPage" class="border rounded p-1 text-sm bg-white">
            <option :value="5">5</option>
            <option :value="10">10</option>
          </select>
        </div>
      </div>
  
      <!-- Таблица -->
      <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border overflow-hidden overflow-x-auto">
        <table class="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th class="p-4 border-b border-slate-200 bg-slate-50 cursor-pointer" @click="sortBy('id')">
                <div class="flex items-center">
                  <p class="text-sm font-normal leading-none text-slate-500">ID</p>
                  <svg
                    class="table-sort ml-1"
                    :class="{ 'rotate-180': sortDirection === 'desc' && sortKey === 'id' }"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path fill="currentColor" d="M9 3L5 6.99h3V14h2V6.99h3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99z" />
                  </svg>
                </div>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">Сообщение</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50 cursor-pointer" @click="sortBy('created_at')">
                <div class="flex items-center">
                  <p class="text-sm font-normal leading-none text-slate-500">Дата создания</p>
                  <svg
                    class="table-sort ml-1"
                    :class="{ 'rotate-180': sortDirection === 'desc' && sortKey === 'created_at' }"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path fill="currentColor" d="M9 3L5 6.99h3V14h2V6.99h3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99z" />
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in paginatedLogs" :key="log.id" class="hover:bg-slate-50 border-b border-slate-200">
              <td class="p-4 py-5">
                <p class="block font-semibold text-sm text-slate-800">{{ log.id }}</p>
              </td>
              <td class="p-4 py-5">
                <p class="text-sm text-slate-500">{{ log.message }}</p>
              </td>
              <td class="p-4 py-5">
                <p class="text-sm text-slate-500">{{ new Date(log.created_at).toLocaleString() }}</p>
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Пагинация -->
        <div class="flex justify-between items-center px-4 py-3">
          <div class="text-sm text-slate-500">
            Showing <b>{{ startIndex + 1 }}-{{ endIndex }}</b> of {{ totalLogs }}
          </div>
          <div class="flex space-x-1">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease disabled:opacity-50"
            >
              Prev
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-3 py-1 min-w-9 min-h-9 text-sm font-normal rounded transition duration-200 ease',
                currentPage === page
                  ? 'text-white bg-slate-800 border border-slate-800 hover:bg-slate-600 hover:border-slate-600'
                  : 'text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-400',
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="mt-4 text-slate-500">Логов пока нет.</p>
  </template>
  
  <script setup>
  import { ref, computed, defineProps } from 'vue';
  
  // Определяем пропсы
  const props = defineProps({
    logs: {
      type: Array,
      required: true,
      default: () => [],
    },
  });
  
  // Логика пагинации
  const currentPage = ref(1);
  const itemsPerPage = ref(5); // Количество логов на странице
  
  // Логика сортировки
  const sortKey = ref(''); // Текущий ключ сортировки ('id' или 'created_at')
  const sortDirection = ref('asc'); // Направление сортировки ('asc' или 'desc')
  
  const sortedLogs = computed(() => {
    const logsCopy = [...props.logs]; // Создаём копию массива, чтобы не изменять исходный
    if (!sortKey.value) return logsCopy; // Если сортировка не выбрана, возвращаем исходный порядок
  
    return logsCopy.sort((a, b) => {
      let valueA = sortKey.value === 'id' ? a.id : new Date(a.created_at).getTime();
      let valueB = sortKey.value === 'id' ? b.id : new Date(b.created_at).getTime();
  
      if (sortDirection.value === 'asc') {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
  });
  
  const totalLogs = computed(() => sortedLogs.value.length);
  const totalPages = computed(() => Math.ceil(totalLogs.value / itemsPerPage.value));
  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
  const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalLogs.value));
  const paginatedLogs = computed(() => sortedLogs.value.slice(startIndex.value, endIndex.value));
  
  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  }
  
  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  }
  
  function goToPage(page) {
    currentPage.value = page;
  }
  
  function sortBy(key) {
    if (sortKey.value === key) {
      // Если уже сортируем по этому ключу, меняем направление
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
      // Новый ключ сортировки, начинаем с 'asc'
      sortKey.value = key;
      sortDirection.value = 'asc';
    }
    currentPage.value = 1; // Сбрасываем страницу на первую при сортировке
  }
  </script>
  
  <style scoped>
  .table-sort {
    transition: transform 0.2s ease;
  }
  </style>