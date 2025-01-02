<template>
  <div>
    <button
      @click="submitForm"
      class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-lg md:text-xl py-2.5 md:py-[10px] w-full md:w-[50%] mx-auto block px-10 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none focus:shadow-none  focus:ring-0 active:ring-0"
    >
      Запустить
    </button>
  </div>
</template>

<script setup>
import { useFormStore } from "@/stores/formStore";
const { submitForm } = useFormStore();
</script>

<style scoped>
/* Стили */
</style>