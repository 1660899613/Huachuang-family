<template>
	<view class="login">
		<!-- <image class="logo" :src="shareCover"></image> -->
		<view class="logo-1">
			<u-image src="@/static/ico/logo-1.png" :lazy-load="true" width="133rpx" height="133rpx"></u-image> 
		</view>
		<!-- <view class="logo-2">
			<u-image src="@/static/ico/logo-2.png" :lazy-load="true" width="332rpx" height="84rpx"></u-image> 
		</view> -->
		<text class="txt1">申请获取以下权限</text>
		<text class="txt2">{{textInfo}}</text>
		
		<u-button
		type="success"
		 v-if="cond" 
		 open-type="getPhoneNumber" 
		 lang="zh_CN" @getphonenumber="onGetPhoneNumber" shape="circle">获取手机号码</u-button>
		 <u-button type="success" shape="circle" v-if="!cond" @click="getUserInfo">授权登录</u-button>
		<u-button type="success" 
		v-if="!cond"
		shape="circle"
		:plain="true"
		:hairline="false"
		:customStyle="btnStyle"
		class="custom-style"
		 color="#eee"
		@click="returnClick">取消登录</u-button>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				textInfo:'手机号码',
				cond: true,
				domain: this.$H.domain,
				shareCover:this.$imgPath+"ico/logotx.png",
				btnStyle:{
					"marginTop": '30rpx', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					"color": 'white',
					"background": "#ccc"
				},
				userInfo: {},
				tel: '',
				isclick:false,
				isLogin:false
			};
		},
		onLoad() {
			// this.getSysInfo();
		},
		onShow() {
			
		},
		methods: {
			...mapMutations(['login']),
			getSysInfo() {
				this.$H.get("system/miniConfig").then(res => {
					this.shareCover = res.result.intro;
					
				})
			},
			returnClick(){
				uni.navigateBack();
			},
			onGetPhoneNumber(e){
				
				uni.showLoading({
				    title: '加载中'
				});
				var that = this; 
				if(that.isclick){
					return 
				}
				 
				that.isclick=true
				if (!e.target.iv) {
				    uni.showModal({
				      content: '获取手机号失败！',
				      showCancel: false
				    })
					that.isclick=false
					uni.navigateBack();
				    return;
			    }
				let code = e.target.code
				if(code){
					that.$u.api.wxGetPhone({
						"code": code,
					}).then(res=>{
						that.tel = res.data.phone.phoneNumber
						console.log(res.data,'手机号码')
						that.cond = false
						that.textInfo = '获取你的公开信息（昵称、头像等）'
						that.isclick=false
						uni.hideLoading();
					})
				}
				
			},
			getUserInfo() {
				uni.showLoading({
				    title: '登录中'
				});
				var that = this; 
				if(that.isLogin){
					return
				}
				that.isLogin=true
				uni.getUserProfile({
					desc : '用于完善用户资料',  
					lang : 'zh_CN',  
					success : function( res ){  
						console.log(res.userInfo,'userInfo'); 
						let userInfo = res.userInfo
						userInfo.tel = that.tel
						 uni.login({
						 	success: function(res) {
								that.isLogin=false
								console.log(res,'测试')
						 		if (res.code) {
									that.$u.api.wxlogin({
										"code": res.code,
										"headImg": userInfo.avatarUrl,
										"nickname": userInfo.nickName,
										"telephone":that.tel,
										"inviteCode":uni.getStorageSync("inviteCode")?uni.getStorageSync("inviteCode"):"",
									}).then(res2=>{
										uni.hideLoading();
										let data = res2.data
										uni.setStorageSync("hasLogin", true);
										uni.setStorageSync("token", data.userInfo.uToken);
										uni.setStorageSync("userInfo", userInfo);
										that.login()
										uni.navigateBack()
									})
						 			
						 		}
						 	}
						 });
					},
					fail : function( res ){  
						console.log('wx.getUserProfile=>用户拒绝了授权');  
						console.log( res ); 
						 that.isLogin=false
						uni.hideLoading();
					}, 
				}); 
			}
		}
	}
</script>

<style lang="scss">
	.custom-style {
			color: #ff0000;
			width: 400rpx;
		}
	.login{
		display: flex;
		flex-direction: column;
		padding: 100rpx;
	}
	.logo-1{
		padding-top:200rpx;
		width:133rpx;
		height:133rpx;
		margin: auto;
	}
	.logo-2{
		width:332rpx;
		height:84rpx;
		margin: auto;
	}
	.login .logo {
		width: 230rpx;
		height: 230rpx;
		margin: 50rpx auto;
	}
	
	.login .txt1{
		margin-bottom: 10rpx;
		margin-top:100rpx;
	}
	
	.login .txt2{
		color: #999;
		margin-bottom: 50rpx;
	}
</style>
