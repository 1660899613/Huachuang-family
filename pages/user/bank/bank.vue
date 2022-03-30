<template>
	<view class="wrap">
		
		<view class="card_info" v-if="bankInfo.bankNo">
			<view class="card_title">
				{{bankInfo.bankName?bankInfo.bankName:'--'}}
			</view>
			<view class="card_num">
				{{bankInfo.bankNo}}
			</view>
			<view class="realName">
				{{bankInfo.realName}}
			</view>
		</view>
		<view class="bdBank btn" @click="$f.jump('/pages/user/bank/index')">添加银行卡</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bankInfo:{}
			};
		},
		onShow() {
			this.getBankInfo()
		},
		methods:{
			getBankInfo(){
				this.$u.api.getBankInfo({
					}).then(res=>{
						this.bankInfo=res.data.bankInfo
					console.log(res.data,'银行卡')
				})
				
			},
		}
	}
</script>

<style lang="scss">
	.wrap{
		
	}
	.card_info{
		width: 635rpx;
		height:370rpx;
		background: linear-gradient(90deg, #1370F7 0%, #3484F8 100%);
		margin: 30rpx;
		color: #FFFFFF;
		padding: 30rpx;
		border-radius: 16rpx;
		text-align: center;
		line-height: 130rpx;
		font-family: 600;
		.card_title{
			font-size: 30rpx;
		}
		.card_num{
			font-size: 36rpx;
		}
		.card_name{
			font-size: 36rpx;
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
