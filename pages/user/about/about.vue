<template>
	<view class="aboutContent">
		<view class="wrap">
			<view class="logo-1">
				<u-image src="@/static/ico/logo-1.png" :lazy-load="true" width="133rpx" height="133rpx"></u-image> 
			</view>
			<view class="logo-2">
				<u-image src="@/static/ico/logo-2.png" :lazy-load="true" width="332rpx" height="84rpx"></u-image> 
			</view>
			<view class="title">V 2.0.14</view>
			<view class="desc">专注服务，懂你更专业</view>
		</view>
	</view>
</template>

<script>
</script>
	
<style lang="scss">
	page{
		background-color: #EFEBE7;
		.aboutContent{
			font-size:30rpx;
			.wrap{
				margin:80rpx auto;
				text-align: center;
				.logo-1{
					width:133rpx;
					height:133rpx;
					margin: auto;
				}
				.logo-2{
					width:332rpx;
					height:84rpx;
					margin: auto;
				}
				.title{
					
				}
				.desc{
					color:#666;
				}
			}
		
		}
	}
</style>
