<template>
    <div v-if="items && items.length > 0" class="relative flex flex-col rounded-lg bg-white shadow-sm border border-slate-200">
      <div
        v-if="!isDropdownOpen"
        role="button"
        @click="toggleDropdown"
        class="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
      >
        {{ modelValue?.label || "Выберите" }}
      </div>
      <nav v-else class="flex min-w-[240px] flex-col gap-1 p-1.5">
        <div
          v-for="item in items"
          :key="item.id"
          role="button"
          @click="selectItem(item)"
          class="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
        >
          {{ item.label }}
        </div>
      </nav>
    </div>
    <div v-else class="text-slate-500">Нет доступных опций</div>
</template>
  
<script setup>
  import { ref } from "vue";
  
  const props = defineProps({
    items: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Object,
      default: () => ({ label: "", id: null }), // Значение по умолчанию
    },
  });
  
  const emit = defineEmits(["update:modelValue"]);
  
  const isDropdownOpen = ref(false);
  
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };
  
  const selectItem = (item) => {
    emit("update:modelValue", item);
    isDropdownOpen.value = false;
  };
  </script>