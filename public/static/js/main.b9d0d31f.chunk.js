(this.webpackJsonptakehome=this.webpackJsonptakehome||[]).push([[0],{150:function(t,e,a){"use strict";a.r(e);var n=a(4),r=a.n(n),c=a(39),i=a.n(c),o=(a(49),a(50),a(40)),s=a(41),l=a(44),u=a(43),d=a(42),h=a(13),f=a.n(h),b=a(0),j=function(t){Object(l.a)(a,t);var e=Object(u.a)(a);function a(t){var n;return Object(o.a)(this,a),(n=e.call(this,t)).transformData=function(){var t=n.state.tickerData;return{datasets:[{label:"Unadjusted Value",data:t.map((function(t){return{x:f()(t.date),y:t.nav}})),fill:!1,backgroundColor:"#0492C2",borderColor:"#3fe1ff"},{label:"Adjusted Value",data:t.map((function(t){return{x:f()(t.date),y:t.adjustedPrice}})),fill:!1,backgroundColor:"rgb(255, 99, 132)",borderColor:"rgba(255, 99, 132, 0.2)"}]}},n.fetchTickersByPage=function(t,e){fetch("/ticker/LALDX?startDate=2019-12-19&endDate=2021-01-31&page=".concat(e,"&size=50")).then((function(t){return t.json()})).then((function(e){e.tickers.forEach((function(e){return t.push(e)})),e.totalPages===e.currentPage?n.setState({tickerData:t}):n.fetchTickersByPage(t,e.currentPage+1)}))},n.state={tickerData:[]},n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.fetchTickersByPage([],0)}},{key:"render",value:function(){var t=this.props.tickerSymbol;return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("div",{className:"header",children:Object(b.jsx)("h1",{className:"title",children:"".concat(t," Price Chart")})}),Object(b.jsx)(d.Line,{data:this.transformData(),options:{scales:{yAxes:[{scaleLabel:{display:!0,labelString:"Price"}}],xAxes:[{scaleLabel:{display:!0,labelString:"Date"},type:"time",time:{format:"MM YYYY",unit:"month",displayFormats:{month:"MMM YYYY"}}}]}},width:800,height:400})]})}}]),a}(n.Component);var m=function(){return Object(b.jsx)("div",{className:"App",children:Object(b.jsx)(j,{tickerSymbol:"LALDX"})})},g=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,151)).then((function(e){var a=e.getCLS,n=e.getFID,r=e.getFCP,c=e.getLCP,i=e.getTTFB;a(t),n(t),r(t),c(t),i(t)}))};i.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(m,{})}),document.getElementById("root")),g()},49:function(t,e,a){},50:function(t,e,a){}},[[150,1,2]]]);
//# sourceMappingURL=main.b9d0d31f.chunk.js.map