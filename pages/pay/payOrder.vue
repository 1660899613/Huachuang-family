<template>
	<view class="wrap" v-if="money != null">
		<view class="item1">
			<view class="time">
				<u-count-down
				       :time="120 * 1000"
				       format="DD:HH:mm:ss"
				       autoStart
				       millisecond
				       @change="onChange"
					   @finish="onfinish"
				   >
				       <view class="time">
				           <!-- <text class="time__item">{{ timeData.days }}&nbsp;天</text> -->
				           <text class="time__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}&nbsp;:</text>
				           <text class="time__item">{{ '0'+timeData.minutes }}&nbsp;:</text>
				           <text class="time__item">{{ timeData.seconds }}&nbsp;</text>
				       </view>
				   </u-count-down>
			</view>
			<view class="title">￥{{money}}</view>
		</view>
		<view class="item2">
			<view class="pay-list">
				<view class="row" @tap="paytype='wxpay'">
						<view class="left">
							<u-image src="/static/ico/wx-ico-1.png"  width="48rpx" height="48rpx"></u-image>
						</view>
						<view class="center">
							微信支付
						</view>
						<view class="right">
							<radio :checked="paytype=='wxpay'" color="#106DF7" />
						</view>
				</view>
				<view class="row" @tap="paytype='dfpay'">
						<view class="left">
							<u-image src="/static/ico/wx-ico-2.png"  width="48rpx" height="48rpx"></u-image>
						</view>
						<view class="center">
							微信代付
						</view>
						<view class="right">
							<radio :checked="paytype=='dfpay'" color="#106DF7" />
						</view>
				</view>
			</view>
		</view>
		<view class="footer" @click="payOrder">确认支付</view>
		<u-modal
			title="是否分享给好友代付"
			:show="show"
			closeOnClickOverly
			showCancelButton
		>
			<u-button
				slot="confirmButton"
				text="确定"
				type="primary"
				open-type="share"  v-bind:data-student="userInfo"
				@click="show = false"
			></u-button>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				timeData: {},
				paytype:'wxpay',//支付类型
				transactionId: '',
				contract_id: '',
				userInfo: {},
				fddInfo:{},
				orderInfo: {},
				money: null,
				wechatInfo:{},
				shareInfor:{}
			};
		},
		onLoad(option) {
			console.log(option,'option')
			this.transactionId = option.id
			this.contract_id = option.contract_id
			this.orderId = option.orderId
			this.orderStatus = option.orderStatus
			this.getUserInfo()
			this.shareInfor = {
				userInfo:this.userInfo,
				fddInfo:this.fddInfo,
				orderId:this.orderId,	
				contract_id:this.contract_id
			}
			console.log(this.transactionId,'this.transactionId')
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 分享按钮
				console.log(res)
			}
			return {
				title: this.$c.miniappName,
				path: 'pages/pay/payOrder?id='+this.transactionId+'&orderId='+this.orderId,
				imageUrl: this.shareCover
			}
		},
		methods:{
			getUserInfo(){
				uni.showLoading({
				    title: '加载中'
				});
				this.$u.api.getUserInfo({
					}).then(res=>{
					this.userInfo = res.data.userInfo
					this.fddInfo = res.data.fddInfo
					if(this.transactionId){
						//订单支付 ycy = 1: ,
						this.onlinepayment()
						return false
					}else{
						if(this.orderId){
							if(this.orderStatus==0){
								//订单支付 ycy = 2: ,
								this.$u.api.onlinepayment({
										ycy: 2,
										orderId: this.orderId,
									}).then(res=>{
									console.log(res,'支付信息')
									this.wechatInfo = res.data.wechatInfo
									this.money = res.data.money
									uni.hideLoading();
								})
							}else{
								//订单支付 ycy = 3: ,复训支付
								this.$u.api.onlinepayment({
										ycy: 3,
										orderId: this.orderId,
									}).then(res=>{
									console.log(res,'支付信息')
									this.wechatInfo = res.data.wechatInfo
									this.money = res.data.money
									uni.hideLoading();
								})
							}
							
						}
					}
					
				
					console.log(this.fddInfo,this.userInfo,'用户信息')
				})
			},
			//合同签署查询
			querySignResult(){
				let that = this;
				let customer_id = this.fddInfo.customerId
				let userAgreementId = uni.getStorageSync('userAgreementId')
				this.$u.api.signCode({
						transaction_id: this.transactionId,//合同交易号
						customer_id:customer_id, //客户编号
						contract_id: userAgreementId,//合同编号
					}).then(res=>{
						// res.data.signCode
					console.log(res,'data 合同签署')
					let option = {
						app_id:this.$c.app_id,
						timestamp:res.data.timestamp,
						v:this.$c.v,
						msg_digest:res.data.signCode,
						transaction_id: this.transactionId,
						contract_id: userAgreementId,
						customer_id:customer_id,
					}
					uni.request({
						url: that.$c.fddApiUrl+"api/query_sign_result.api",
						header: { 
							'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
						},
						data: option, 
						method: 'POST',
						success: function(result){
							var res = result.data;
							console.log(result,'合同结果查询....')
							//签章成功
							if(result.data.data.result==3000){
								that.onlinepayment()
							}else{
								//
								uni.navigateBack({
									delta: 2
								});
							}
						},
						fail:function(err){
							console.log(err);
						}
					});
				})
			},
			//查询订单信息
			orderSelect(){
				this.$u.api.orderSelect({
						ycy: 2,
						orderId: this.orderId,
					}).then(res=>{
					console.log(res,'1111')
					
				})
			},
			onlinepayment(){
				this.$u.api.onlinepayment({
						ycy: 1,
						transactionId: this.transactionId,
					}).then(res=>{
					console.log(res,'支付信息')
					this.wechatInfo = res.data.wechatInfo
					this.money = res.data.money
					uni.hideLoading();
				})
			},
			onChange(e) {
				//倒计时
				this.timeData = e
				// console.log(this.timeData)
			},
			onfinish(){
				let that = this
				uni.showToast({
					title: '订单失效',
					icon: 'success',
					duration: 2000,
					success: function(){
						that.$f.jump('/pages/index/index')
					}
				});
			},
			// 支付
			payOrder () {
				let that = this;
				if(this.paytype == 'wxpay'){
					console.log(that.wechatInfo)
					if(this.money == 0){
						uni.showToast({
							title: '免费课程，无需支付。',
							icon: 'success',
							duration: 1500,
							success: function(){
								that.$f.jump('/pages/pay/succ')
							}
						});
						return;
					}
					// return false
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: that.orderInfo, // 订单数据
						timeStamp: that.wechatInfo.timestamp, // 时间戳从1970年1月1日至今的秒数，即当前的时间
						nonceStr: that.wechatInfo.noncestr, // 随机字符串，长度为32个字符以下
						package: that.wechatInfo.package, // 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx
						signType:'MD5', //签名算法，暂支持 MD5
						paySign:  that.wechatInfo.sign, // 签名
						success: function (res) {
							// 支付成功的回调中 创建绘本馆成功
							uni.showToast({
								title: '微信支付成功',
								icon: 'success',
								duration: 1500,
								success: function(){
									that.$f.jump('/pages/pay/succ')
								}
							});
							
							
						},
						fail: function (err) {
							// 支付失败的回调中 用户未付款
							uni.showToast({
								title: '支付取消',
								duration: 1500,
								image: '/static/png/error_icon.png'
							});
						}
					});
				}else{
					//代付
					that.show = true
				}
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
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
		.pay-list{
			width: 100%;
			// border-bottom: solid 1upx #eee;
			.row{
				width: 100%;
				height: 100upx;
				display: flex;
				align-items: center;
				.left{
					width: 65rpx;
					flex-shrink: 0;
					display: flex;
					align-items: center;
					image{
						width: 80upx;
						height: 80upx;
					}
				}
				.center{
					width: 100%;
					font-size: 30upx;
					text-align: left;
					color:#aaa;
				}
				.right{
					width: 80upx;
					flex-shrink: 0;
					display: flex;
					justify-content: flex-end;
				}
			}
		}
	}
	.wrap{
		padding-bottom:120rpx;
		.item2{
			padding:0 20rpx;
			background-color: #fff;
		}
		.item1{
			text-align: center;
			background-color: #fff;
			color:#CBA668;
			padding:100rpx 0;
			margin-bottom:20rpx;
			.time{
				
				font-size:28rpx;
			}
			.title{
				font-size:50rpx;
				color:#333333;
				margin-top:20rpx;
			}
		}
	}
</style>
