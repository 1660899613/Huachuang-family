<template>
	<view class="wrap" v-if="infor.title">
		<view class="title">{{infor.title}}</view>
		<!-- <view class="time">发布时间：{{infor.createTime}}</view> -->
		<view class="content">
			<u-parse :content="infor.v_details"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				infor: {},
				agreenment:'以中国传统文化为智慧之源，，，，！'
			};
		},
		onLoad(option) {
			this.id = option.id
			console.log(this.id)
			this.getDetails()
			// uni.setNavigationBarTitle({
			// 	title: title
			// })
		},
		methods:{
			getDetails(){
				uni.showLoading({
				    title: '加载中'
				});
				this.$u.api.singleinfo({
						vkey:this.id
					}).then(res=>{
					console.log(res,'data')
					this.infor = res.data
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: white;
		.wrap{
			padding:25rpx;
			.title{
				font-size:34rpx;
			}
			.time{
				font-size:24rpx;
				color:#666;
				margin:20rpx 0;
			}
			.content{
				color:#666;
				font-size:26rpx;
			}
		}
		
	}
</style>
