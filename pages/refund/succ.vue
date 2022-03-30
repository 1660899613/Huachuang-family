<template>
	<view class="wrap">
		<view class="succ-img">
			<u-image src="/static/ico/succ-i3.png"  width="200rpx" height="176rpx"></u-image>
		</view>
		<view class="desc">您的退款申请已发送</view>
		<view class="info">您的退款申请已发送，请您耐心等待！</view>
		<view class=" btnHome" @click="$f.jump('/pages/index/index',4)">返回首页</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
		.wrap{
			text-align: center;
			padding-top:50rpx;
			.succ-img{
				width:230rpx;
				height:235rpx;
				margin:20rpx auto;
				margin-top:100rpx;
			}
			.title{
				font-size:42rpx;
				color:#333333;
			}
			.info{
				color:#999;
				font-size:24rpx;
			}
			.desc{
				// color:#CCCCCC;
				margin-top:30rpx;
				margin-bottom:10rpx;
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
