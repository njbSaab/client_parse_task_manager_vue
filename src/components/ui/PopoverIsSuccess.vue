<template>
    <div>
      <!-- Уведомление -->
      <div
        v-if="notification.isVisible"
        :class="[
          'popover fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 font-sans text-sm font-normal break-words whitespace-normal bg-white border rounded-lg shadow-lg w-max shadow-blue-gray-500/10 focus:outline-none',
          notification.type === 'success'
            ? 'text-green-500 border-green-500'
            : 'text-red-500 border-red-500'
        ]"
      >
        <span v-if="notification.type === 'success'">
          Задача добавлена в очередь 🎯
        </span>
        <span v-else>
          Упс неудача, пожалуйста попробуйте еще раз 😔
        </span>
      </div>
  
      <!-- Оверлей -->
      <div
        v-if="notification.isVisible"
        :class="[
          'overlay fixed top-0 left-0 w-screen h-screen',
          notification.type === 'success' ? 'bg-green-300' : 'bg-red-300'
        ]"
      ></div>
    </div>
  </template>
  
  <script setup>
  import { useFormStore } from "@/stores/formStore";
  
  const formStore = useFormStore();
  const notification = formStore.notification;
  </script>
  
  <style scoped>
  .popover {
    z-index: 999;
  }
  .overlay {
    z-index: 998;
    opacity: 0.3;
  }
  </style>