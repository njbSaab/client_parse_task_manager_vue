import{r as w,c as m,o as u,a as g,b as e,w as j,v as S,F as _,d as y,e as p,t as o,n as C,f as D,g as P,h as M,i as B,u as L,j as N,k as T,l as V,m as A,p as q,I as E}from"./index-DFxKXc3S.js";const F={key:0,class:"mt-4"},I={class:"relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border overflow-hidden overflow-x-auto"},R={class:"w-full text-left table-auto min-w-max"},U={class:"p-4 py-5"},z={class:"block font-semibold text-sm text-slate-800"},H={class:"p-4 py-5"},O={class:"text-sm text-slate-500"},G={class:"p-4 py-5"},J={class:"text-sm text-slate-500"},K={class:"flex justify-between items-center px-4 py-3"},Q={class:"text-sm text-slate-500"},W={class:"flex space-x-1"},X=["disabled"],Y=["onClick"],Z=["disabled"],ee={key:1,class:"mt-4 text-slate-500"},te={__name:"TaskLogsTable",props:{logs:{type:Array,required:!0,default:()=>[]}},setup(s){const a=s,l=w(1),d=w(5),n=m(()=>a.logs.length),b=m(()=>Math.ceil(n.value/d.value)),f=m(()=>(l.value-1)*d.value),c=m(()=>Math.min(f.value+d.value,n.value)),t=m(()=>a.logs.slice(f.value,c.value));function x(){l.value>1&&l.value--}function v(){l.value<b.value&&l.value++}function $(h){l.value=h}return(h,r)=>{var k;return(k=s.logs)!=null&&k.length?(u(),g("div",F,[r[4]||(r[4]=e("h2",{class:"text-xl font-semibold mb-3"},"Логи задачи",-1)),r[5]||(r[5]=e("label",{class:"mr-2 text-sm text-slate-500"},"Логов на странице:",-1)),j(e("select",{"onUpdate:modelValue":r[0]||(r[0]=i=>d.value=i),class:"border rounded p-1 text-sm bg-white mb-3"},r[1]||(r[1]=[e("option",{value:5},"5",-1),e("option",{value:10},"10",-1),e("option",{value:20},"20",-1)]),512),[[S,d.value]]),e("div",I,[e("table",R,[r[2]||(r[2]=e("thead",null,[e("tr",null,[e("th",{class:"p-4 border-b border-slate-200 bg-slate-50"},[e("p",{class:"text-sm font-normal leading-none text-slate-500"},"ID")]),e("th",{class:"p-4 border-b border-slate-200 bg-slate-50"},[e("p",{class:"text-sm font-normal leading-none text-slate-500"},"Сообщение")]),e("th",{class:"p-4 border-b border-slate-200 bg-slate-50"},[e("p",{class:"text-sm font-normal leading-none text-slate-500"},"Дата создания")])])],-1)),e("tbody",null,[(u(!0),g(_,null,y(t.value,i=>(u(),g("tr",{key:i.id,class:"hover:bg-slate-50 border-b border-slate-200"},[e("td",U,[e("p",z,o(i.id),1)]),e("td",H,[e("p",O,o(i.message),1)]),e("td",G,[e("p",J,o(new Date(i.created_at).toLocaleString()),1)])]))),128))])]),e("div",K,[e("div",Q,[r[3]||(r[3]=p(" Showing ")),e("b",null,o(f.value+1)+"-"+o(c.value),1),p(" of "+o(n.value),1)]),e("div",W,[e("button",{onClick:x,disabled:l.value===1,class:"px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease disabled:opacity-50"}," Prev ",8,X),(u(!0),g(_,null,y(b.value,i=>(u(),g("button",{key:i,onClick:pe=>$(i),class:C(["px-3 py-1 min-w-9 min-h-9 text-sm font-normal rounded transition duration-200 ease",l.value===i?"text-white bg-slate-800 border border-slate-800 hover:bg-slate-600 hover:border-slate-600":"text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-400"])},o(i),11,Y))),128)),e("button",{onClick:v,disabled:l.value===b.value,class:"px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease disabled:opacity-50"}," Next ",8,Z)])])])])):(u(),g("p",ee,"Логов пока нет."))}}},se=D("taskStore",{state:()=>({tasks:[],taskLogs:{},selectedTask:null,isLoading:!1,error:null}),actions:{async loadTasks(){this.isLoading=!0,this.error=null;try{const s=await P();if(console.log("Данные от fetchTasks:",s),!Array.isArray(s))throw new Error("Сервер вернул данные, не являющиеся массивом");this.tasks=s.map(a=>({...a,created_at:a.created_at?new Date(a.created_at).toLocaleString():"Неизвестно"})),this.selectedTask=this.tasks.length>0?this.tasks[0]:null,console.log("Обработанные задачи:",this.tasks)}catch(s){s.message==="У вас нет задач. Вам нужно перейти в новую задачу и создать."?(console.warn(s.message),this.tasks=[]):(this.error=s.message||"Ошибка при загрузке задач",console.error("Ошибка при загрузке задач:",s))}finally{this.isLoading=!1}},selectTask(s){this.selectedTask=s,console.log("Выбрана задача:",s)},async loadTaskLogs(s){if(this.taskLogs[s]){console.log(`Логи для задачи ${s} уже загружены:`,this.taskLogs[s]);return}try{const a=await M(s);console.log(`Загруженные логи для задачи ${s}:`,a),this.taskLogs[s]=a}catch(a){console.error(`Ошибка при загрузке логов задачи ${s}:`,a),this.error=a.message||"Ошибка при загрузке логов"}}}}),le={key:1,class:"container mx-auto p-4"},oe={class:"text-2xl font-bold flex flex-col items-center"},ae={class:"font-normal text-gray-500 text-sm"},ne={key:0,class:"bg-white shadow-lg rounded-lg p-6 flex flex-col items-start"},re={class:"flex items-center justify-between"},ie={class:"flex items-center justify-between"},de={class:"flex items-center justify-between"},ue={class:"flex items-center justify-between"},ce={class:"flex items-center justify-between"},ge={class:"flex items-center justify-between"},me={class:"flex items-center justify-between"},be={class:"flex items-center justify-between"},fe={key:1,class:"text-red-500"},xe={__name:"TaskDetailsView",setup(s){const a=A(),l=se(),d=a.params.id,n=m(()=>l.selectedTask),b=m(()=>l.taskLogs);m(()=>l.isLoading);const f=m(()=>l.error);return B(async()=>{try{l.tasks.length||await l.loadTasks();const c=l.tasks.find(t=>t.id===Number(d));c?(l.selectTask(c),await l.loadTaskLogs(d)):l.error=`Задача с ID ${d} не найдена`}catch(c){l.error=c.message||"Неизвестная ошибка при загрузке данных",console.error("Ошибка в onMounted:",c)}}),(c,t)=>{var v;const x=q("router-link");return L(l).isLoading?(u(),N(E,{key:0})):(u(),g("div",le,[e("h1",oe,[t[0]||(t[0]=p(" Детали задачи: ")),e("span",ae,o(((v=n.value)==null?void 0:v.name)||"Загрузка..."),1)]),n.value?(u(),g("div",ne,[e("p",re,[t[1]||(t[1]=e("strong",null,"ID:",-1)),e("span",null,o(n.value.id),1)]),e("p",ie,[t[2]||(t[2]=e("strong",null,"Название:",-1)),e("span",null,o(n.value.name),1)]),e("p",de,[t[3]||(t[3]=e("strong",null,"URL:",-1)),e("span",null,o(n.value.url),1)]),e("p",ue,[t[4]||(t[4]=e("strong",null,"Содержимое:",-1)),e("span",null,o(n.value.content),1)]),e("p",ce,[t[5]||(t[5]=e("strong",null,"Интервал:",-1)),e("span",null,o(n.value.interval),1)]),e("p",ge,[t[6]||(t[6]=e("strong",null,"Частота:",-1)),e("span",null,o(n.value.frequency||"Не указано"),1)]),e("p",me,[t[7]||(t[7]=e("strong",null,"Период:",-1)),e("span",null,o(n.value.period||"Не указано"),1)]),e("p",be,[t[8]||(t[8]=e("strong",null,"Дата создания:",-1)),e("span",null,o(n.value.created_at),1)]),t[9]||(t[9]=e("p",{class:"flex items-center justify-between"},[e("strong",null,"Статус:"),p(),e("span",{class:"text-green-500"},"Ok")],-1)),T(te,{logs:b.value[L(d)]||[]},null,8,["logs"])])):(u(),g("div",fe,[e("p",null,"Задача не найдена или произошла ошибка: "+o(f.value),1)])),T(x,{to:"/",class:"mt-4 text-blue-600 hover:underline flex items-center justify-center"},{default:V(()=>t[10]||(t[10]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"ml-2 h-4 w-4 svg-arrow-r rotate-180",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M14 5l7 7m0 0l-7 7m7-7H3"})],-1),p(" Назад к списку задач ")])),_:1})]))}}};export{xe as default};
