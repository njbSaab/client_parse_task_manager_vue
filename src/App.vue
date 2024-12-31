<script setup>
import TabsLayout from "./components/TabsLayout.vue";
import AccordionSearch from "./components/ui/AccordionSearch.vue";
import InputSearch from "./components/ui/InputSearch.vue";
import TextSearch from "./components/ui/TextSearch.vue";
import SelectSearch from "./components/ui/SelectSearch.vue";
import CardSearch from "./components/ui/CardSearch.vue";
import RaportTable from "./components/ui/RaportTable.vue";
</script>

<template>
  <div class="app-container p-4">
    <h1 class="text-2xl font-bold text-center mb-4">Task Manager</h1>
    <TabsLayout>
      <template #content-all>
        <CardSearch/>
        <CardSearch/>
        <CardSearch/>
      </template>
      <!-- Tab 2 -->
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

      <!-- Tab 3 -->
      <template #content-report>
        <RaportTable />
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