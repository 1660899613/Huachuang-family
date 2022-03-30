import App from './App'
import Vue from 'vue'
Vue.config.productionTip = false
// import ApiUrl from '@/common/http/env.js'
import request from './utils/request.js'
Vue.prototype.$H = request;
// 挂载Vuex
import store from './store';  
Vue.prototype.$store = store;
Vue.prototype.$imgPath = store.state.imgUrl
// config配置文件
import config from './utils/config.js';  
Vue.prototype.$c = config;
// 公共方法
import fun from './utils/function.js';  
Vue.prototype.$f = fun;
//加密
import crypto from "crypto";
Vue.prototype.$crypto = crypto;

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// main.js
import uView from "uview-ui";
Vue.use(uView);
import { createSSRApp } from 'vue'

// 加密
// import w_md5 from "js_sdk/zww-md5/w_md5.js"
// Vue.prototype.$w_md5 = w_md5;
// import w_sha1 from "js_sdk/zww-md5/sha1.js"
// Vue.prototype.$w_sha1 = w_sha1;
import w_base from "js_sdk/zww-md5/base64.js"
Vue.prototype.$w_base = w_base;
// http接口API抽离，免于写url或者一些固定的参数
import httpApi from './utils/api.js'
Vue.use(httpApi, app)
// export function createApp() {
//   const app = createSSRApp(App)
//   return {
//     app
//   }
// }
