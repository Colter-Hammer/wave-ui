import{r as t,o as l,e as _,f as e,w as r,i as a,g as h}from"./vendor.e64646cc.js";import{_ as d,j as $}from"./index.cb32932c.js";const v=a("Default");function x(s,n,m,u,f,p){const o=t("title-link"),c=t("example");return l(),_("div",null,[e(o,{h2:""},{default:r(()=>[v]),_:1}),e(c,null,{pug:r(()=>[]),_:1})])}const k={};var w=d(k,[["render",x]]);const g=h("div",{class:"w-divider my12"},null,-1),D=a("API"),y=a("The missing props descriptions will be added shortly (all the props are already listed).");function B(s,n,m,u,f,p){const o=t("title-link"),c=t("alert"),i=t("component-api");return l(),_("div",null,[g,e(o,{class:"title1",h2:""},{default:r(()=>[D]),_:1}),e(c,{class:"mb6",info:""},{default:r(()=>[y]),_:1}),e(i,{class:"mt0",items:p.props,descriptions:s.propsDescs,title:"Props"},null,8,["items","descriptions"]),e(i,{items:s.slots,title:"Slots"},null,8,["items"]),e(i,{items:p.events,title:"Events"},null,8,["items"])])}const E={},N={},P={},V={data:()=>({propsDescs:E,slots:N}),computed:{props(){return $.props},events(){return $.emits.reduce((s,n)=>(s[n]=P[n]||{})&&s,{})}}};var j=d(V,[["render",B]]);const A=a("w-date-picker");function C(s,n,m,u,f,p){const o=t("ui-component-title"),c=t("examples"),i=t("api");return l(),_("main",null,[e(o,{slug:"w-date-picker","in-progress":""},{default:r(()=>[A]),_:1}),e(c),e(i)])}const T={components:{Examples:w,Api:j}};var S=d(T,[["render",C]]);export{S as default};
