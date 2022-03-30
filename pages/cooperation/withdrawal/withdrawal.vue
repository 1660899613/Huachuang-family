<template>
	<view class="wrap">
		<view class="money">
			 <u--input
			 fontSize="44rpx"
			    placeholder="请输入提现金额"
			    border=""
			    v-model="value"
			    @change="change"
			  ></u--input>
		</view>
		<view class="dsc">余额 <text class="s1">{{withdrawInfo.money }}</text> <text class="s2" @click="allwithdraw">全部提现</text></view>
		<view class="txBtn btn" @click="applywithdraw">申请提现</view>
		<view class="tip">
			<view>*提示</view>
			<view>
				1.每人每天提现限额为{{withdrawInfo.restLimit}}元。 
			</view>
			<view>2.若提现失败将自动退回到钱包余额。</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: "",
				withdrawInfo:{},
				isquest:false
			};
		},
		onShow() {
			this.getWithdrawInfo()
		},
		methods:{
			allwithdraw(){
				this.value=this.withdrawInfo.money
			},
			
			getWithdrawInfo(){
				this.$u.api.getWithdrawInfo({}).then(res=>{
					this.withdrawInfo=res.data.withdrawInfo
					console.log("可提现金额",res)
				})
			},
			
			applywithdraw(){
				const that=this;
				if(this.isquest){
					return
				}
				this.isquest=true
				this.$u.api.withdraw({money:this.value}).then(res=>{
					if(res.code==200){
						that.isquest=false
						uni.showModal({
							title: '提示',
							content: res.message,
							success: function (res) {
								that.getWithdrawInfo()
							}
						});
												
					}else{
						that.isquest=false
						uni.showModal({
							title: '提示',
							content: res.message,
							success: function (res) {
								that.isquest=false
							}
						});
					}

				})
			},
			change(){
				
			}
		}
	}
</script>

<style lang="scss">
	.wrap{
		.money{
			padding:30rpx;
			border-bottom:1rpx solid #eee;
		}
		.dsc{
			padding:30rpx;
			font-size:26rpx;
			color:#A7ADB7;
			.s1{
				font-size:30rpx;
				color:#FF4D4D;
				margin-right:20rpx;
				margin-left:10rpx;
			}
			.s2{
				color:#8C8FF8;
				font-size:30rpx;
			}
		}
		.btn{
			width: 500rpx;
			height: 100rpx;
			line-height: 100rpx;
			background: #1370F7;
			border-radius: 12rpx;
			margin:0 auto;
			margin-top:100rpx;
			margin-bottom:50rpx;
			text-align: center;
			color:#fff;
		}
		.tip{
			padding:30rpx;
			color:#666666;
			font-size:26rpx;
		}
	}
</style>
