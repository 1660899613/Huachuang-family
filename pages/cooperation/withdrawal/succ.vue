<template>
	<view class="wrap">
		<view class="succ-img-box" v-if="option.type=='1'">
			<view class="succ-img" >
				<u-image src="/static/ico/succ-2.png"  width="307rpx" height="283rpx"></u-image>
			</view>
			<view class="desc">欢迎您成为传承使者，共享发展，共创未来</view>
			<view class=" btnHome" @click="$f.jump('/pages/cooperation/index?type=1',3)">进入合作中心</view>
				<!-- <button class="btnHome" open-type="contact" hover-class='none'>专属客服</button> -->
			
		</view>
		<view class="succ-img-box" v-if="option.type=='2'">
			<view class="succ-img">
				<u-image src="/static/ico/succ-2.png"  width="307rpx" height="283rpx"></u-image>
			</view>
			<view class="desc">华创客服将于1~2个工作日内联系您</view>
			<view class=" btnHome" @click="$f.jump('/pages/index/index',4)">联系客服</view>
			
		</view>
		
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				option:{}
			};
		},
		onLoad(option){
			this.option=option
			let agreementId=uni.getStorageSync("userAgreementId")
			if(this.option.type==1&&agreementId){
				this.signCooperation(agreementId)
			}
			if(this.option.type == 2){
				uni.setNavigationBarTitle({
					title:'申请中...'
				})
			}
		},
		methods:{
			signCooperation(agreementId){
				this.$u.api.signCooperation({agreementId}).then(res=>{
					
					uni.removeStorage({
					    key: 'userAgreementId',
					    success: function (res) {
					        console.log('success');
					    }
					});
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
		.succ-img-box{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.wrap{
			
			padding-top:50rpx;
			.succ-img{
				width:230rpx;
				height:235rpx;
				margin-top:100rpx;
				display: flex;
				justify-content: center;
			}
			.title{
				font-size:42rpx;
				color:#333333;
			}
			.desc{
				// color:#CCCCCC;
				margin-top:30rpx;
				margin-bottom:50rpx;
			}
		}
		.btn::after {
			 border: none;
		}
		.btn{
			width:700rpx;
			height:100rpx;
			line-height:100rpx;
			border-radius: 10rpx;
			text-align: center;
			margin:auto;
			margin-bottom:30rpx;
			border:2rpx solid #D7D7D7;
			background-color: #fff;
			font-size:28rpx;
		}
		.btnHome{
			width: 502rpx;
			height: 96rpx;
			line-height: 96rpx;
			text-align: center;
			background: #106DF7;
			border-radius: 10rpx;
			color:#fff;
			border:none;
			margin:auto;
			margin-top:100rpx;
		}
	}
</style>
