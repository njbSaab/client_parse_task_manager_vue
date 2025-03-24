<template>
  <div class="w-[95%] md:max-w-sm md:min-w-[80%] mx-auto">
    <div class="relative my-[10px]">
      <textarea
        rows="4"
        ref="textareaRef"
        v-model="formData.content"
        @focus="handleFocus"
        @blur="handleBlur"
        placeholder=" "
        class="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      ></textarea>
      <label
        :class="[
          'absolute bg-white px-1 left-2.5 text-slate-400 text-sm transition-all transform origin-left',
          isFocused || formData.content ? '-top-2 text-xs scale-90' : 'top-2.5 text-sm scale-100',
        ]"
        @click="focusTextarea"
      >
        Что найти? Вставьте текст сюда
      </label>
    </div>
  </div>
</template>

<script setup>
import { useFormStore } from "@/stores/formStore";
import { ref } from "vue";

const { formData } = useFormStore();
const textareaRef = ref(null);
const isFocused = ref(false);

const focusTextarea = () => {
  textareaRef.value?.focus();
};

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};
</script>

<style scoped>
label {
  cursor: text;
}
</style>