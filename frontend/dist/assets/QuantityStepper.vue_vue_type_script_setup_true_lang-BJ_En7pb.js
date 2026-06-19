import{c as u}from"./createLucideIcon-CX-7LuSD.js";import{e as s,c as m,a as n,b as o,h as d,o as i}from"./index-BCjiyiZH.js";/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r=u("MinusIcon",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=u("PlusIcon",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]),b={class:"inline-grid h-11 grid-cols-[2.75rem_3.5rem_2.75rem] overflow-hidden rounded-md border border-neutral-300 bg-white"},h=["disabled"],V=["min","max","value"],f=["disabled"],g=s({__name:"QuantityStepper",props:{modelValue:{},min:{default:1},max:{default:99}},emits:["update:modelValue"],setup(e){return(a,t)=>(i(),m("div",b,[n("button",{type:"button",class:"grid place-items-center hover:bg-neutral-100",disabled:e.modelValue<=e.min,onClick:t[0]||(t[0]=l=>a.$emit("update:modelValue",e.modelValue-1))},[o(d(r),{class:"h-4 w-4"})],8,h),n("input",{class:"w-full border-x border-neutral-300 text-center text-sm font-semibold outline-none",type:"number",min:e.min,max:e.max,value:e.modelValue,onInput:t[1]||(t[1]=l=>a.$emit("update:modelValue",Number(l.target.value)))},null,40,V),n("button",{type:"button",class:"grid place-items-center hover:bg-neutral-100",disabled:e.modelValue>=e.max,onClick:t[2]||(t[2]=l=>a.$emit("update:modelValue",e.modelValue+1))},[o(d(c),{class:"h-4 w-4"})],8,f)]))}});export{g as _};
