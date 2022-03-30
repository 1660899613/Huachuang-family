<template>
	<view class="wrap">
		<view class="ul">
			<view class="li" @click="$f.jump('/pages/news/details?id='+item.id+'&title='+item.noteTitle)" v-for="(item,index) in list" :key="index">
				<view class="time">{{item.createTime}}</view>
				<view class="content">
					<view class="title">{{item.noteTitle}}</view>
					<view class="desc">{{item.noteContent}}</view>
					<view class="bm-hd flex-box">
						<view class="box-1">查看详情</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<!-- <view class="li" @click="$f.jump('/pages/news/details')">
				<view class="time">10:00</view>
				<view class="content">
					<view class="title">系统维护公告</view>
					<view class="desc">亲爱的同学们，以中国传统文化为智慧之源，专注服 务于中国本土家族企业，提供专业精准的家族传</view>
					<view class="bm-hd flex-box">
						<view class="box-1">查看详情</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			this.getIndexList()
		},
		methods:{
			getIndexList(curr){
				
				this.$u.api.getNoteList({
						
					}).then(res=>{
					console.log(res,'data')
						this.list = res.data.noteList
					
				})
				
				
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
		.wrap{
			padding:20rpx;
			color:#333333;
			.ul{
				.li{
					.time{
						font-size:24rpx;
						text-align: center;
						margin-bottom:20rpx;
					}
					.content{
						background-color: #fff;
						border-radius: 20rpx;
						padding:20rpx;
						.title{
							font-size:30rpx;
						}
						.desc{
							font-size:28rpx;
							color:#666;
						}
						.bm-hd{
							font-size:28rpx;
							color:#666;
							margin-top:20rpx;
							padding:20rpx 0;
							padding-bottom:0;
							border-top:1rpx solid #eee;
						}
					}
					margin-bottom: 20rpx;
				}
			}
			
		}
	}
</style>
