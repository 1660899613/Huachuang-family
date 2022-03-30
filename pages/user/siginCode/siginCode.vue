<template>
	<view class="wrap" v-if="infor.courseName">
		<view class="content">
			<view class="header">
				<view class="title">{{infor.courseName}}</view>
				<view class="flex-box bd">
					<view class="box-1">第{{infor.courseTerm}}期</view>
					共4节课
				</view>
			</view>
			<view class="ewmBox">
				<view class="code">
					<u-image :src="'data:image/png;base64,'+infor.codeBase" :lazy-load="true" width="300rpx" height="300rpx"></u-image>
					<view class="succ-hx-img">
						<u-image v-if="item.sign==1" src="@/static/ico/succ-hx.png" :lazy-load="true" width="125rpx" height="125rpx"></u-image>
					</view>
				</view>
				<view class="hd">{{infor.studyName}}</view>
				<view class="des">请出示二维码给老师审核</view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				infor: {}
			};
		},
		onLoad(option){
			if (option.scene) {
			//扫描普通链接进入小程序，并获取参数
				const scene = decodeURIComponent(option.scene);
				console.log(scene);//classId="OOOOOO"
				let arr = scene.split('=');
				this.id = arr[1]
			}
			if(option.id){
				this.id = option.id
			}
			this.getLearnQR()
			
		},
		methods:{
			getLearnQR(){
				uni.showLoading({
				    title: '加载中'
				});
				this.$u.api.getLearnQR({
					classId: this.id,
					}).then(res=>{
					console.log(res,'data')
					this.infor = res.data.QRInfo
					uni.hideLoading();
				})
			},
		}
	}
</script>

<style lang="scss">
	.wrap{
		.header{
			padding:30rpx;
			.title{
				
			}
			.bd{
				color:#999999;
				font-size:24rpx;
				padding:20rpx 0;
			}
			border-bottom:20rpx solid #f5f5f5;
		}
		.ewmBox{
			text-align: center;
			padding:100rpx;
			.code{
				width:300rpx;
				height:300rpx;
				margin:20rpx auto;
				position:relative;
			}
			.succ-hx-img{
				position:absolute;
				bottom:-30rpx;
				right:-30rpx;
				width:125rpx;
				height:125rpx;
			}
			.des{
				font-size:24rpx;
				color:#999;
				margin-top:20rpx;
			}
		}
	}
</style>
