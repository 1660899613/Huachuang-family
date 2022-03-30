<template>
	<view class="wrap" v-if="infor.courseName">
		<view class="ul">
			<view class="li flex-box">
				<view class="left">
					<u-image class="szIco"
					 radius="3"
					 :src="infor.courseImg"
					 :lazy-load="true" width="230rpx" height="150rpx"></u-image>
				</view>
				<view class="right box-1">
					<view class="title">{{infor.courseName}}</view>
					<view class="other flex-box">
						<view class="l-text box-1">
							<view class="">￥{{infor.courseMoney}}</view>
							<view class="desc">共{{infor.courseCount}}门课程</view>
						</view>
						<view class="r-text">
							<u-number-box :min="1" v-model="value" @change="valChange"></u-number-box>
						</view>
					</view>
				</view>
			</view>
			<view class="payMoney">应付：<text class="sty">￥{{infor.courseMoney*value}}</text></view>
		</view>
		<view class="footer" @click="submitBuy">去购买</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 1,
				id: null,
				infor: {},
				customer_id: '',
				infor:{},
				userInfo: {},
				fddInfo: {},
				orderInfo: {}
			};
		},
		onLoad(option) {
			this.id = option.id
			this.getDetails();
		},
		onShow(){
			this.getUserInfo()
		},
		methods:{
			getUserInfo(){
				uni.showLoading({
				    title: '加载中',
					mask:true
				});
				this.$u.api.getUserInfo({
					}).then(res=>{
					this.userInfo = res.data.userInfo
					this.fddInfo = res.data.fddInfo
					uni.hideLoading();
					console.log('this.fddInfo.url:', this.fddInfo.url);
				})
			},
			getDetails(){
				this.$u.api.getCourseInfo({
						id:this.id
					}).then(res=>{
					console.log(res,'data')
					this.infor = res.data.course
				})
			},
			valChange(e) {
				console.log('当前值为: ' + e.value)
			},

			//购买下单
			orderCreate(){
				uni.showLoading({
				    title: '加载中'
				});
				this.$u.api.orderCreate({
						courseId:this.id,
						count: this.value,
					}).then(res=>{
					this.orderInfo = res.data.orderId
					console.log(res,'data')
					this.upcontract()
				})
			},
			//注册法大大
			registerFdd(){
				let that = this;
				this.$u.api.signCode({
						open_id:this.userInfo.userPhone,
						account_type:this.$c.account_type
					}).then(res=>{
						let option = {
							app_id:this.$c.app_id,
							timestamp:res.data.timestamp,
							v:this.$c.v,
							msg_digest:res.data.signCode,
							open_id:this.userInfo.userPhone,
							account_type:this.$c.account_type
						}
					uni.request({
						url: that.$c.fddApiUrl+"account_register.api",
						header: {
							'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
						},
						data: option,
						method: 'POST',
						success: function(result){
							var res = result.data;
							console.log(res,'updata....')
							that.customer_id = res.data
							uni.setStorageSync('customer_id',that.customer_id)
							that.getFddUrl()
						},
						fail:function(err){
							console.log(err);
						}
					});

				})
			},
			//保存法大大注册 实名认证信息
			fddSave(customer_id,id,url,callback){
				this.$u.api.fddSave({
						customerId:customer_id,
						transactionId: id,
						url: url,
					}).then(res=>{
					console.log(res,'data fddSave')
						callback()
				})
			},
			getFddUrl(){
				//个人 实名认证
				let verified_way = 1;//实名认证套餐类型： 0：三要素标准方 案；1：三要素补充方 案；2：四要素标准方 案；3：四要素补充方 案；4：纯三要素方案； 5：纯四要素方案； 9：人脸识别方案
				let page_modify = 2; //是否允许用户修改界面 1 允许 2不允许
				let notify_url = 'http://huachuang.yxy5g.com//home/fddNotify';//回调地址
				let return_url = '';//认证结果返回地址
				let is_mini_program = 1;//是否小程序认证。默认为0 1代表小程序认证,0非小程序
				let cert_flag = 1;
				let that = this;
				this.$u.api.signCode({
						customer_id:this.customer_id,
						verified_way,
						page_modify,
						cert_flag,
						notify_url,
						is_mini_program,
						return_url
					}).then(res=>{
						let option = {
							app_id:this.$c.app_id,
							timestamp:res.data.timestamp,
							v:this.$c.v,
							customer_id:this.customer_id,
							msg_digest:res.data.signCode,
							verified_way,
							page_modify,
							is_mini_program,
							cert_flag,
							notify_url,
							return_url
						}
						uni.request({
							url:  that.$c.fddApiUrl+"get_person_verify_url.api",
							header: {
								'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
							},
							data: option,
							method: 'POST',
							success: function(result){
								var res = result.data;
								console.log('认证地址:', res)
								that.transactionNo = res.data.transactionNo
								let url = that.$w_base.decode(res.data.url)
								//交易信息保存
								// uni.setStorageSync("transactionNo",that.transactionNo)
								that.fddSave(that.customer_id,res.data.transactionNo,url,function(){
									that.$u.api.getUserInfo({
										}).then(res=>{
										let fddInfo = res.data.fddInfo;
										console.log('fddInfo:',fddInfo);
										if(fddInfo.url){
											wx.navigateToMiniProgram({
												appId:'wx855361a721050c6b',
												path: 'pages/result-loading/result-loading?verifyUrl=' + encodeURIComponent(fddInfo.url),
												envVersion: 'release',
												success(res) {
													console.log(res)

												// 打开成功
												}
											})
										}

									})
								})

							},
							fail:function(err){
								console.log(err);
							}
						});

				})

			},
			//查询个人实名认证信息
			isRz(callbanck){
				// let msg_digest = this.isRzSecre()
				let that = this;
				this.$u.api.signCode({
						verified_serialno:this.fddInfo.transactionId
					}).then(res=>{
						let option = {
							app_id:this.$c.app_id,
							timestamp:res.data.timestamp,
							v:this.$c.v,
							msg_digest:res.data.signCode,
							verified_serialno:this.fddInfo.transactionId
						}
					uni.request({
						url:  that.$c.fddApiUrl+"find_personCertInfo.api",
						header: {
							'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
						},
						data: option,
						method: 'POST',
						success: function(result){
							var res = result.data;
							console.log('查询实名认证测试输出:',result)
							//实名结果
							callbanck(res)
						},
						fail:function(err){
							console.log(err);
						}
					});

				})

			},
			//合同上传
			upcontract(){
				let that = this
				let customer_id = this.fddInfo.customerId //法大大账号
				let contract_id = this.orderInfo.contractId;//合同Id
				let doc_title = this.orderInfo.signTitle;
				let doc_url = this.orderInfo.contractUrl;
				let userAgreementId  = this.orderInfo.userAgreementId //交易号
				console.log(contract_id,userAgreementId,'合同id  交易号')
				uni.setStorageSync('userAgreementId',contract_id)
				console.log(this.orderInfo,'this.orderInfo')
				this.$u.api.signCode({
						contract_id: contract_id,//合同id
					}).then(res=>{
						// res.data.signCode
					let option = {
						app_id:this.$c.app_id,
						timestamp:res.data.timestamp,
						v:this.$c.v,
						msg_digest:res.data.signCode,
						contract_id: contract_id,
						doc_title: doc_title,
						doc_url: doc_url,
						doc_type: '.pdf'
					}
					uni.request({
						url: that.$c.fddApiUrl+"uploaddocs.api",
						header: {
							'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
						},
						data: option,
						method: 'POST',
						success: function(result){
							var res = result.data;
							console.log(result,'合同上传....')
							// that.$f.jump('/pages/pay/payOrder?id='+userAgreementId)
							// return false
							that.$f.jump('/pages1/web-view/web-view?contract_id='+contract_id+'&customer_id='+customer_id+'&doc_title='+doc_title+'&doc_url='+doc_url+'&transaction_id='+userAgreementId)
						},
						fail:function(err){
							console.log(err);
						}
					});
				})

			},
			//合同签署
			contractQs(){
				return false
				let customer_id = uni.getStorageSync('customer_id')
				let that = this;
				let code = "";
				　　for(let i=0;i<6;i++){
				　　　　let radom = Math.floor(Math.random()*10);
				　　　　code += radom;
				　　}
				let doc_title  = '股权代持协议及授权委托书';
				let position_type = 1;
				let signature_positions = [
					{
						'pagenum':3,
						'x':250,
						'y':240
					},
					{
						'pagenum':3,
						'x':540,
						'y':760
					}
				]
				this.$u.api.signCodeForSign({
						transaction_id: 9527123,
						customer_id:customer_id,
					}).then(res=>{
						// res.data.signCode
					console.log(res,'data 合同签署')
					let option = {
						app_id:this.app_id,
						timestamp:res.data.timestamp,
						v:this.v,
						msg_digest:res.data.signCode,
						open_environment:2,
						transaction_id: 9527123,
						contract_id: 1234,
						customer_id:customer_id,
						doc_title: encodeURIComponent(doc_title),
					}
					let url = 'http://test.api.fabigbig.com:8888/api/extsign.api'+'?app_id='+this.app_id+'&timestamp='+res.data.timestamp+'&v='+this.v+'&msg_digest='+res.data.signCode+'&transaction_id=9527123'+'&contract_id=1234'+'&customer_id='+customer_id+'&doc_title='+encodeURIComponent(doc_title)+'&position_type='+ position_type+'&signature_positions='+ encodeURIComponent(JSON.stringify(signature_positions));
					console.log(url,'路径')

					uni.request({
						url: "http://test.api.fabigbig.com:8888/api/extsign.api",
						header: {
							'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
						},
						data: option,
						method: 'POST',
						success: function(result){
							var res = result.data;
							console.log(result,'合同签署测试....')

						},
						fail:function(err){
							console.log(err);
						}
					});
				})
			},
			submitBuy(){
				let that = this
				//如果未注册
				console.log('判断是否实名认证：',this.fddInfo.customerId);
				if(!this.fddInfo.customerId){
					//去注册  走实名认证
					this.registerFdd()
				}else{
					this.isRz(function(res){
						//未审核 或者 审核未通过 重新认证 已注册    已通过为2
						console.log('审核通过情况：', res.data.person.status)
						if(res.data.person.status!=2){
							wx.navigateToMiniProgram({
								appId:'wx855361a721050c6b',
								path: 'pages/result-loading/result-loading?verifyUrl=' + encodeURIComponent(that.fddInfo.url),
								envVersion: 'release',
								success(res) {
									console.log(res)
									uni.request({
										url: "http://huachuang.yxy5g.com/home/fddNotify",
										header: {
											'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
										},
										method: 'POST',
										success: function(ress){
											console.log(ress,'回调信息')
										},
										fail:function(err){
											console.log(err);
										}
									});
								// 打开成功
								}
							})
						}else{
							//生成订单  去签署合同
							that.orderCreate()
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.wrap{
		.footer{
			position:fixed;
			bottom:20rpx;
			left:20rpx;
			width:710rpx;
			height:100rpx;
			line-height:100rpx;
			border-radius: 10rpx;
			text-align: center;
			color:#fff;
			background: linear-gradient(90deg, #1370F7 0%, #3484F8 100%);
		}
		.ul{
			color:#333333;
			.li{
				background-color: #fff;
				padding:20rpx;
				.left{
					width:230rpx;
					height:150rpx;
				}
				.right{
					margin-left:20rpx;
					.title{

					}
					.other{
						font-size:28rpx;
						margin-top:20rpx;
						.desc{
							font-size:24rpx;
							color:#999;
						}
					}
				}
			}
			.payMoney{
				background-color: #fff;
				text-align: right;
				padding:20rpx;
				.sty{
					font-size:34rpx;
					color:#FF4D4D;
				}
			}
		}
	}
</style>
