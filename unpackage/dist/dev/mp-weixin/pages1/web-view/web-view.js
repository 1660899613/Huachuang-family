(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages1/web-view/web-view"],{656:function(t,n,e){"use strict";(function(t){e(5);i(e(3));var n=i(e(657));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e(1)["createPage"])},657:function(t,n,e){"use strict";e.r(n);var i=e(658),o=e(660);for(var r in o)"default"!==r&&function(t){e.d(n,t,(function(){return o[t]}))}(r);var c,a=e(11),s=Object(a["default"])(o["default"],i["render"],i["staticRenderFns"],!1,null,null,null,!1,i["components"],c);s.options.__file="pages1/web-view/web-view.vue",n["default"]=s.exports},658:function(t,n,e){"use strict";e.r(n);var i=e(659);e.d(n,"render",(function(){return i["render"]})),e.d(n,"staticRenderFns",(function(){return i["staticRenderFns"]})),e.d(n,"recyclableRender",(function(){return i["recyclableRender"]})),e.d(n,"components",(function(){return i["components"]}))},659:function(t,n,e){"use strict";var i;e.r(n),e.d(n,"render",(function(){return o})),e.d(n,"staticRenderFns",(function(){return c})),e.d(n,"recyclableRender",(function(){return r})),e.d(n,"components",(function(){return i}));var o=function(){var t=this,n=t.$createElement;t._self._c},r=!1,c=[];o._withStripped=!0},660:function(t,n,e){"use strict";e.r(n);var i=e(661),o=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);n["default"]=o.a},661:function(t,n,e){"use strict";(function(t){function e(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{srcurl:"",thisUrl:"",contract_id:"",doc_title:"",doc_url:"",transaction_id:"",type:""}},onLoad:function(t){t&&t.transaction_id&&(this.customer_id=t.customer_id,this.contract_id=t.contract_id,this.doc_title=t.doc_title,this.doc_url=t.doc_url,this.transaction_id=t.transaction_id,this.type=t.type,console.log("查看合同参数",t),this.contractQs())},onShow:function(){},methods:{contractQs:function(){var n=this;console.log("合同签署");var i=1,o="";o=1==this.type?"pages/cooperation/withdrawal/succ?type="+this.type:"pages/pay/payOrder?id="+this.transaction_id+"&otherId="+this.contract_id;var r=1,c=[{pagenum:3,x:250,y:240},{pagenum:3,x:540,y:760}];console.log(JSON.stringify(c));var a=this;this.$u.api.signCodeForSign({transaction_id:this.transaction_id,customer_id:this.customer_id}).then((function(s){e({app_id:n.$c.app_id,timestamp:s.data.timestamp,v:n.$c.v,msg_digest:s.data.signCode,open_environment:2,transaction_id:n.transaction_id,contract_id:n.contract_id,customer_id:n.customer_id,doc_title:encodeURIComponent(n.doc_title),return_url:""},"open_environment",i);var d=a.$c.fddApiUrl+"extsign.api?app_id="+n.$c.app_id+"&mobile_sign_type=2&writing_track=1&open_environment="+i+"&return_url="+o+"&timestamp="+s.data.timestamp+"&v="+n.$c.v+"&msg_digest="+s.data.signCode+"&transaction_id="+n.transaction_id+"&contract_id="+n.contract_id+"&customer_id="+n.customer_id+"&doc_title="+encodeURIComponent(n.doc_title)+"&position_type="+r+"&signature_positions="+encodeURIComponent(JSON.stringify(c));console.log(d,"路径"),n.srcurl=d,t.hideLoading()}))},getMessage:function(n){console.log(n),t.showModal({content:JSON.stringify(n.detail),showCancel:!1})}}};n.default=i}).call(this,e(1)["default"])}},[[656,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages1/web-view/web-view.js.map