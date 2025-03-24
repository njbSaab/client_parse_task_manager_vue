import{d as h,f as x,a as y,c as g,o as L,u as T,b as _,e as u,g as t,h as r,t as a,F as b,r as S,i as D,w as B,j as N,k as V,l as i,I as $}from"./index-DxDtm6bg.js";const j=h("taskStore",{state:()=>({tasks:[],taskLogs:{},selectedTask:null,isLoading:!1,error:null}),actions:{async loadTasks(){this.isLoading=!0,this.error=null;try{const e=await x();if(console.log("Данные от fetchTasks:",e),!Array.isArray(e))throw new Error("Сервер вернул данные, не являющиеся массивом");this.tasks=e.map(n=>({...n,created_at:n.created_at?new Date(n.created_at).toLocaleString():"Неизвестно"})),this.selectedTask=this.tasks.length>0?this.tasks[0]:null,console.log("Обработанные задачи:",this.tasks)}catch(e){e.message==="У вас нет задач. Вам нужно перейти в новую задачу и создать."?(console.warn(e.message),this.tasks=[]):(this.error=e.message||"Ошибка при загрузке задач",console.error("Ошибка при загрузке задач:",e))}finally{this.isLoading=!1}},selectTask(e){this.selectedTask=e,console.log("Выбрана задача:",e)},async loadTaskLogs(e){if(this.taskLogs[e]){console.log(`Логи для задачи ${e} уже загружены:`,this.taskLogs[e]);return}try{const n=await y(e);console.log(`Загруженные логи для задачи ${e}:`,n),this.taskLogs[e]=n}catch(n){console.error(`Ошибка при загрузке логов задачи ${e}:`,n),this.error=n.message||"Ошибка при загрузке логов"}}}}),C={key:1,class:"container mx-auto p-4"},M={class:"text-2xl font-bold mb-4"},A={class:"font-normal text-gray-500 text-sm"},E={key:0,class:"bg-white shadow-lg rounded-lg p-6"},F={key:0,class:"mt-4"},R={class:"list-disc pl-5"},q={key:1,class:"mt-4 text-slate-500"},H={key:1,class:"text-red-500"},U={__name:"TaskDetailsView",setup(e){const n=N(),o=j(),c=n.params.id,l=g(()=>o.selectedTask),m=g(()=>o.taskLogs);g(()=>o.isLoading);const v=g(()=>o.error);return L(async()=>{try{o.tasks.length||await o.loadTasks();const d=o.tasks.find(s=>s.id===Number(c));d?(o.selectTask(d),await o.loadTaskLogs(c)):o.error=`Задача с ID ${c} не найдена`}catch(d){o.error=d.message||"Неизвестная ошибка при загрузке данных",console.error("Ошибка в onMounted:",d)}}),(d,s)=>{var p,f;const w=V("router-link");return T(o).isLoading?(i(),_($,{key:0})):(i(),u("div",C,[t("h1",M,[s[0]||(s[0]=r("Детали задачи: ")),t("span",A,a(((p=l.value)==null?void 0:p.name)||"Загрузка..."),1)]),l.value?(i(),u("div",E,[t("p",null,[s[1]||(s[1]=t("strong",null,"ID:",-1)),r(" "+a(l.value.id),1)]),t("p",null,[s[2]||(s[2]=t("strong",null,"Название:",-1)),r(" "+a(l.value.name),1)]),t("p",null,[s[3]||(s[3]=t("strong",null,"URL:",-1)),r(" "+a(l.value.url),1)]),t("p",null,[s[4]||(s[4]=t("strong",null,"Содержимое:",-1)),r(" "+a(l.value.content),1)]),t("p",null,[s[5]||(s[5]=t("strong",null,"Интервал:",-1)),r(" "+a(l.value.interval),1)]),t("p",null,[s[6]||(s[6]=t("strong",null,"Частота:",-1)),r(" "+a(l.value.frequency||"Не указано"),1)]),t("p",null,[s[7]||(s[7]=t("strong",null,"Период:",-1)),r(" "+a(l.value.period||"Не указано"),1)]),t("p",null,[s[8]||(s[8]=t("strong",null,"Дата создания:",-1)),r(" "+a(l.value.created_at),1)]),s[10]||(s[10]=t("p",null,[t("strong",null,"Статус:"),r(),t("span",{class:"text-green-500"},"Ok")],-1)),(f=m.value[l.value.id])!=null&&f.length?(i(),u("div",F,[s[9]||(s[9]=t("h2",{class:"text-xl font-semibold"},"Логи задачи",-1)),t("ul",R,[(i(!0),u(b,null,S(m.value[l.value.id],k=>(i(),u("li",{key:k.id,class:"text-sm text-slate-600"},a(k.message)+" ("+a(new Date(k.created_at).toLocaleString())+") ",1))),128))])])):(i(),u("p",q,"Логов пока нет."))])):(i(),u("div",H,[t("p",null,"Задача не найдена или произошла ошибка: "+a(v.value),1)])),D(w,{to:"/",class:"mt-4 text-blue-600 hover:underline flex items-center justify-center"},{default:B(()=>s[11]||(s[11]=[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"ml-2 h-4 w-4 svg-arrow-r rotate-180",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M14 5l7 7m0 0l-7 7m7-7H3"})],-1),r(" Назад к списку задач ")])),_:1})]))}}};export{U as default};
