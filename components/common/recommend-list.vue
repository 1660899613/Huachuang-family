<template>
	<view class="topic-kc" v-if="list.length>0">
		<view class="block-title flex-box" @click="$f.jump('/pages/server/moreIndex')">
			<view class="left">推荐课程</view>
			<view class="right">
				<text>推荐更多></text>
			</view>
		</view>
		<view class="topic-hot flex-box">
			<navigator hover-class="none" :url="'/pages/courseDetails/index?id='+item.courseId" class="topic-item"
				v-for="(item,index) in list" :key="index">
				<view class="wrap">
					<u-image  mode="" width="345rpx"
					 shape="square"
					  border-radius="10 0 10 0"  
					  height="210rpx"
					   class="cover-img" :src="item.courseImg"></u-image>
					<view class=" media_title textPic">
						{{item.courseName}}
					</view>
				</view>
			</navigator>
		</view>
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
	.topic-kc{
		// padding:20rpx;
		// background-color: white;
		// margin-bottom:20rpx;
		font-size:24rpx;
		.block-title{
			color:#666;
			font-size:30rpx;
			margin-bottom:20rpx;
			background-color: white;
			padding:20rpx;
			justify-content: space-between;
			.right{
				font-size:26rpx;
				color:#666666;
			}
		}
		.topic-hot{
			flex-wrap: wrap;
			padding:0 20rpx;
			.topic-item{
				width:50%;
				margin-bottom:20rpx;
				.wrap{
					background-color: white;
					border-radius: 5rpx;
					padding-bottom:20rpx;
					.cover-img{
						
					}
				}
				.textPic{
					text-align: left;
					margin-top:20rpx;
					padding:0 20rpx;
				}
			}
			.topic-item:nth-child(odd) .wrap{
				margin-right:10rpx;
				text-align: center;
				background-color: white;
			}
			.topic-item:nth-child(even) .wrap{
				margin-left:10rpx;
				background-color: white;
			}
		}
	}
</style>
