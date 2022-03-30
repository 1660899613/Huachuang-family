<template>
	<view>
		<view class="navList flex-box" v-if="list.length">
			<view @click="$f.jump(item.url)" class="navLi" v-for="(item,index) in list" :key="index">
				<view class="liIcon">
					<u-image class="" width="96rpx" height="96rpx" :src="item.src"></u-image>
				</view>
				<view class="liName">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"nav-list",
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
	.navList{
		background:white;
		flex-wrap: wrap;
		text-align: center;
		margin-bottom:20rpx;
		color:#656465;
		font-size:24rpx;
		.navLi{
			width:25%;
			margin-bottom:26.66rpx;
			.liIcon{
				width:96rpx;
				height:96rpx;
				margin: auto;
				margin-bottom:10rpx;
			}
			.lliName{
				display:block;
			}
		}
		
	}
</style>
