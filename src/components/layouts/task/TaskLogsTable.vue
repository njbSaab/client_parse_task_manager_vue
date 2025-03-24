<template>
    <div v-if="logs?.length" class="mt-4">
      <h2 class="text-xl font-semibold mb-3">Логи задачи</h2>
      <label class="mr-2 text-sm text-slate-500">Логов на странице:</label>
      <select v-model="itemsPerPage" class="border rounded p-1 text-sm">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
      </select>
  
      <!-- Таблица -->
      <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table class="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">ID</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">Сообщение</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">Дата создания</p>
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
  
  const totalLogs = computed(() => props.logs.length);
  const totalPages = computed(() => Math.ceil(totalLogs.value / itemsPerPage.value));
  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
  const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalLogs.value));
  const paginatedLogs = computed(() => props.logs.slice(startIndex.value, endIndex.value));
  
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
  </script>