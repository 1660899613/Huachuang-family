(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["node-modules/uview-ui/components/u-text/u-text"],{1079:function(e,n,t){"use strict";t.r(n);var o=t(1080),i=t(1082);for(var u in i)"default"!==u&&function(e){t.d(n,e,(function(){return i[e]}))}(u);t(1085);var r,l=t(11),s=Object(l["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,"15831087",null,!1,o["components"],r);s.options.__file="node_modules/uview-ui/components/u-text/u-text.vue",n["default"]=s.exports},1080:function(e,n,t){"use strict";t.r(n);var o=t(1081);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},1081:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return i})),t.d(n,"staticRenderFns",(function(){return r})),t.d(n,"recyclableRender",(function(){return u})),t.d(n,"components",(function(){return o}));try{o={uIcon:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-icon/u-icon")]).then(t.bind(null,816))},uLink:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-link/u-link")]).then(t.bind(null,1087))}}}catch(l){if(-1===l.message.indexOf("Cannot find module")||-1===l.message.indexOf(".vue"))throw l;console.error(l.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var e=this,n=e.$createElement,t=(e._self._c,e.show&&"price"===e.mode?e.__get_style([e.valueStyle]):null),o=e.show&&e.prefixIcon?e.$u.addStyle(e.iconStyle):null,i=e.show&&"link"!==e.mode&&e.openType&&e.isMp?e.__get_style([e.valueStyle]):null,u=!e.show||"link"===e.mode||e.openType&&e.isMp?null:e.__get_style([e.valueStyle]),r=e.show&&e.suffixIcon?e.$u.addStyle(e.iconStyle):null;e.$mp.data=Object.assign({},{$root:{s0:t,g0:o,s1:i,s2:u,g1:r}})},u=!1,r=[];i._withStripped=!0},1082:function(e,n,t){"use strict";t.r(n);var o=t(1083),i=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=i.a},1083:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=l(t(1084)),i=l(t(741)),u=l(t(742)),r=l(t(1026));function l(e){return e&&e.__esModule?e:{default:e}}var s={name:"u--text",mixins:[e.$u.mpMixin,e.$u.mixin,o.default,i.default,u.default,r.default],computed:{valueStyle:function(){var n={textDecoration:this.decoration,fontWeight:this.bold?"bold":"normal",wordWrap:this.wordWrap,fontSize:e.$u.addUnit(this.size)};return!this.type&&(n.color=this.color),this.isNvue&&this.lines&&(n.lines=this.lines),this.lineHeight&&(n.lineHeight=e.$u.addUnit(this.lineHeight)),!this.isNvue&&this.block&&(n.display="block"),e.$u.deepMerge(n,e.$u.addStyle(this.customStyle))},isNvue:function(){var e=!1;return e},isMp:function(){var e=!1;return e=!0,e}},data:function(){return{}},methods:{clickHandler:function(){"phone"===this.mode&&e.$u.test.mobile(this.text)&&e.makePhoneCall({phoneNumber:this.text}),this.$emit("click")}}};n.default=s}).call(this,t(1)["default"])},1085:function(e,n,t){"use strict";t.r(n);var o=t(1086),i=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=i.a},1086:function(e,n,t){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/node-modules/uview-ui/components/u-text/u-text.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'node-modules/uview-ui/components/u-text/u-text-create-component',
    {
        'node-modules/uview-ui/components/u-text/u-text-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(1079))
        })
    },
    [['node-modules/uview-ui/components/u-text/u-text-create-component']]
]);