import{m as n}from"./index.b7b39bcc.js";function c(e,u=300,o){let t=null;return n((m,i)=>({get(){return m(),e},set(r){t&&clearTimeout(t),t=setTimeout(()=>{e=r,o(r),i()},u)}}))}export{c as u};
