<template>
	<view class="wrap">
		<view class="ul">
			<view class="li">
				<view class="label">持卡人姓名</view>
				 <u--input
				    placeholder="请输入持卡人姓名"
				    border=""
				    v-model="model.realName"
				  
				  ></u--input>
			</view>
			<view class="li">
				<view class="label">身份证号码</view>
				 <u--input
				    placeholder="请输入身份证号码"
				    border=""
				    v-model="model.cardNo"
				    
				  ></u--input>
			</view>
			<view class="li">
				<view class="label">银行卡号</view>
				 <u--input
				    placeholder="请输入银行卡号"
				    border=""
				    v-model="model.bankNum"
				   
				  ></u--input>
			</view>
			<view class="li">
				<view class="label">银行预留手机号码</view>
				 <u--input
				    placeholder="请输入银行预留手机号码"
				    border=""
				    v-model="model.bankPhone"
				    
				  ></u--input>
			</view>
			<!-- <view class="li">
				<view class="label">验证码</view>
				<view class="flex-box">
					<u--input
					   placeholder="请输入验证码"
					   border=""
					   v-model="model.telCode"
						maxlength='6'
					 ></u--input>
								
					<view class="codeBtn" @tap="getCode">{{tips}}</view>
				</view>
				
			</view> -->
		</view>
		<u-code :seconds="seconds" @end="end" @start="start" maxlength='6' ref="uCode"
				@change="codeChange"></u-code>
		<view class="bdBank btn" @click="addBank">添加银行卡</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model:{
					bankName: '',
					bankNum: '',
					cardNo: '',
					realName: '',
					bankPhone:"",
					telCode: ''
				},
				tips: '',
				// refCode: null,
				seconds: 60,
			};
		},
		methods:{
			addBank(){
				const that =this
				if(!this.model.realName){
					this.$u.toast('请输入持卡人姓名')
					return false
				}
				if(!this.model.cardNo){
					this.$u.toast('请输入身份证号码')
					return false
				}
				if(!this.model.bankPhone){
					this.$u.toast('请输入银行卡号')
					return false
				}
				if(!this.model.bankPhone){
					this.$u.toast('请输入正确的手机号码')
					return false
				}
				// if(!this.model.telCode){
				// 	this.$u.toast('请输入验证码')
				// 	return false
				// }
				
				this.$u.api.bindBankInfo(this.model).then(res=>{
					console.log("添加银行卡",res)
					
					if(res.code==200){
						uni.showModal({
							title: '提示',
							content: res.message,
							success: function (res) {
								that.$f.jump('/pages/user/bank/bank')
							}
						});
						
					}else{
						uni.showModal({
							title: '提示',
							content: res.message,
							success: function (res) {
								
							}
						});

					}
				})
				
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				
				
				if(!this.model.bankPhone){
					this.$u.toast('请输入正确的手机号码')
					return false
				}
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					
					this.$u.api.getVerifiCode({user_phone:this.model.bankPhone}).then(res=>{
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					})
					
					
					
					// setTimeout(() => {
					// 	uni.hideLoading();
					// 	// 这里此提示会被this.start()方法中的提示覆盖
					// 	uni.$u.toast('验证码已发送');
					// 	// 通知验证码组件内部开始倒计时
					// 	this.$refs.uCode.start();
					// }, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				// uni.$u.toast('倒计时结束');
			},
			start() {
				// uni.$u.toast('倒计时开始');
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.wrap{
		.ul{
			.li{
				background-color: #fff;
				margin-bottom:20rpx;
				padding: 20rpx;
				.label{
					padding:20rpx 0;
				}
				.codeBtn{
					width: 200rpx;
					height: 60rpx;
					line-height: 60rpx;
					background: #1370F7;
					border-radius: 12rpx;
					text-align: center;
					color:#fff;
				}
			}
		}
	}
	.btn{
		width: 600rpx;
		height: 100rpx;
		line-height:100rpx;
		background: linear-gradient(90deg, #1370F7 0%, #3484F8 100%);
		border-radius: 12rpx;
		margin:20rpx auto;
		color:#fff;
		text-align: center;
		
	}
</style>
