import{j as L,r as x,R as P,a as E}from"./vendor.ced653b1.js";const R=function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))f(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&f(i)}).observe(document,{childList:!0,subtree:!0});function v(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerpolicy&&(a.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?a.credentials="include":r.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function f(r){if(r.ep)return;r.ep=!0;const a=v(r);fetch(r.href,a)}};R();function k(e){return e<0?e*-1:e}const t=L.exports.jsx,o=L.exports.jsxs,j=e=>t("div",{className:"atom-core",style:{top:`${e.y}%`,left:`${e.x}%`},children:t("div",{className:"atom-shell"})}),A=e=>t("div",{className:`particle ${e.activated?"particle-activated":""}`,style:{left:`${e.x}%`,top:`${e.y}%`}}),g=2,F=2e4,p=[];for(let e=2;e<9;e++)e%2==0?p.push({x:50,y:e*10}):(p.push({x:40,y:e*10}),p.push({x:60,y:e*10}));const s={spawnChance:.05,maxParticles:100,autoSpawn:!0,paused:!0,mode:"rutherford"};let C=0;const $=()=>{const[e,l]=x.exports.useState([]),[v,f]=x.exports.useState("NaN"),r=x.exports.useCallback((i,u)=>{if(s.paused)return l([...e]);const h=window.performance.now()-i;u%6==0&&f(`${Math.round(h)}ms, ${Math.round(1e3/h)} FPS, ${e.length} particles`),Math.random()>1-s.spawnChance&&e.length<s.maxParticles&&s.autoSpawn&&e.push({x:0,y:Math.random()*75+12.5,vx:Math.random()*2.75+.25,vy:Math.random()>.5?Math.random()*2-1:0,activated:!1,lifetime:0}),l(e.map(n=>{if(n.lifetime+=h,n.x+=n.vx*.01*h,n.y+=n.vy*.01*h,s.mode=="rutherford"){const _=p.map(c=>({dist:Math.sqrt(Math.pow(c.x-n.x,2)+Math.pow(c.y-n.y,2)),atom:c}));let w=!1;for(const c of _)if(c.dist<g){w=!0;const b=-(n.x-c.atom.x),M=-(n.y-c.atom.y);let m=g-k(b),y=g-k(M);const S=(m+y)/g,N=m/(m+y),T=y/(m+y);n.vx-=N*S*.2*(b<0?-1:1),n.vy-=T*S*.2*(M<0?-1:1)}n.activated=w}return n}).filter(n=>n.x>0&&n.x<99&&n.y>0&&n.y<99&&n.lifetime<F))},[e]),a=window.performance.now();return x.exports.useEffect(()=>{requestAnimationFrame(()=>r(a,C+1)),C++},[e]),o("div",{style:{width:"100%",height:"75%"},children:[t("span",{style:{position:"fixed",left:"5px",top:"5px"},children:v}),p.map((i,u)=>t(j,{x:i.x,y:i.y},u)),e.map((i,u)=>t(A,{x:i.x,y:i.y,activated:i.activated},u))]})},d={textAlign:"right"},I=()=>o("div",{style:{position:"absolute",right:"5px",top:"5px",zIndex:100},children:[o("div",{style:d,children:[t("span",{children:"Simulation Type"}),o("select",{style:{width:"128px",marginLeft:"8px"},onChange:e=>{s.mode=e.currentTarget.value},defaultValue:"rutherford",children:[t("option",{value:"rosinenkuchen",children:"Rosinenkuchen"}),t("option",{value:"rutherford",children:"Rutherford"})]})]}),o("div",{style:d,children:[t("span",{children:"Dark Theme"}),t("input",{style:{width:"64px",marginLeft:"8px"},type:"checkbox",onChange:e=>{e.currentTarget.checked?document.body.className="dark":document.body.className="light"},defaultChecked:!0})]}),o("div",{style:d,children:[t("span",{children:"Paused"}),t("input",{style:{width:"64px",marginLeft:"8px"},type:"checkbox",onChange:e=>{s.paused=e.currentTarget.checked},defaultChecked:!0})]}),o("div",{style:d,children:[t("span",{children:"Enable Spawning"}),t("input",{style:{width:"64px",marginLeft:"8px"},type:"checkbox",onChange:e=>{s.autoSpawn=e.currentTarget.checked},defaultChecked:!0})]}),o("div",{style:d,children:[t("span",{children:"Spawn Chance (0-1)"}),t("input",{style:{width:"64px",marginLeft:"8px"},type:"number",onChange:e=>{s.spawnChance=parseFloat(e.currentTarget.value)},defaultValue:.05,step:.05,min:0,max:1})]}),o("div",{style:d,children:[t("span",{children:"Max Particles"}),t("input",{style:{width:"64px",marginLeft:"8px"},type:"number",onChange:e=>{s.maxParticles=parseFloat(e.currentTarget.value)},defaultValue:100,step:10,min:0,max:1e3})]})]}),O=e=>t("div",{className:"footer",children:e.children});function D(){return o("div",{children:[t(I,{}),t($,{}),o(O,{children:[t("a",{href:"https://en.wikipedia.org/wiki/Rutherford_model",children:"Rutherford Model"})," \u2022 ",t("a",{href:"https://github.com/janderedev/rutherford_simulation/blob/master/LICENSE",children:"AGPLv3"})," \u2022 ",t("a",{href:"https://github.com/janderedev/rutherford_simulation",children:"GitHub"})]})]})}P.render(t(E.StrictMode,{children:t(D,{})}),document.getElementById("root"));