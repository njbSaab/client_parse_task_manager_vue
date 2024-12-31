<template>
  <div class="tabs-layout">
    <!-- Навигация по табам -->
    <ul class="flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100">
      <li
        v-for="tab in tabs"
        :key="tab.id"
        class="z-30 flex-auto text-center"
        v-auto-animate
      >
        <button
          @click="setActiveTab(tab.id)"
          :class="activeTab === tab.id ? 'text-white bg-gray-800' : 'text-slate-600 bg-inherit'"
          class="flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer font-bold" v-auto-animate
        >
          {{ tab.label }}
        </button>
      </li>
    </ul>

    <!-- Контент активного таба -->
    <div class="py-5" v-auto-animate>
      <div v-if="activeTab === 'search'">
        <slot name="content-search" />
      </div>
      <div v-if="activeTab === 'report'">
        <slot name="content-report" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tabs = ref([
  { id: "search", label: "Search" },
  { id: "report", label: "Report" },
]);

const activeTab = ref("search");

const setActiveTab = (id) => {
  activeTab.value = id;
};
</script>

<style scoped>
button {
  outline: none;
}
</style>