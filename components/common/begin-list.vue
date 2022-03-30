<template>
	<view class="topic-top" v-if="list.length>0">
		<view class="block-title">
			<view class="left">即将开课</view>
			<view class="right">
				
			</view>
		</view>
		<scroll-view :scroll-x="true" >
			<view class="topic-hot flex-box">
				<navigator hover-class="none" :url="'/pages/courseDetails/index?id='+item.courseId" class="topic-item"
					v-for="(item,index) in list" :key="index">
					<view class="index-box">
						<u-image mode="" width="225rpx" radius="5" height="135rpx" :src="item.courseImg"></u-image>
						<view class=" media_title textPic">
							{{item.courseName}}
						</view>
					</view>
				</navigator>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"begin-list",
		props: {
			list: Array,
		},
		data() {
			return {
				
			};
		},
		onShow() {
			console.log(this.list)
		}
	}
</script>

<style lang="scss">
	.topic-top{
		color:#333333;
		padding:20rpx 0;
		background-color: white;
		margin-bottom:20rpx;
		font-size:24rpx;
		
		.block-title{
			font-size:30rpx;
			margin-bottom:20rpx;
			padding:0 20rpx;
		}
		.topic-hot{
			// padding-left:250rpx;
			// justify-content: center;
			// align-items: center;
			.topic-item{
				// width:33.33%;
				margin-right:20rpx;
				.index-box{
					// margin-left:20rpx;
				}
				.textPic{
					text-align: center;
					margin-top:10rpx;
				}
			}
		}
	}
</style>
