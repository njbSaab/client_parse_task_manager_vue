<template>
    <!-- <div
      class="task-card p-4 border rounded-lg shadow hover:shadow-lg cursor-pointer"
      :class="{ 'bg-blue-50': isSelected }"
      @click="$emit('click')"
    >
      <h2 class="text-lg font-bold text-gray-800 truncate">{{ task.name }}</h2>
      <p class="text-sm text-gray-600 mt-2 truncate">{{ task.content }}</p>
      <div class="text-sm text-gray-500 mt-4">
        Интервал: <strong>{{ task.interval }}</strong>
        <br />
        Период: <strong>{{ task.period }}</strong>
      </div>
      <a
        href="#"
        class="mt-4 inline-block text-blue-500 hover:underline text-sm"
      >
        Подробнее
      </a>
    </div> -->

<div class="card-search cursor-pointer shadow-lg relative flex flex-col bg-white border border-slate-200 rounded-lg mx-auto w-[98%] md:w-[375px] overflow-hidden hover:scale-105 transition duration-300 ease" v-auto-animate
@click="$emit('click')"
>      
    <div class="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1 flex justify-between items-center">
        <span class="text-sm font-medium text-slate-600">
        Status: <span class="text-green-500">Ok</span>
        </span>
        <span class="text-sm font-normal text-slate-500">
            {{ task.interval }}
        </span>
    </div>
    
    <div class="p-4">
        <h5 class="mb-2 text-slate-800 text-xl font-semibold overflow-hidden">
            {{ task.name.slice(-8, 25) }}
        </h5>
        <p class="text-slate-600 leading-normal font-light">
            {{ task.content }}
        </p>
    </div>
    <div class="mx-3 border-t border-slate-200 pb-3 pt-2 px-1 flex justify-between">
        <span class="text-sm text-slate-600 font-medium">
        {{ task.created_at.slice(0, 10)}}
        </span>

        <a href="#" class="text-slate-800 font-semibold text-sm hover:underline flex items-center">
        Learn More
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4 svg-arrow-r " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </a>
    </div>
</div>

</template>
  
<script setup>
  const props = defineProps({
    task: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  });
</script>
  
<style scoped>
  .task-card {
    transition: all 0.3s;
  }
  .task-card:hover {
    transform: translateY(-3px);
  }
</style>