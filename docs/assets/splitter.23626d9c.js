import{ak as S,o as x,g as P,ah as f,ag as _,a as r,w as p,e as d,b as u,h as g,r as c,_ as M}from"./index.e084873c.js";const b={name:"splitpanes",emits:["ready","resize","resized","pane-click","pane-maximize","pane-add","pane-remove","splitter-click"],props:{horizontal:{type:Boolean},pushOtherPanes:{type:Boolean,default:!0},dblClickSplitter:{type:Boolean,default:!0},rtl:{type:Boolean,default:!1},firstSplitter:{type:Boolean}},provide(){return{requestUpdate:this.requestUpdate,onPaneAdd:this.onPaneAdd,onPaneRemove:this.onPaneRemove,onPaneClick:this.onPaneClick}},data:()=>({container:null,ready:!1,panes:[],touch:{mouseDown:!1,dragging:!1,activeSplitter:null},splitterTaps:{splitter:null,timeoutId:null}}),computed:{panesCount(){return this.panes.length},indexedPanes(){return this.panes.reduce((e,t)=>(e[t.id]=t)&&e,{})}},methods:{updatePaneComponents(){this.panes.forEach(e=>{e.update&&e.update({[this.horizontal?"height":"width"]:`${this.indexedPanes[e.id].size}%`})})},bindEvents(){document.addEventListener("mousemove",this.onMouseMove,{passive:!1}),document.addEventListener("mouseup",this.onMouseUp),"ontouchstart"in window&&(document.addEventListener("touchmove",this.onMouseMove,{passive:!1}),document.addEventListener("touchend",this.onMouseUp))},unbindEvents(){document.removeEventListener("mousemove",this.onMouseMove,{passive:!1}),document.removeEventListener("mouseup",this.onMouseUp),"ontouchstart"in window&&(document.removeEventListener("touchmove",this.onMouseMove,{passive:!1}),document.removeEventListener("touchend",this.onMouseUp))},onMouseDown(e,t){this.bindEvents(),this.touch.mouseDown=!0,this.touch.activeSplitter=t},onMouseMove(e){this.touch.mouseDown&&(e.preventDefault(),this.touch.dragging=!0,this.calculatePanesSize(this.getCurrentMouseDrag(e)),this.$emit("resize",this.panes.map(t=>({min:t.min,max:t.max,size:t.size}))))},onMouseUp(){this.touch.dragging&&this.$emit("resized",this.panes.map(e=>({min:e.min,max:e.max,size:e.size}))),this.touch.mouseDown=!1,setTimeout(()=>{this.touch.dragging=!1,this.unbindEvents()},100)},onSplitterClick(e,t){"ontouchstart"in window&&(e.preventDefault(),this.dblClickSplitter&&(this.splitterTaps.splitter===t?(clearTimeout(this.splitterTaps.timeoutId),this.splitterTaps.timeoutId=null,this.onSplitterDblClick(e,t),this.splitterTaps.splitter=null):(this.splitterTaps.splitter=t,this.splitterTaps.timeoutId=setTimeout(()=>{this.splitterTaps.splitter=null},500)))),this.touch.dragging||this.$emit("splitter-click",this.panes[t])},onSplitterDblClick(e,t){let n=0;this.panes=this.panes.map((i,s)=>(i.size=s===t?i.max:i.min,s!==t&&(n+=i.min),i)),this.panes[t].size-=n,this.$emit("pane-maximize",this.panes[t]),this.$emit("resized",this.panes.map(i=>({min:i.min,max:i.max,size:i.size})))},onPaneClick(e,t){this.$emit("pane-click",this.indexedPanes[t])},getCurrentMouseDrag(e){const t=this.container.getBoundingClientRect(),{clientX:n,clientY:i}="ontouchstart"in window&&e.touches?e.touches[0]:e;return{x:n-t.left,y:i-t.top}},getCurrentDragPercentage(e){e=e[this.horizontal?"y":"x"];const t=this.container[this.horizontal?"clientHeight":"clientWidth"];return this.rtl&&!this.horizontal&&(e=t-e),e*100/t},calculatePanesSize(e){const t=this.touch.activeSplitter;let n={prevPanesSize:this.sumPrevPanesSize(t),nextPanesSize:this.sumNextPanesSize(t),prevReachedMinPanes:0,nextReachedMinPanes:0};const i=0+(this.pushOtherPanes?0:n.prevPanesSize),s=100-(this.pushOtherPanes?0:n.nextPanesSize),a=Math.max(Math.min(this.getCurrentDragPercentage(e),s),i);let o=[t,t+1],l=this.panes[o[0]]||null,h=this.panes[o[1]]||null;const m=l.max<100&&a>=l.max+n.prevPanesSize,z=h.max<100&&a<=100-(h.max+this.sumNextPanesSize(t+1));if(m||z){m?(l.size=l.max,h.size=Math.max(100-l.max-n.prevPanesSize-n.nextPanesSize,0)):(l.size=Math.max(100-h.max-n.prevPanesSize-this.sumNextPanesSize(t+1),0),h.size=h.max);return}if(this.pushOtherPanes){const v=this.doPushOtherPanes(n,a);if(!v)return;({sums:n,panesToResize:o}=v),l=this.panes[o[0]]||null,h=this.panes[o[1]]||null}l!==null&&(l.size=Math.min(Math.max(a-n.prevPanesSize-n.prevReachedMinPanes,l.min),l.max)),h!==null&&(h.size=Math.min(Math.max(100-a-n.nextPanesSize-n.nextReachedMinPanes,h.min),h.max))},doPushOtherPanes(e,t){const n=this.touch.activeSplitter,i=[n,n+1];return t<e.prevPanesSize+this.panes[i[0]].min&&(i[0]=this.findPrevExpandedPane(n).index,e.prevReachedMinPanes=0,i[0]<n&&this.panes.forEach((s,a)=>{a>i[0]&&a<=n&&(s.size=s.min,e.prevReachedMinPanes+=s.min)}),e.prevPanesSize=this.sumPrevPanesSize(i[0]),i[0]===void 0)?(e.prevReachedMinPanes=0,this.panes[0].size=this.panes[0].min,this.panes.forEach((s,a)=>{a>0&&a<=n&&(s.size=s.min,e.prevReachedMinPanes+=s.min)}),this.panes[i[1]].size=100-e.prevReachedMinPanes-this.panes[0].min-e.prevPanesSize-e.nextPanesSize,null):t>100-e.nextPanesSize-this.panes[i[1]].min&&(i[1]=this.findNextExpandedPane(n).index,e.nextReachedMinPanes=0,i[1]>n+1&&this.panes.forEach((s,a)=>{a>n&&a<i[1]&&(s.size=s.min,e.nextReachedMinPanes+=s.min)}),e.nextPanesSize=this.sumNextPanesSize(i[1]-1),i[1]===void 0)?(e.nextReachedMinPanes=0,this.panes[this.panesCount-1].size=this.panes[this.panesCount-1].min,this.panes.forEach((s,a)=>{a<this.panesCount-1&&a>=n+1&&(s.size=s.min,e.nextReachedMinPanes+=s.min)}),this.panes[i[0]].size=100-e.prevPanesSize-e.nextReachedMinPanes-this.panes[this.panesCount-1].min-e.nextPanesSize,null):{sums:e,panesToResize:i}},sumPrevPanesSize(e){return this.panes.reduce((t,n,i)=>t+(i<e?n.size:0),0)},sumNextPanesSize(e){return this.panes.reduce((t,n,i)=>t+(i>e+1?n.size:0),0)},findPrevExpandedPane(e){return[...this.panes].reverse().find(t=>t.index<e&&t.size>t.min)||{}},findNextExpandedPane(e){return this.panes.find(t=>t.index>e+1&&t.size>t.min)||{}},checkSplitpanesNodes(){Array.from(this.container.children).forEach(e=>{const t=e.classList.contains("splitpanes__pane"),n=e.classList.contains("splitpanes__splitter");!t&&!n&&(e.parentNode.removeChild(e),console.warn("Splitpanes: Only <pane> elements are allowed at the root of <splitpanes>. One of your DOM nodes was removed."))})},addSplitter(e,t,n=!1){const i=e-1,s=document.createElement("div");s.classList.add("splitpanes__splitter"),n||(s.onmousedown=a=>this.onMouseDown(a,i),typeof window<"u"&&"ontouchstart"in window&&(s.ontouchstart=a=>this.onMouseDown(a,i)),s.onclick=a=>this.onSplitterClick(a,i+1)),this.dblClickSplitter&&(s.ondblclick=a=>this.onSplitterDblClick(a,i+1)),t.parentNode.insertBefore(s,t)},removeSplitter(e){e.onmousedown=void 0,e.onclick=void 0,e.ondblclick=void 0,e.parentNode.removeChild(e)},redoSplitters(){const e=Array.from(this.container.children);e.forEach(n=>{n.className.includes("splitpanes__splitter")&&this.removeSplitter(n)});let t=0;e.forEach(n=>{n.className.includes("splitpanes__pane")&&(!t&&this.firstSplitter?this.addSplitter(t,n,!0):t&&this.addSplitter(t,n),t++)})},requestUpdate({target:e,...t}){const n=this.indexedPanes[e._.uid];Object.entries(t).forEach(([i,s])=>n[i]=s)},onPaneAdd(e){let t=-1;Array.from(e.$el.parentNode.children).some(s=>(s.className.includes("splitpanes__pane")&&t++,s===e.$el));const n=parseFloat(e.minSize),i=parseFloat(e.maxSize);this.panes.splice(t,0,{id:e._.uid,index:t,min:isNaN(n)?0:n,max:isNaN(i)?100:i,size:e.size===null?null:parseFloat(e.size),givenSize:e.size,update:e.update}),this.panes.forEach((s,a)=>s.index=a),this.ready&&this.$nextTick(()=>{this.redoSplitters(),this.resetPaneSizes({addedPane:this.panes[t]}),this.$emit("pane-add",{index:t,panes:this.panes.map(s=>({min:s.min,max:s.max,size:s.size}))})})},onPaneRemove(e){const t=this.panes.findIndex(i=>i.id===e._.uid),n=this.panes.splice(t,1)[0];this.panes.forEach((i,s)=>i.index=s),this.$nextTick(()=>{this.redoSplitters(),this.resetPaneSizes({removedPane:{...n,index:t}}),this.$emit("pane-remove",{removed:n,panes:this.panes.map(i=>({min:i.min,max:i.max,size:i.size}))})})},resetPaneSizes(e={}){!e.addedPane&&!e.removedPane?this.initialPanesSizing():this.panes.some(t=>t.givenSize!==null||t.min||t.max<100)?this.equalizeAfterAddOrRemove(e):this.equalize(),this.ready&&this.$emit("resized",this.panes.map(t=>({min:t.min,max:t.max,size:t.size})))},equalize(){const e=100/this.panesCount;let t=0;const n=[],i=[];this.panes.forEach(s=>{s.size=Math.max(Math.min(e,s.max),s.min),t-=s.size,s.size>=s.max&&n.push(s.id),s.size<=s.min&&i.push(s.id)}),t>.1&&this.readjustSizes(t,n,i)},initialPanesSizing(){let e=100;const t=[],n=[];let i=0;this.panes.forEach(a=>{e-=a.size,a.size!==null&&i++,a.size>=a.max&&t.push(a.id),a.size<=a.min&&n.push(a.id)});let s=100;e>.1&&(this.panes.forEach(a=>{a.size===null&&(a.size=Math.max(Math.min(e/(this.panesCount-i),a.max),a.min)),s-=a.size}),s>.1&&this.readjustSizes(e,t,n))},equalizeAfterAddOrRemove({addedPane:e,removedPane:t}={}){let n=100/this.panesCount,i=0;const s=[],a=[];e&&e.givenSize!==null&&(n=(100-e.givenSize)/(this.panesCount-1)),this.panes.forEach(o=>{i-=o.size,o.size>=o.max&&s.push(o.id),o.size<=o.min&&a.push(o.id)}),!(Math.abs(i)<.1)&&(this.panes.forEach(o=>{e&&e.givenSize!==null&&e.id===o.id||(o.size=Math.max(Math.min(n,o.max),o.min)),i-=o.size,o.size>=o.max&&s.push(o.id),o.size<=o.min&&a.push(o.id)}),i>.1&&this.readjustSizes(i,s,a))},readjustSizes(e,t,n){let i;e>0?i=e/(this.panesCount-t.length):i=e/(this.panesCount-n.length),this.panes.forEach((s,a)=>{if(e>0&&!t.includes(s.id)){const o=Math.max(Math.min(s.size+i,s.max),s.min),l=o-s.size;e-=l,s.size=o}else if(!n.includes(s.id)){const o=Math.max(Math.min(s.size+i,s.max),s.min),l=o-s.size;e-=l,s.size=o}s.update({[this.horizontal?"height":"width"]:`${this.indexedPanes[s.id].size}%`})}),Math.abs(e)>.1&&this.$nextTick(()=>{this.ready&&console.warn("Splitpanes: Could not resize panes correctly due to their constraints.")})}},watch:{panes:{deep:!0,immediate:!1,handler(){this.updatePaneComponents()}},horizontal(){this.updatePaneComponents()},firstSplitter(){this.redoSplitters()},dblClickSplitter(e){[...this.container.querySelectorAll(".splitpanes__splitter")].forEach((t,n)=>{t.ondblclick=e?i=>this.onSplitterDblClick(i,n):void 0})}},beforeUnmount(){this.ready=!1},mounted(){this.container=this.$refs.container,this.checkSplitpanesNodes(),this.redoSplitters(),this.resetPaneSizes(),this.$emit("ready"),this.ready=!0},render(){return S("div",{ref:"container",class:["splitpanes",`splitpanes--${this.horizontal?"horizontal":"vertical"}`,{"splitpanes--dragging":this.touch.dragging}]},this.$slots.default())}},w=(e,t)=>{const n=e.__vccOpts||e;for(const[i,s]of t)n[i]=s;return n},k={name:"pane",inject:["requestUpdate","onPaneAdd","onPaneRemove","onPaneClick"],props:{size:{type:[Number,String],default:null},minSize:{type:[Number,String],default:0},maxSize:{type:[Number,String],default:100}},data:()=>({style:{}}),mounted(){this.onPaneAdd(this)},beforeUnmount(){this.onPaneRemove(this)},methods:{update(e){this.style=e}},computed:{sizeNumber(){return this.size||this.size===0?parseFloat(this.size):null},minSizeNumber(){return parseFloat(this.minSize)},maxSizeNumber(){return parseFloat(this.maxSize)}},watch:{sizeNumber(e){this.requestUpdate({target:this,size:e})},minSizeNumber(e){this.requestUpdate({target:this,min:e})},maxSizeNumber(e){this.requestUpdate({target:this,max:e})}}};function y(e,t,n,i,s,a){return x(),P("div",{class:"splitpanes__pane",onClick:t[0]||(t[0]=o=>a.onPaneClick(o,e._.uid)),style:_(e.style)},[f(e.$slots,"default")],4)}const C=w(k,[["render",y]]);const E=d("p",null,[u("The work is already done in this library! Check out"),d("a",{class:"mx1",href:"https://antoniandre.github.io/splitpanes",target:"_blank"},"Splitpanes"),u("by the same awesome author! ;)")],-1),N={class:"w-flex align-center wrap mt8"},$=g('<a class="title2 my0 mr2" href="https://antoniandre.github.io/splitpanes" target="_blank">Splitpanes</a><a class="my2 mr1" href="https://www.npmjs.com/package/splitpanes" target="_blank"><img class="mb-1" src="https://img.shields.io/npm/dt/splitpanes.svg"></a><a class="my2" href="https://www.npmjs.com/package/splitpanes" target="_blank"><img class="mb-1" src="https://img.shields.io/npm/dw/splitpanes.svg"></a>',3),R=d("span",null,"1",-1),D=d("em",{class:"specs"},"I have a min width of 20%",-1),T=d("span",null,"2",-1),U=d("em",{class:"specs"},"I have a min height of 15%",-1),A=d("span",null,"3",-1),O=d("span",null,"4",-1),q=d("span",null,"5",-1);function L(e,t,n,i,s,a){const o=c("title-link"),l=c("w-icon"),h=c("ssh-pre"),m=c("pane"),z=c("splitpanes"),v=c("w-list");return x(),P("main",null,[r(o,{class:"mt4",h1:""},{default:p(()=>[u("Splitter")]),_:1}),E,d("div",N,[r(l,{class:"grey-light4 ml-2 mr2",xl:""},{default:p(()=>[u("mdi mdi-chevron-right")]),_:1}),$]),r(h,{class:"mt6",language:"shell",dark:e.$store.state.darkMode},{default:p(()=>[u("npm i splitpanes")]),_:1},8,["dark"]),r(z,{class:"default-theme mt8"},{default:p(()=>[r(m,{"min-size":"20"},{default:p(()=>[R,D]),_:1}),r(m,null,{default:p(()=>[r(z,{class:"default-theme",horizontal:""},{default:p(()=>[r(m,{"min-size":"15"},{default:p(()=>[T,U]),_:1}),r(m,null,{default:p(()=>[A]),_:1}),r(m,null,{default:p(()=>[O]),_:1})]),_:1})]),_:1}),r(m,null,{default:p(()=>[q]),_:1})]),_:1}),r(o,{h2:""},{default:p(()=>[u("Features")]),_:1}),r(v,{items:e.listItems,icon:"wi-check"},null,8,["items"])])}const B={components:{Splitpanes:b,Pane:C},data:()=>({listItems:[{label:"Light weight & no dependencies (only Vue JS)"},{label:"Define your panes, the splitters are added automatically"},{label:"Fully responsive"},{label:"Supports touch devices"},{label:"Supports nesting"},{label:"Push other panes or not"},{label:"Double click a splitter to maximize pane"},{label:"Programmatically set pane width or height"},{label:"Programmatically add and remove panes"},{label:"Supports v-if directive and v-router component"}]})},j=M(B,[["render",L]]);export{j as default};
