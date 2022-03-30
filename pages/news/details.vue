<template>
	<view class="wrap" v-if="infor.noteTitle">
		<view class="title">{{infor.noteTitle}}</view>
		<view class="time">发布时间：{{infor.createTime}}</view>
		<view class="content">
			<u-parse :content="infor.noteContent"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infor:{},
			};
		},
		onLoad(option) {
			this.id = option.id
			let title = option.title
			uni.setNavigationBarTitle({
				title: title
			})
			this.readNote()
		},
		methods:{
			readNote(){
				uni.showLoading({
				    title: '加载中'
				});
				this.$u.api.readNote({
						id:this.id
					}).then(res=>{
					console.log(res,'data')
					this.infor = res.data.note
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
				text-align: center;
			}
			.time{
				font-size:28rpx;
				color:#666;
				margin:20rpx 0;
				text-align: center;
				border-bottom:1rpx solid #eee;
				padding-bottom:20rpx;
			}
			.content{
				color:#666;
				font-size:26rpx;
			}
		}
		
	}
</style>
