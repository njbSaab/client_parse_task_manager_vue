<template>
  <div class="w-[95%] md:max-w-sm md:min-w-[80%] mx-auto">
    <p>Вставьте сайт сюда:</p>
    <div class="relative mt-[10px] mb-[20px]">
      <input
        type="text"
        id="url-input"
        ref="inputRef"
        v-model="formData.url"
        @focus="handleFocus"
        @blur="handleBlur"
        class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow z-10"
      />
      <label
        :class="[
          'absolute bg-white px-1 left-2.5 text-slate-400 text-sm transition-all transform origin-left',
          isFocused || formData.url ? '-top-2 text-xs scale-90' : 'top-3 text-sm scale-100',
        ]"
        @click="focusInput"
      >
        https://example.com
      </label>
    </div>
  </div>
</template>

<script setup>
import { useFormStore } from "@/stores/formStore";
import { ref } from "vue";

const { formData } = useFormStore();
const inputRef = ref(null);
const isFocused = ref(false);

// Фокус на input при клике на label
const focusInput = () => {
  inputRef.value?.focus();
};

// Обработчик события фокуса
const handleFocus = () => {
  isFocused.value = true;
};

// Обработчик события потери фокуса
const handleBlur = () => {
  isFocused.value = false;
};
</script>

<style scoped>
/* Стили для label */
label {
  cursor: text;
}
</style>