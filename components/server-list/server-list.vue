<template>
	<view>
		<view class="ul">
			<view class="li flex-box" @click="$f.jump('/pages/courseDetails/index?id='+item.courseId)"  v-for="(item,index) in list" :key="index">
				<view class="left">
					<u-image class="szIco"
					 radius="5"
					 :src="item.courseImg " 
					 :lazy-load="true" width="225rpx" height="135rpx"></u-image>
				</view>
				<view class="center box-1">
					<view class="hd media_title">{{item.courseName}}</view>
					<view class="bd"><span v-if="item.recentClass!='0'">第{{item.recentClass}}期</span> {{item.classBegin }}-{{item.classEnd}}</view>
					<!-- <view class="desc media_desc"></view> -->
					<view class="time flex-box">
						<view class="color">{{item.signCount}}人报名</view>
						<view v-if="item.hotSign==1">
							<image class="imgSty" src="@/static/ico/huo-ico.png"></image>
							<view>热销中</view>
						</view>
						<view v-else>
							<image class="imgSty" src="@/static/ico/huo-ico.png"></image>
							<view style="color:#F79810;">剩余 {{item.restNum}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 加载状态 -->
		<block v-if="loadStatus != 'none'">
			<block v-if="list.length > 0">
				<view style="padding: 30rpx;">
					<u-loadmore loadingIcon="semicircle" :icon="true" :status="loadStatus"  />
				</view>
			</block>
			<block v-else>
				<u-empty text="暂无数据" mode="favor"></u-empty>
			</block>
		</block>
	</view>
</template>

<script>
	export default {
		name:"assets-list",
		props: {
			list: Array,
			loadStatus: String,
			
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
	page{
		background-color: #f5f5f5;
	}
	.ul{
		background-color: #f5f5f5;
		padding:20rpx;
		.li{
			padding:20rpx 30rpx;
			border-radius: 10rpx;
			align-items: center;
			// border-bottom:1rpx solid #eee;
			background-color: #ffffff;
			margin-bottom:20rpx;
			box-shadow:0px 0px  10px 5px #eee;
			.left{
				
			}
			.center{
				margin-left: 20rpx;
				.hd{
					font-size:28rpx;
				}
				.bd{
					font-size:24rpx;
				}
				.desc{
					font-size:24rpx;
					margin:15rpx 0;
					color:#666666;
				}
				.time{
					align-items: center;
					text-align: center;
					justify-content: space-between;
					color:#FF4D4D;
					font-size:24rpx;
					.color{
						color:#999999;
					}
					.imgSty{
						width:30rpx;
						height:27rpx;
					}
				}
			}
		}
		.li:last-child{
			margin:0;
		}
	}
</style>
