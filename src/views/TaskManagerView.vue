<script setup>
import TabsLayout from "@/components/layouts/TabsLayout.vue";
import AccordionSearch from "@/components/ui/AccordionSearch.vue";
import InputSearch from "@/components/ui/InputSearch.vue";
import TextSearch from "@/components/ui/TextSearch.vue";
import SelectSearch from "@/components/ui/SelectSearch.vue";
import RaportTable from "@/components/ui/RaportTable.vue";
import TaskList from "@/components/layouts/TaskList.vue";
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
      <TaskList />
    </template>

    <template #content-report>
      <RaportTable />
    </template>
  </TabsLayout>
</template>