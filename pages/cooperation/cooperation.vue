<template>
	<view class="wrap">
		<u-image class="szIco"
		 :src="'https://img.alicdn.com/imgextra/i3/1650780431/O1CN01yFkAtP1F3RRit6ltU_!!1650780431.png'" 
		 :lazy-load="true" width="750rpx" :height="myheight"></u-image>
		 <view class="hz-btn flex-box">
			 <view class="hz-1 hz-sty" @click="goToApply('1')">
				 <view class="img-box">
					 <u-image class="szIco"
					  src="@/static/ico/hz-1.png" 
					  :lazy-load="true" width="150rpx" height="150rpx"></u-image>	
				 </view>
		
				   个人合作
			 </view>
			 <view class="hz-2 hz-sty"  @click="goToApply('2')">
				 <view class="img-box">
					 <u-image class="szIco"
					  src="@/static/ico/hz-2.png" 
					  :lazy-load="true" width="150rpx" height="150rpx"></u-image>	
				 </view>
			
				  企业合作
			 </view>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mywidth:"",
				myheight:"",
			};
		},
		
		onLoad() {
			
		},
		methods:{
			//取申请
			goToApply(type){
				
				this.$u.api.extensionIndex({}).then(res=>{
					console.log(res.data.extensionIndex.code)
					
					
					if(res.code==200){
						if(res.data.extensionIndex.code=='-1'){
							// this.$f.jump('/pages/cooperation/index?type='+type)
							this.$f.jump('/pages/cooperation/apply?type='+type)
						}else if(res.data.extensionIndex.code=='1'){
							this.$f.jump('/pages/cooperation/index?type='+type)
						}
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
		},
		
		
		
		onShow(){
			var that=this
			uni.getSystemInfo({
			    success: function (res) {
					that.mywidth=res.screenWidth*2+'rpx'
					that.myheight=res.screenHeight*2+'rpx'
					console.log('111',that.mywidth,that.myheight)
			    }
			});
		}
		
	}
</script>

<style lang="scss">
	page{
		background-color: #F9F7F3;
		.wrap{
			width:100vw;
			height:100vh;
			overflow: hidden;
			.hz-btn{
				position:absolute;
				width: 100%;
				top:210rpx;
				justify-content: center;
				font-size:40rpx;
				.hz-sty{
					width:50%;
					text-align: center;
					
				}
				.img-box{
					width:150rpx;
					height:150rpx;
					margin:10rpx auto;
				}
			}
		}
	}
</style>
