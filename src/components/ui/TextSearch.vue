// components/ui/TextSearch.vue
<template>
  <div class="w-full md:max-w-sm md:min-w-[80%] mx-auto">
    <div class="relative my-[10px]">
      <textarea
        rows="4"
        v-model="formData.content"
        placeholder=" "
        class="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      ></textarea>
      <label class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
        Что найти? Вставьте текст сюда
      </label>
    </div>
  </div>
</template>

<script setup>
import { useFormStore } from "@/stores/formStore";
const { formData } = useFormStore();
</script>

<style scoped>
/* Стили */
</style>