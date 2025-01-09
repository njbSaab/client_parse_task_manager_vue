<template>
  <div class="relative" v-auto-animate>
    <!-- Состояние загрузки -->
    <IsLoading v-if="formStore.isLoading"/>

    <!-- Ошибка -->
    <div v-else-if="formStore.error">
      <div class="text-red-500 font-bold text-3xl text-center py-6">
        Ошибка: {{ formStore.error }}
      </div>
    </div>
    <!-- Таблица задач -->
    <div v-else class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <table class="w-full text-left table-auto min-w-max text-slate-800">
        <thead>
          <tr class="text-slate-500 border-b border-slate-300 bg-slate-50">
            <th class="p-4">
                <p class="text-sm leading-none font-normal">
                Имя задачи
                </p>
              </th>
              <th class="p-4">
                <p class="text-sm leading-none font-normal">
                  URL
                </p>
              </th>
              <th class="p-4">
                <p class="text-sm leading-none font-normal">
                  Дата создания
                </p>
              </th>
              <th class="p-4">
                <p class="text-sm leading-none font-normal">
                  Действия
                </p>
              </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in formStore.tasks" :key="task.id">
            <td class="p-4">
              <p class="text-sm font-bold">
              {{ task.name }}
              </p>
            </td>
            <td class="p-4">
              <p class="text-sm">
              {{ task.url }}
            </p>
              </td>
            <td class="p-4">
              <p class="text-sm">
              {{ new Date(task.created_at).toLocaleString() }}
            </p>
            </td>
            <td class="p-4">

              <button @click="viewLogs(task.id)"
              class="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                Посмотреть логи
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  </div>

    <!-- Логи выбранной задачи -->
    <div class="logs" v-if="selectedTaskId && formStore.taskLogs[selectedTaskId]" v-auto-animate>
      <div class="btn-close cursor-pointer hover:scale-110 transition-all" @click="closeLogs">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><mask id="lineMdCloseCircleFilled0"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="#fff" fill-opacity="0" stroke-dasharray="64" stroke-dashoffset="64" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.5s" values="0;1"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/></path><path stroke="#000" stroke-dasharray="8" stroke-dashoffset="8" d="M12 12l4 4M12 12l-4 -4M12 12l-4 4M12 12l4 -4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.1s" dur="0.2s" values="8;0"/></path></g></mask><rect width="24" height="24" fill="#000" mask="url(#lineMdCloseCircleFilled0)"/></svg>
      </div>
      <div class="logs-body">
        <h3 class="text-center font-bold text-slate-400">Логи задачи {{ selectedTaskId }}</h3>
      <table class="w-full text-left table-auto min-w-max text-slate-800">
        <thead>
          <tr class="bg-slate-300 rounded-xl">
            <th class="p-4">Статус</th>
            <th class="p-4">Сообщение</th>
            <th class="p-4">Дата</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in formStore.taskLogs[selectedTaskId]" :key="log.id">
            <td class="p-4">{{ log.status }}</td>
            <td class="p-4">{{ log.message }}</td>
            <td class="p-4">{{ new Date(log.created_at).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFormStore } from "@/stores/formStore";
import { ref, onMounted } from "vue";
import IsLoading from "@/components/ui/isLoading.vue";

const formStore = useFormStore();
const selectedTaskId = ref(null);

onMounted(() => {
  formStore.loadTasks();
});

const viewLogs = (taskId) => {
  selectedTaskId.value = taskId;
  formStore.loadTaskLogs(taskId);
};
const closeLogs = () => {
  selectedTaskId.value = null;
};
</script>

<style scoped>
.logs{
  position: fixed;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: rgba(112, 128, 144, 0.423);
  backdrop-filter: blur(2px);
  opacity: 1;
  transition: .3s ease-in;
  z-index: 99;
  left: 0%;
  top: 0%;
  display: flex;
  place-items: center;
  align-items: center;
}
.logs-body{
	width: 100%;
	height: 70%;
	background: rgb(241 245 249);
  overflow: hidden;
	padding: 20px;
	z-index: 100;
	border-radius: 20px;
  overflow-x: scroll;
  overflow-x: auto;
  padding-top: 55px;
  
}
.logs-body h3{
    position: fixed;
    left: 50%;
    top: 17.5%;
    transform: translateX(-50%);
}
.btn-close{
  position: absolute;
  right: 10px;
  top: 15.5%;
  z-index: 999;
}
</style>