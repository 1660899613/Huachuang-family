(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{304:function(e,n,t){"use strict";(function(e){t(5);o(t(3));var n=o(t(305));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},305:function(e,n,t){"use strict";t.r(n);var o=t(306),r=t(308);for(var i in r)"default"!==i&&function(e){t.d(n,e,(function(){return r[e]}))}(i);t(310);var c,u=t(11),a=Object(u["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],c);a.options.__file="pages/login/login.vue",n["default"]=a.exports},306:function(e,n,t){"use strict";t.r(n);var o=t(307);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},307:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return r})),t.d(n,"staticRenderFns",(function(){return c})),t.d(n,"recyclableRender",(function(){return i})),t.d(n,"components",(function(){return o}));try{o={uImage:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-image/u-image")]).then(t.bind(null,684))},uButton:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-button/u-button")]).then(t.bind(null,736))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,n=e.$createElement;e._self._c},i=!1,c=[];r._withStripped=!0},308:function(e,n,t){"use strict";t.r(n);var o=t(309),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=r.a},309:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t(15);function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){c(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var u={data:function(){return{textInfo:"手机号码",cond:!0,domain:this.$H.domain,shareCover:this.$imgPath+"ico/logotx.png",btnStyle:{marginTop:"30rpx",color:"white",background:"#ccc"},userInfo:{},tel:"",isclick:!1,isLogin:!1}},onLoad:function(){},onShow:function(){},methods:i(i({},(0,o.mapMutations)(["login"])),{},{getSysInfo:function(){var e=this;this.$H.get("system/miniConfig").then((function(n){e.shareCover=n.result.intro}))},returnClick:function(){e.navigateBack()},onGetPhoneNumber:function(n){e.showLoading({title:"加载中"});var t=this;if(!t.isclick){if(t.isclick=!0,!n.target.iv)return e.showModal({content:"获取手机号失败！",showCancel:!1}),t.isclick=!1,void e.navigateBack();var o=n.target.code;o&&t.$u.api.wxGetPhone({code:o}).then((function(n){t.tel=n.data.phone.phoneNumber,console.log(n.data,"手机号码"),t.cond=!1,t.textInfo="获取你的公开信息（昵称、头像等）",t.isclick=!1,e.hideLoading()}))}},getUserInfo:function(){e.showLoading({title:"登录中"});var n=this;n.isLogin||(n.isLogin=!0,e.getUserProfile({desc:"用于完善用户资料",lang:"zh_CN",success:function(t){console.log(t.userInfo,"userInfo");var o=t.userInfo;o.tel=n.tel,e.login({success:function(t){n.isLogin=!1,console.log(t,"测试"),t.code&&n.$u.api.wxlogin({code:t.code,headImg:o.avatarUrl,nickname:o.nickName,telephone:n.tel,inviteCode:e.getStorageSync("inviteCode")?e.getStorageSync("inviteCode"):""}).then((function(t){e.hideLoading();var r=t.data;e.setStorageSync("hasLogin",!0),e.setStorageSync("token",r.userInfo.uToken),e.setStorageSync("userInfo",o),n.login(),e.navigateBack()}))}})},fail:function(t){console.log("wx.getUserProfile=>用户拒绝了授权"),console.log(t),n.isLogin=!1,e.hideLoading()}}))}})};n.default=u}).call(this,t(1)["default"])},310:function(e,n,t){"use strict";t.r(n);var o=t(311),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=r.a},311:function(e,n,t){}},[[304,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map