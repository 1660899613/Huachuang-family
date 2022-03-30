<template>
	<view class="userContent">
		<view class="header">
			<!-- 顶部自定义导航 -->
			
			<u-sticky offset-top="0" :bgColor="bgColor">
				 <u-navbar
					:bgColor="bgColor">
					<view class="u-nav-slot"slot="left"></view>
					<view class="u-nav-slot"slot="center">我的</view>
				</u-navbar>
			</u-sticky>
			<!-- 1 -->
			<view class="headContent">
				<!-- <button class="btn" type="primary">授权</button> -->
				<view v-if="!hasLogin" class=""  @click="$f.jump('/pages/login/login')">
					<!-- 未登录 -->
					<view class="top-tx">
						<u-avatar :src="'https://cdn.uviewui.com/uview/album/noExist.jpg'" 
						 size="120rpx" shape="circle"></u-avatar>
					</view>
					<view class="hd">
						<view class="title media_title" >点击登录账户</view>
						<!-- <view class="media_desc desc">15506987890</view> -->
					</view>
				</view>
				<view v-else>
					<!-- 已登录 -->
					<view class="top-tx">
						<u-avatar :src="userInfo.headPortrait" 
						 size="120rpx" :default-url="userInfo.headPortrait" shape="circle"></u-avatar>
					</view>
					<view class="hd">
						<view class="title media_title">{{userInfo.userName}}</view>
						<view class="media_desc desc">{{userInfo.userPhone}}</view>
					</view>
				</view>
				
			
				<view class="ul flex-box">
					<view class="li box-1" @click="$f.jump('/pages/user/scheme/scheme')">
						<view class="img-box">
							<u-image class="szIco"
							 src="@/static/ico/user-ico-a-1.png" 
							 :lazy-load="true" width="55rpx" height="56rpx"></u-image>
						</view>
						<view class="text">专享方案</view>
					</view>
					<view class="li box-1"  @click="$f.jump('/pages/user/collect/collect')">
						<view class="img-box">
							<u-image class="szIco"
							 src="@/static/ico/user-ico-a-2.png" 
							 :lazy-load="true" width="55rpx" height="56rpx"></u-image>
						</view>
						<view class="text">我的收藏</view>
					</view>
					<view class="li box-1">
						<button class="text" open-type="contact" hover-class='none' >
						<view class="img-box">
							<u-image class="szIco"
							 src="@/static/ico/user-ico-a-3.png" 
							 :lazy-load="true" width="55rpx" height="56rpx"></u-image>
						</view>
						<text>专属客服</text>
						</button>
						<!-- <view class="text" open-type="contact">专属客服</view> -->
						<!-- <button class="text redbor" open-type="contact" hover-class='none' >专属客服</button> -->
					</view>
					<view class="li box-1" @click="$f.jump('/pages/news/news')">
						<view class="img-box">
							<u-image class="szIco"
							 src="@/static/ico/user-ico-a-4.png" 
							 :lazy-load="true" width="55rpx" height="56rpx"></u-image>
						</view>
						<view class="text">消息提醒</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 2 -->
		<view class="ad-banner" @click="goToApply">
			<u-image class="szIco"
			 src="@/static/img/u-banner.png" 
			 :lazy-load="true" width="700rpx" height="142rpx"></u-image>
		</view>
		<!-- 3 -->
		<view class="listSet">
			<view class="title">更多设置</view>
			<view class="ul flex-box">
				<view class="li" @click="$f.jump('/pages/user/setting/setting')">
					<view class="img-box">
						<u-image class="szIco"
						 src="@/static/ico/user-g-1.png" 
						 :lazy-load="true" width="55rpx" height="56rpx"></u-image>
					</view>
					<view class="text">个人资料</view>
				</view>
				<view class="li" @click="$f.jump('/pages/user/about/about')">
					<view class="img-box">
						<u-image class="szIco"
						 src="@/static/ico/user-g-2.png" 
						 :lazy-load="true" width="55rpx" height="56rpx"></u-image>
					</view>
					<view class="text">关于我们</view>
				</view>
				<view class="li" @click="$f.jump('/pages/user/bank/bank')">
					<view class="img-box">
						<u-image class="szIco"
						 src="@/static/ico/user-g-3.png" 
						 :lazy-load="true" width="55rpx" height="56rpx"></u-image>
					</view>
					<view class="text">绑定银行卡</view>
				</view>
				<view class="li" @click="$f.jump('/pages/user/contract/contract')">
					<view class="img-box">
						<u-image class="szIco"
						 src="@/static/ico/user-g-4.png" 
						 :lazy-load="true" width="55rpx" height="56rpx"></u-image>
					</view>
					<view class="text">我的合同</view>
				</view>
				<view class="li" @click="scanCode" v-if="userInfo.ycy==2">
					<view class="img-box">
						<u-image class="szIco"
						 src="@/static/ico/user-g-4.png" 
						 :lazy-load="true" width="55rpx" height="56rpx"></u-image>
					</view>
					<view class="text">扫一扫</view>
				</view>
				<view class="li" @click="outClick">
					<view class="img-box">
						<u-image class="szIco"
						 src="@/static/ico/user-g-5.png" 
						 :lazy-load="true" width="55rpx" height="56rpx"></u-image>
					</view>
					<view class="text">安全退出</view>
				</view>
				<view class="li" @click="phoneCall">
					<view class="img-box">
						<u-image class="szIco"
						 src="@/static/ico/user-g-2.png" 
						 :lazy-load="true" width="55rpx" height="56rpx"></u-image>
					</view>
					<view class="text">电话咨询</view>
				</view>
			</view>
		</view>
		<!-- <author @login="login" :show="show"></author> -->
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		components:{
			
		},
		data() {
			return {
				userInfo: {},
				show: true,
				bgColor: 'rgba(0,0,0,0)',
				url:"https://huachuang.yxy5g.com?userHash=3BC2E5A865F4F277AA7F55C5477900E4&classId=5"
			}
		},
		onShow(){
			this.getUserInfo()
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			...mapMutations(['logout']),
			
			phoneCall(){
				this.$H.post("/user/getServerPhone ").then(res => {
					uni.makePhoneCall({
					    phoneNumber: res.data.phone.toString()//仅为示例
					});
				}).catch(err=>{
					console.log(err);
					this.$u.toast('客服电话获取失败，请稍后再试')
				})
				
			},
			//取申请
			goToApply(){
				
				this.$u.api.extensionIndex({}).then(res=>{
					console.log(res.data.extensionIndex.code)
					if(res.code==200){
						if(res.data.extensionIndex.code=='-1'){
							this.$f.jump('/pages/cooperation/cooperation')
						}else if(res.data.extensionIndex.code=='1'){
							this.$f.jump('/pages/cooperation/index?type='+res.data.extensionIndex.type)
						}else{
							this.$f.jump('/pages/cooperation/withdrawal/succ?type='+res.data.extensionIndex.type)
							// uni.$u.toast(res.message);
							
						}
					}else{
						uni.$u.toast(res.message);
					}
					
				})
				
				
			},
			//扫一扫
			
			scanCode(){
				let that = this;
				uni.scanCode({
				    success: function (res) {
						let option = JSON.parse(res.result);
						console.log(res,option,'二维码信息')
						that.$f.jump('/pages/user/siginCode/offCode?classId='+option.classId+'&userHash='+option.userHash)
					
					
				    }
				});
			},
			getUrlQuery (variable,url) {
				 var query = url;
				       var vars = query.split("&");
				       for (var i=0;i<vars.length;i++) {
				               var pair = vars[i].split("=");
				               if(pair[0] == variable){return pair[1];}
				       }
			   return(false);
			},
			outClick(){
				this.logout()
				// this.$u.api.logout({
				// 	}).then(res=>{
				// 	console.log(res,'data')
					
				// })	
			},
			getUserInfo(){
				this.$u.api.getUserInfo({
					}).then(res=>{
					console.log(res,'data')
					this.userInfo = res.data.userInfo
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.u-nav-slot{
		font-size:34rpx;
		font-weight: bold;
		color:#fff;
	}
	.ad-banner{
		width:700rpx;
		height:142rpx;
		margin:20rpx auto;
		text-align: center;
		box-sizing: border-box;
		margin-top:185rpx;
	}
	.text{
		background-color: transparent;
		font-size:26rpx;
		padding:0;
		margin:0;
		color:#666;
	}
	button::after {
	  border: none;
	  
	}
	.listSet{
		background-color: white;
		width:700rpx;
		border-radius: 20rpx;
		padding:30rpx;
		padding-bottom:10rpx;
		margin:0 auto;
		box-sizing: border-box;
		.title{
			color:#333333;
			padding-left:20rpx;
		}
		.ul{
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: center;
			margin:30rpx 0;
			font-size:26rpx;
			color:#666666;
			.li{
				width:25%;
				margin-bottom:20rpx;
				text-align: center;
				.img-box{
					width:55rpx;
					height:56rpx;
					margin: auto;
				}
				.text{
					margin-top:10rpx;
					border:0;
				}
			}
		}
	}
	.header{
		width:750rpx;
		height:430rpx;
		background: linear-gradient(166.26deg, #5DA4F4 0%, #EFF2F8 100%);
		position:relative;
		
		.headContent{
			width:700rpx;
			height:330rpx;
			border-radius: 20rpx;
			background-color: white;
			position: absolute;
			bottom:-165rpx;
			left:25rpx;
			box-sizing: border-box;
			padding:30rpx 50rpx;
			// box-shadow:0px 0px  10px 5px #eee;
			.top-tx{
				position:absolute;
				top:-60rpx;
				left:50rpx;
			}
			.hd{
				.title{
					font-size:34rpx;
					color:#333333;
					padding-top:50rpx;
				}
				.desc{
					color:#666666;
					font-size:24rpx;
					margin-top:10rpx;
				}
			}
			.ul{
				justify-content: center;
				align-items: center;
				margin:30rpx 0;
				font-size:26rpx;
				color:#666666;
				.li{
					text-align: center;
					.img-box{
						width:55rpx;
						height:56rpx;
						margin: auto;
					}
					.text{
						margin-top:10rpx;
					}
				}
			}
		}
	
	}
</style>
