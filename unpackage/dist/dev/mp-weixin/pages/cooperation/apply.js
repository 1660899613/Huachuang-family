(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cooperation/apply"],{554:function(t,e,n){"use strict";(function(t){n(5);o(n(3));var e=o(n(555));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n(1)["createPage"])},555:function(t,e,n){"use strict";n.r(e);var o=n(556),i=n(558);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n(560);var s,r=n(11),c=Object(r["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],s);c.options.__file="pages/cooperation/apply.vue",e["default"]=c.exports},556:function(t,e,n){"use strict";n.r(e);var o=n(557);n.d(e,"render",(function(){return o["render"]})),n.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(e,"components",(function(){return o["components"]}))},557:function(t,e,n){"use strict";var o;n.r(e),n.d(e,"render",(function(){return i})),n.d(e,"staticRenderFns",(function(){return s})),n.d(e,"recyclableRender",(function(){return a})),n.d(e,"components",(function(){return o}));try{o={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,816))}}}catch(r){if(-1===r.message.indexOf("Cannot find module")||-1===r.message.indexOf(".vue"))throw r;console.error(r.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var t=this,e=t.$createElement;t._self._c},a=!1,s=[];i._withStripped=!0},558:function(t,e,n){"use strict";n.r(e);var o=n(559),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},559:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{tel:"",option:{},params:{realName:"",telephone:"",type:"",bankId:"",company:""},userInfo:{},fddInfo:{},orderInfo:{},customer_id:"",extensionIndex:{},BankInfo:""}},onLoad:function(t){this.option=t,console.log("optino:",this.option),this.params.type=this.option.type,this.pageInit()},onShow:function(){this.getUserInfo()},methods:{bangDingCard:function(){this.$f.jump("/pages/user/bank/bank")},getBankInfo:function(){var t=this;this.$u.api.getBankInfo({}).then((function(e){t.params.bankId=e.data.bankInfo.bankId,console.log(e.data.bankId,"银行卡")}))},getUserInfo:function(){var t=this;this.$u.api.getUserInfo({}).then((function(e){t.userInfo=e.data.userInfo,t.fddInfo=e.data.fddInfo,console.log(t.fddInfo,t.userInfo,"用户信息")}))},registerFdd:function(){var e=this,n=this;this.$u.api.signCode({open_id:this.userInfo.userPhone,account_type:this.$c.account_type}).then((function(o){var i={app_id:e.$c.app_id,timestamp:o.data.timestamp,v:e.$c.v,msg_digest:o.data.signCode,open_id:e.userInfo.userPhone,account_type:e.$c.account_type};t.request({url:n.$c.fddApiUrl+"account_register.api",header:{"content-type":"application/x-www-form-urlencoded;charset=UTF-8"},data:i,method:"POST",success:function(e){var o=e.data;console.log(o,"updata...."),n.customer_id=o.data,t.setStorageSync("customer_id",n.customer_id),n.getFddUrl()},fail:function(t){console.log(t)}})}))},pageInit:function(){var e="";e="1"==this.option.type?"个人合作申请":"企业推广",t.setNavigationBarTitle({title:e}),this.getExtensionIndex()},submitBuy:function(){var e=this;console.log("判断是否实名认证：",this.fddInfo.customerId),this.fddInfo.customerId?this.isRz((function(n){console.log("审核状态：",n.data.person.status),2!=n.data.person.status?wx.navigateToMiniProgram({appId:"wx855361a721050c6b",path:"pages/result-loading/result-loading?verifyUrl="+encodeURIComponent(e.fddInfo.url),envVersion:"release",success:function(e){console.log(e),t.request({url:"http://huachuang.yxy5g.com/home/fddNotify",header:{"content-type":"application/x-www-form-urlencoded;charset=UTF-8"},method:"POST",success:function(t){console.log(t,"回调信息")},fail:function(t){console.log(t)}})}}):e.upcontract()})):this.registerFdd()},upcontract:function(){var e=this,n=this,o=this.fddInfo.customerId,i=this.orderInfo.contractId,a=this.orderInfo.signTitle,s=this.orderInfo.contractUrl,r=this.orderInfo.userAgreementId;console.log(i,r,"合同id  交易号"),t.setStorageSync("userAgreementId",r),console.log(this.orderInfo,"this.orderInfo"),this.$u.api.signCode({contract_id:i}).then((function(c){var d={app_id:e.$c.app_id,timestamp:c.data.timestamp,v:e.$c.v,msg_digest:c.data.signCode,contract_id:i,doc_title:a,doc_url:s,doc_type:".pdf"};t.request({url:n.$c.fddApiUrl+"uploaddocs.api",header:{"content-type":"application/x-www-form-urlencoded;charset=UTF-8"},data:d,method:"POST",success:function(t){t.data;console.log(t,"合同上传...."),n.$f.jump("/pages1/web-view/web-view?contract_id="+i+"&customer_id="+o+"&doc_title="+a+"&doc_url="+s+"&transaction_id="+r+"&type="+n.params.type,3)},fail:function(t){console.log(t)}})}))},isRz:function(e){var n=this,o=this;this.$u.api.signCode({verified_serialno:this.fddInfo.transactionId}).then((function(i){var a={app_id:n.$c.app_id,timestamp:i.data.timestamp,v:n.$c.v,msg_digest:i.data.signCode,verified_serialno:n.fddInfo.transactionId};t.request({url:o.$c.fddApiUrl+"find_personCertInfo.api",header:{"content-type":"application/x-www-form-urlencoded;charset=UTF-8"},data:a,method:"POST",success:function(t){var n=t.data;console.log(t,"查询实名认证测试输出...."),e(n)},fail:function(t){console.log(t)}})}))},getExtensionIndex:function(){var e=this;this.$u.api.extensionIndex({}).then((function(n){200==n.code?(e.extensionIndex=n.data.extensionIndex,console.log("1111",e.extensionIndex)):t.showModal({title:"提示",content:n.message,success:function(t){}})}))},submit:function(){var e=this;if(1==this.params.type){if(""==this.params.realName)return void t.$u.toast("请输入您的姓名");if(!this.$f.isPhoneNum(this.params.telephone))return void t.$u.toast("请输入正确的电话号码");if(!this.$f.isNumber(this.params.bankId))return void t.$u.toast("请输入正确的银行卡号")}else{if(""==this.params.company)return void t.$u.toast("请输入您的企业名称");if(""==this.params.realName)return void t.$u.toast("请输入您的真实名称");if(!this.$f.isPhoneNum(this.params.telephone))return void t.$u.toast("请输入正确的电话号码")}if("-1"==this.extensionIndex.code){this.params.realName,this.params.telephone,this.params.type,1==this.params.type&&this.params.bankId,this.params.company;this.$u.api.cooperationApply(this.params).then((function(n){200==n.code?1==e.option.type?(e.orderInfo=n.data.info,e.submitBuy()):e.$f.jump("/pages/cooperation/withdrawal/succ?type="+e.option.type,3):t.showModal({title:"提示",content:n.message,success:function(t){}})}))}else"-2"==this.extensionIndex.code?this.$f.jump("/pages/cooperation/withdrawal/succ?type="+this.option.type,3):this.$f.jump("/pages/cooperation/index?type="+this.option.type)},fddSave:function(t,e,n,o){this.$u.api.fddSave({customerId:t,transactionId:e,url:n}).then((function(t){console.log(t,"data fddSave"),o()}))},getFddUrl:function(){var e=this,n=1,o=2,i="http://huachuang.yxy5g.com//home/fddNotify",a="pages/cooperation/apply?type="+this.option.type,s=1,r=1;console.log("第一次认证并保存认证链接");var c=this;this.$u.api.signCode({customer_id:this.customer_id,verified_way:n,page_modify:o,cert_flag:r,notify_url:i,is_mini_program:s,return_url:a}).then((function(d){var u={app_id:e.$c.app_id,timestamp:d.data.timestamp,v:e.$c.v,customer_id:e.customer_id,msg_digest:d.data.signCode,verified_way:n,page_modify:o,is_mini_program:s,cert_flag:r,notify_url:i,return_url:a};t.request({url:c.$c.fddApiUrl+"get_person_verify_url.api",header:{"content-type":"application/x-www-form-urlencoded;charset=UTF-8"},data:u,method:"POST",success:function(t){var e=t.data;console.log(e,"认证地址"),c.transactionNo=e.data.transactionNo;var n=c.$w_base.decode(e.data.url);c.fddSave(c.customer_id,e.data.transactionNo,n,(function(){c.$u.api.getUserInfo({}).then((function(t){var e=t.data.fddInfo;e.url&&wx.navigateToMiniProgram({appId:"wx855361a721050c6b",path:"pages/result-loading/result-loading?verifyUrl="+encodeURIComponent(e.url),envVersion:"release",success:function(t){console.log(t)}})}))}))},fail:function(t){console.log(t)}})}))}}};e.default=n}).call(this,n(1)["default"])},560:function(t,e,n){"use strict";n.r(e);var o=n(561),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},561:function(t,e,n){}},[[554,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cooperation/apply.js.map