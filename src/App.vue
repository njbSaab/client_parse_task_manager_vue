<script setup>
import TabsLayout from "./components/TabsLayout.vue";
import AccordionSearch from "./components/ui/AccordionSearch.vue";
import InputSearch from "./components/ui/InputSearch.vue";
import TextSearch from "./components/ui/TextSearch.vue";
import SelectSearch from "./components/ui/SelectSearch.vue";
</script>

<template>
  <div class="app-container p-4">
    <h1 class="text-2xl font-bold text-center mb-4">Task Manager</h1>
    <TabsLayout>
      <!-- Tab 1 -->
      <template #content-search>
        <AccordionSearch>
          <template #content-1>
            <InputSearch />
          </template>
          <template #content-2>
            <TextSearch />
          </template>
          <template #content-3>
            <SelectSearch />
          </template>
        </AccordionSearch>
      </template>

      <!-- Tab 2 -->
      <template #content-report>
        <div class="p-4 bg-slate-100 rounded-md">
          Здесь будет отчёт.
        </div>
      </template>
    </TabsLayout>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>