<template>
	<view>
		<view class="ul">
			<view class="li flex-box" v-for="(item,index) in list" @click="$f.jump('/pages/quick/details?id='+item.articleId)" :key="index">
				<view class="left">
					<u-image class="szIco"
					 radius="3"
					 :src="item.articleImg" 
					 :lazy-load="true" width="240rpx" height="200rpx"></u-image>
				</view>
				<view class="center box-1">
					<view class="hd media_desc">{{item.articleTitle}}</view>
					<view class="desc media_desc">{{item.articleInfo}}</view>
				<!-- 	<view class="time flex-box">
						<view>2021-12-30</view>
						<view>300</view>
					</view> -->
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
			loadStatus: String
		},
		data() {
			return {
				
			};
		},
		onShow() {
			console.log(this.list)
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.ul{
		background-color: white;
		.li{
			align-items: flex-start;
			padding:20rpx;
			border-bottom:1rpx solid #eee;
			.left{
				
			}
			.center{
				margin-left: 20rpx;
				.hd{
					// font-size:32rpx;
				}
				.desc{
					font-size:24rpx;
					margin:15rpx 0;
					color:#666666;
				}
				.time{
					justify-content: space-between;
					color:#666666;
				}
			}
		}
	}
</style>
