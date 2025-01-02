//views/TaskManagerView.vue
<script setup>
import TabsLayout from "@/components/layouts/TabsLayout.vue";
import AccordionSearch from "@/components/ui/AccordionSearch.vue";
import InputSearch from "@/components/ui/InputSearch.vue";
import TextSearch from "@/components/ui/TextSearch.vue";
import SelectSearch from "@/components/ui/SelectSearch.vue";
import CardSearch from "@/components/ui/CardSearch.vue";
import RaportTable from "@/components/ui/RaportTable.vue";
</script>

<template>
  <TabsLayout>
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

    <template #content-all>
      <ul class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <li v-for="i in 5" :key="i">
          <CardSearch />
        </li>
      </ul>
    </template>

    <template #content-report>
      <RaportTable />
    </template>
  </TabsLayout>
</template>