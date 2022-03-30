<template>
	<view class="wrap">
		<!-- 搜索 -->
		<u-search 
			margin="20rpx"
			:clearabled="true"
			:showAction="false"
			:animation="false"
			inputAlign="center"
			shape="round"
			placeholder="搜索关键字" 
			@search="searchClick"
			v-model="keyword"></u-search>
		
		<view class="content">
			<!-- <view class="ul">
				<view class="title">历史搜索</view>
				<view class="li">精品课程</view>
				<view class="li">活动峰会</view>
				<view class="li">高管</view>
			</view> -->
			<view class="ul">
				<view class="title">推荐搜索</view>
				<view class="li">精品课程</view>
				<view class="li">活动峰会</view>
				<view class="li">高管</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				keyword: ''
			};
		},
		methods:{
			...mapMutations(['searchChange']),
			//搜索
			searchClick(){
				uni.setStorageSync("searchValue", this.keyword);
				this.searchChange(this.keyword)
				this.$f.jump('/pages/server/index',4)
			},
		}
	}
</script>

<style lang="scss">
	.wrap{
		// padding:20rpx;
		.content{
			.ul{
				margin-bottom:30rpx;
			}
			padding:20rpx;
			.title{
				font-size:28rpx;
				color:#333333;
			}
			.li{
				display: inline-block;
				padding: 8rpx 20rpx;
				background-color: #F5F5F5;
				color:#999;
				border-radius: 12rpx;
				margin-top:20rpx;
				margin-right:20rpx;
			}
		}
	}
</style>
