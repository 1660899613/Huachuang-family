<template>
	<view class="wrap">
		<view class="succ-img">
			<u-image src="/static/ico/succ-ico-1.png"  width="230rpx" height="235rpx"></u-image>
		</view>
		<view class="title">支付成功</view>
		<view class="desc">支付成功，请尽快上传学习人资料绑定</view>
		<view class="btn btnHome" @click="$f.jump('/pages/index/index',4)">返回首页</view>
		<view class="btn" @click="$f.jump('/pages/user/scheme/scheme')">查看订单</view>
		<button class="btn" open-type="contact" hover-class='none'>联系客服</button>
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
			}
			.title{
				font-size:42rpx;
				color:#333333;
			}
			.desc{
				color:#CCCCCC;
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
			background: linear-gradient(90deg, #1370F7 0%, #3484F8 100%);
			color:#fff;
			border:none;
		}
	}
</style>
