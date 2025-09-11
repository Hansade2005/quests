import{f as d,e as o,b as c,j as t,B as i,l as u,k as l}from"./browser-ByRVlxZs.js";import{C as g,u as h}from"./use-app-state-XN3_o-A1.js";import{C as m}from"./chevron-right-Bveoklej.js";import{C as x}from"./check-C4BuViip.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}]],j=d("panel-left",f);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]],v=d("pause",p);function N(){const{mutateAsync:e}=o(c.tabs.navigateCurrentBack.mutationOptions()),{mutateAsync:n}=o(c.tabs.navigateCurrentForward.mutationOptions()),a=async()=>{try{await e({})}catch(s){u.error("Error navigating back",{error:s})}},r=async()=>{try{await n({})}catch(s){u.error("Error navigating forward",{error:s})}};return t.jsxs("div",{className:"flex items-center gap-1 pr-1",children:[t.jsx(i,{className:"size-6 text-muted-foreground",onClick:a,size:"icon",title:"Go back",variant:"ghost",children:t.jsx(g,{className:"h-4 w-4"})}),t.jsx(i,{className:"size-6 text-muted-foreground",onClick:r,size:"icon",title:"Go forward",variant:"ghost",children:t.jsx(m,{className:"h-4 w-4"})})]})}function A({className:e="h-4 w-4",subdomain:n}){const{data:a}=h({subdomain:n}),r=a?.sessionActors.flatMap(s=>s.tags)??[];switch(!0){case r.includes("agent.paused"):return t.jsx(v,{className:`${e} text-warning-foreground`});case a?.checkoutVersionRefActor.status==="active":case a?.createPreviewRefActor.status==="active":case r.includes("agent.running"):return t.jsx(l,{className:`${e} animate-spin`});case r.includes("agent.done"):return t.jsx(x,{className:`${e} text-green-600 dark:text-green-400`});default:return null}}export{A,N,j as P};
