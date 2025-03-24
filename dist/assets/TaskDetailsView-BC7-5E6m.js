import{d as f,f as y,a as L,o as T,c as r,b as t,t as l,e as n,F as w,r as h,g as c,w as v,u as b,h as S,i}from"./index-DVyeJaRZ.js";const D=f("taskStore",{state:()=>({tasks:[],taskLogs:{},selectedTask:null,isLoading:!1,error:null}),actions:{async loadTasks(){this.isLoading=!0,this.error=null;try{const o=await y();if(!Array.isArray(o))throw new Error("Сервер вернул данные, не являющиеся массивом");this.tasks=o.map(a=>({...a,created_at:a.created_at?new Date(a.created_at).toLocaleString():"Неизвестно"})),this.selectedTask=this.tasks.length>0?this.tasks[0]:null,console.log("Загруженные задачи:",this.tasks)}catch(o){o.message==="У вас нет задач. Вам нужно перейти в новую задачу и создать."?(console.warn(o.message),this.tasks=[]):(this.error=o.message||"Ошибка при загрузке задач",console.error("Ошибка при загрузке задач:",o))}finally{this.isLoading=!1}},selectTask(o){this.selectedTask=o},async loadTaskLogs(o){if(this.taskLogs[o]){console.log(`Логи для задачи ${o} уже загружены.`);return}try{const a=await L(o);console.log(`Загруженные логи для задачи ${o}:`,a),this.taskLogs[o]=a}catch(a){console.error(`Ошибка при загрузке логов задачи ${o}:`,a)}}}}),V={class:"container mx-auto p-4"},B={class:"text-2xl font-bold mb-4"},N={key:0,class:"bg-white shadow-lg rounded-lg p-6"},$={key:0,class:"mt-4"},A={class:"list-disc pl-5"},C={key:1,class:"mt-4 text-slate-500"},E={key:1,class:"text-center"},F={key:2,class:"text-red-500"},q={__name:"TaskDetailsView",setup(o){const a=b(),d=D(),k=a.params.id;return T(async()=>{d.tasks.length||await d.loadTasks();const e=d.tasks.find(s=>s.id==k);e&&(d.selectTask(e),await d.loadTaskLogs(k))}),(e,s)=>{var g,p;const m=S("router-link");return i(),r("div",V,[t("h1",B,"Детали задачи: "+l((g=e.task)==null?void 0:g.name),1),e.task?(i(),r("div",N,[t("p",null,[s[0]||(s[0]=t("strong",null,"ID:",-1)),n(" "+l(e.task.id),1)]),t("p",null,[s[1]||(s[1]=t("strong",null,"Название:",-1)),n(" "+l(e.task.name),1)]),t("p",null,[s[2]||(s[2]=t("strong",null,"URL:",-1)),n(" "+l(e.task.url),1)]),t("p",null,[s[3]||(s[3]=t("strong",null,"Содержимое:",-1)),n(" "+l(e.task.content),1)]),t("p",null,[s[4]||(s[4]=t("strong",null,"Интервал:",-1)),n(" "+l(e.task.interval),1)]),t("p",null,[s[5]||(s[5]=t("strong",null,"Частота:",-1)),n(" "+l(e.task.frequency),1)]),t("p",null,[s[6]||(s[6]=t("strong",null,"Период:",-1)),n(" "+l(e.task.period),1)]),t("p",null,[s[7]||(s[7]=t("strong",null,"Дата создания:",-1)),n(" "+l(e.task.created_at),1)]),s[9]||(s[9]=t("p",null,[t("strong",null,"Статус:"),n(),t("span",{class:"text-green-500"},"Ok")],-1)),(p=e.taskLogs[e.task.id])!=null&&p.length?(i(),r("div",$,[s[8]||(s[8]=t("h2",{class:"text-xl font-semibold"},"Логи задачи",-1)),t("ul",A,[(i(!0),r(w,null,h(e.taskLogs[e.task.id],u=>(i(),r("li",{key:u.id,class:"text-sm text-slate-600"},l(u.message)+" ("+l(new Date(u.created_at).toLocaleString())+") ",1))),128))])])):(i(),r("p",C,"Логов пока нет."))])):e.isLoading?(i(),r("div",E,s[10]||(s[10]=[t("p",null,"Загрузка...",-1)]))):(i(),r("div",F,[t("p",null,"Задача не найдена или произошла ошибка: "+l(e.error),1)])),c(m,{to:"/",class:"mt-4 inline-block text-blue-600 hover:underline"},{default:v(()=>s[11]||(s[11]=[n(" Назад к списку задач ")])),_:1})])}}};export{q as default};
