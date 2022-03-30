<template>
	<view class="wrap">
		<u-sticky :offsetTop="0" bgColor="#ffffff">
			<view class="topMask">
				<!-- 搜索 -->
				<u-search 
					margin="20rpx"
					:clearabled="true"
					:showAction="false"
					:animation="false"
					inputAlign="center"
					shape="round"
					placeholder="搜索关键字" 
					v-model="keyword"></u-search>
				
			</view>
		</u-sticky>
		<!--  -->
		<view class="list">
			<view class="li flex-box" v-for="(item,index) in list" :key="index" 
			@click="$f.jump('/pages/user/contract/details?id='+item.userAgreementId+'&contractId='+item.contractId+'&date='+item.date+'&signTitle='+item.signTitle)">
				<view class="center box-1">
					<view class="td">合同编号：{{item.userAgreementId}}</view>
					<view class="th">{{item.signTitle}}</view>
					<viwe class="time">日期：{{item.date}}</viwe>
				</view>
				<view class="right">
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				list: [],
				page:1,
				loadStatus:'loading'
			};
		},
		onLoad(){
			this.getContractList()
		},
		onShow() {
			
		},
		onReachBottom() {
			this.page++;
			this.getContractList();
		},
		onPullDownRefresh() {
			
		},
		methods:{
			getContractList(){
				let page = this.page
				// 类型 1 品牌资讯 2 行业资讯 3 活动 ycy
				this.$u.api.getContractList({
						page: page,
					}).then(res=>{
					console.log(res,'data')
					if(this.page==1&& res.data.pageTotal==1){
						this.list = res.data.agreements
						this.loadStatus = "nomore";
					}else{
						this.list = this.list.concat(res.data.agreements);
						if (this.page >= res.data.pageTotal || res.data.pageTotal === 0) {
							this.loadStatus = "nomore";
						} else {
							this.loadStatus = "loadmore"
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.wrap{
		.li{
			padding:20rpx;
			border-bottom: 1rpx solid #eee;
			.center{
				.td{
					color:#999999;
					font-size:24rpx;
				}
				.th{
					font-size:30rpx;
					color:#333;
				}
				.time{
					color:#999999;
					font-size:24rpx;
				}
			}
		}
	}
</style>
