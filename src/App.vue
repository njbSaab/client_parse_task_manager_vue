<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app-container p-4">
    <h1 class="text-2xl font-bold text-center mb-4">Task Manager</h1>
    <RouterView /> <!-- Динамический рендеринг страниц -->
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>