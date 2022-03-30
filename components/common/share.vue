<template>
	<view class="share_content">
		<uni-popup ref="popup" >
			<button class="poster" open-type="share"  @longpress="saveImg" :style="{ background:  '#ffffff' }" >
				<image :src="code" ></image>
			</button>
		</uni-popup>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shareImage:"../../static/ico/hz-g-bg2.png"
			}
		},
		props:{
			code:{
				type:String,
				default:""
			},
			inviteCode:{
				type:String,
				default:""
			},
			type:{
				type:String,
				default:'2'
			}
		},
		methods: {
			saveImg(){
				this.$emit("saveImg")
				this.$refs.popup.close()
			},
			openShare(){
				this.$refs.popup.open()
		    } 
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 分享按钮
				console.log(res.target)
			}
			
			this.$refs.popup.close()
			return {
				title: "分享赢好礼",
				path: '/pages/index/index?inviteCode='+this.inviteCode,
				imageUrl: this.shareImage
			}
		},
	}
</script>

<style lang="scss">
	.share_content{
		
		.poster{
			padding-top: 20rpx;
			text-align: center;
			width: 600rpx;
			image{
				width: 500rpx;
				height: 800rpx;
			}
			.shar_info{
				background-color: #FFFFFF;
				// padding: 20rpx;
				border-radius: 0px 0px 16rpx 16rpx;
				overflow: hidden;
				image{
					width: 200rpx;
					height: 320rpx;
				}
			}
			color: #333333;
			font-size: 40rpx;
			button{
				color: #FFFFFF;
				font-size: 45rpx;
				margin-top: 28rpx;
			}
			
		}
	}

</style>
