"use strict";(self.webpackChunkshop=self.webpackChunkshop||[]).push([[545],{4545:function(e,s,n){n.r(s);var i=n(9439),a=n(8381),t=n(4288),c=(n(29),n(8389),n(4652),n(6261)),l=n(7174),o=n(9343);s.default=function(e){var s=e.t,n=e.data,d=e.userOrder,r=e.setTotal,m=e.total,x=e.setUrl;(0,a.useEffect)((function(){window.scrollTo(0,0),x("construction")}),[]);var h=(0,a.useState)(0),p=(0,i.Z)(h,2),u=p[0],j=p[1],Z=(0,a.useState)(0),N=(0,i.Z)(Z,2),v=N[0],f=N[1],O=(0,a.useState)(!1),b=(0,i.Z)(O,2),y=b[0],L=b[1],z=window.screen.availWidth>900,g=function(e){n.forEach((function(s){s.nameOfGoods===e.target.title&&(d.forEach((function(e,n){s===e&&d.splice(n,1)})),s.size=s.size+1,s.total=s.size*s.prise,r((function(e){return e+s.prise})),d.push(s))}))},T=function(e){n.forEach((function(s){s.nameOfGoods===e.target.title&&(0===s.size?s.size=0:(s.size=s.size-1,0===s.size&&(s.checked=!1,d.forEach((function(e,n){s===e&&d.splice(n,1)}))),s.total=s.total-s.prise,0===s.total&&(s.total=s.prise),r(m-s.prise)))}))},C=function(e){return(0,o.jsxs)("div",{className:t.Z.divBut,children:[(0,o.jsxs)("div",{style:{padding:"10px",margin:"20px 15px"},children:[(0,o.jsx)("button",{className:t.Z.butMin,children:(0,o.jsx)("span",{onClick:T,title:n[e].nameOfGoods,className:t.Z.spanMin,children:"-"})}),(0,o.jsx)("span",{className:t.Z.itemTotalSize,id:"lightblue",children:n[e].size}),(0,o.jsx)("button",{className:t.Z.butPlas,style:{backgroundColor:"#DF4242",border:"none"},children:(0,o.jsx)("span",{onClick:g,title:n[e].nameOfGoods,className:t.Z.spanAdd,children:"+"})})]}),(0,o.jsxs)("span",{className:t.Z.itemTotal,children:[n[e].total," \u0433\u0440\u043d"]})]})},G={backgroundColor:"#DF4242",color:"#FFFFFF",border:"none"};return window.addEventListener("scroll",(function(){z&&(window.scrollY>=500?L("comp"):L(!1)),z||(window.scrollY>=260?L("mob"):L(!1))})),(0,o.jsxs)("main",{children:[(0,o.jsxs)("div",{className:"".concat(t.Z.divTitle," ").concat("mob"===y?t.Z.styleUpManu:"comp"===y?t.Z.styleUpManu2:t.Z.startPosition),children:[(0,o.jsx)("div",{children:(0,o.jsx)(l.OL,{style:function(e){return e.isActive?G:void 0},className:t.Z.spanTitle,to:"/obladnannya",children:s("equipment")})}),(0,o.jsxs)("div",{children:[" ",(0,o.jsx)(l.OL,{style:function(e){return e.isActive?G:void 0},className:t.Z.spanTitle,to:"/nakritya",children:s("cover")})]}),(0,o.jsx)("div",{children:(0,o.jsx)(l.OL,{style:function(e){return e.isActive?G:void 0},className:t.Z.spanTitle+" "+t.Z.spanTit2,to:"/vidkriti-box",children:s("openBox")})}),(0,o.jsx)("div",{children:(0,o.jsx)(l.OL,{style:function(e){return e.isActive?G:void 0},className:t.Z.spanTitle,to:"/aksesyari",children:s("accessories")})}),(0,o.jsx)("div",{children:(0,o.jsx)(l.OL,{style:function(e){return e.isActive?G:void 0},className:t.Z.spanTitle,to:"/budivnitstvo",children:s("construction")})}),(0,o.jsx)("div",{children:(0,o.jsx)(l.OL,{style:function(e){return e.isActive?G:void 0},className:t.Z.spanTitle,to:"/documentacia",children:s("documentation")})})]}),(0,o.jsxs)("div",{className:t.Z.divBox,children:[(0,o.jsx)(c.LazyLoadComponent,{children:(0,o.jsx)("div",{className:t.Z.container,children:(0,o.jsxs)("div",{className:t.Z.boxOne+" "+t.Z.boxOne2,children:[(0,o.jsx)("p",{className:t.Z.itemName,children:n[62].nameOfGoods}),(0,o.jsx)("p",{className:t.Z.itemName,style:{marginTop:"0"},children:"\u0433\u0440\u0430\u0432\u0456\u0439, \u043f\u0456\u0441\u043e\u043a, \u0446\u0435\u043c\u0435\u043d\u0442"}),(0,o.jsx)("p",{className:t.Z.itemDesc}),(0,o.jsxs)("div",{className:t.Z.divBut,children:[(0,o.jsx)("div",{style:{padding:"10px",margin:"20px 15px"},children:(0,o.jsx)("span",{className:t.Z.itemTotalSize,id:"lightblue",children:n[62].total})}),(0,o.jsx)("input",{className:t.Z.itemTotal+" "+t.Z.inputResh,type:"text",value:u,onChange:function(e){e.target.value.length<6&&(j(e.target.value),n[62].size=e.target.value,n[62].total=90*n[62].size)},title:n[62].nameOfGoods,onBlur:function(e){r((function(e){return e+n[62].total})),d.forEach((function(e,s){n[62]===e&&(r((function(e){return e-v})),d.splice(s,1))})),""!==n[62].size&&d.push(n[62]),f(n[62].total)}}),(0,o.jsx)("span",{className:t.Z.itemTotal,style:{marginLeft:"-40px"},children:"\u043c\xb2"})]})]})})}),(0,o.jsx)(c.LazyLoadComponent,{children:(0,o.jsx)("div",{className:t.Z.container,children:(0,o.jsxs)("div",{className:t.Z.boxOne+" "+t.Z.boxOne2,children:[(0,o.jsx)("p",{className:t.Z.itemName,children:n[21].nameOfGoods}),(0,o.jsx)("p",{className:t.Z.itemDesc}),C(21)]})})}),(0,o.jsx)(c.LazyLoadComponent,{children:(0,o.jsx)("div",{className:t.Z.container,children:(0,o.jsxs)("div",{className:t.Z.boxOne+" "+t.Z.boxOne2,children:[(0,o.jsx)("p",{className:t.Z.itemName,children:n[50].nameOfGoods}),(0,o.jsx)("p",{className:t.Z.itemDesc}),C(50)]})})}),(0,o.jsx)(c.LazyLoadComponent,{children:(0,o.jsx)("div",{className:t.Z.container,children:(0,o.jsxs)("div",{className:t.Z.boxOne+" "+t.Z.boxOne2,children:[(0,o.jsx)("p",{className:t.Z.itemName,children:n[51].nameOfGoods}),(0,o.jsx)("p",{className:t.Z.itemDesc}),C(51)]})})}),(0,o.jsx)(c.LazyLoadComponent,{children:(0,o.jsx)("div",{className:t.Z.container,children:(0,o.jsxs)("div",{className:t.Z.boxOne+" "+t.Z.boxOne2,children:[(0,o.jsx)("p",{className:t.Z.itemName,children:n[52].nameOfGoods}),(0,o.jsx)("p",{className:t.Z.itemDesc}),C(52)]})})}),(0,o.jsx)(c.LazyLoadComponent,{children:(0,o.jsx)("div",{className:t.Z.container,children:(0,o.jsxs)("div",{className:t.Z.boxOne+" "+t.Z.boxOne2,children:[(0,o.jsx)("p",{className:t.Z.itemName,children:n[53].nameOfGoods}),(0,o.jsx)("p",{className:t.Z.itemDesc}),C(53)]})})}),(0,o.jsx)(c.LazyLoadComponent,{children:(0,o.jsx)("div",{className:t.Z.container,children:(0,o.jsxs)("div",{className:t.Z.boxOne+" "+t.Z.boxOne2,children:[(0,o.jsx)("p",{className:t.Z.itemName,children:n[60].nameOfGoods}),(0,o.jsx)("p",{className:t.Z.itemDesc}),C(60)]})})}),(0,o.jsx)(c.LazyLoadComponent,{children:(0,o.jsx)("div",{className:t.Z.container,children:(0,o.jsxs)("div",{className:t.Z.boxOne+" "+t.Z.boxOne2,children:[(0,o.jsx)("p",{className:t.Z.itemName,children:n[61].nameOfGoods}),(0,o.jsx)("p",{className:t.Z.itemDesc}),C(61)]})})})]})]})}}}]);
//# sourceMappingURL=545.bf23bfe6.chunk.js.map