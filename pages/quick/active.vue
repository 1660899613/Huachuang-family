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
		data() {
			return {
				list: [],
				page:1,
				loadStatus: 'loading'
			};
		},
		onLoad() {
			this.getIndexList()
		},
		onShow() {
			
		},
		onReachBottom() {
			this.page++;
			this.getIndexList();
		},
		onPullDownRefresh() {
			
		},
		onShow() {
			console.log(this.list)
		},
		methods:{
			
			getIndexList(curr){
				this.loadStatus = "nomore";
				let page = this.page
				// 类型 1 品牌资讯 2 行业资讯 3 活动 ycy
				let type = 3;
				this.$u.api.getArticle({
						ycy:type,
						page: page,
					}).then(res=>{
					console.log(res,'data')
					if(this.page==1){
						this.list = res.data.articleList
					}else{
						this.list = this.list.concat(res.data.articleList);
						if (this.page >= res.data.pageTotal || res.data.pageTotal === 0) {
							this.loadStatus = "nomore";
						} else {
							this.loadStatus = "loadmore"
						}
					}
				})
				
				
			},
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
					margin-top:40rpx;
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
