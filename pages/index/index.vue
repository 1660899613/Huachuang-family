<template>
	<view class="indexContent">
		<!-- 顶部自定义导航 -->
		<u-sticky offset-top="0" bgColor="#ffffff">
			 <u-navbar
				@leftClick="leftClick"
				:autoBack="true">
				<view
					class="u-nav-slot"
					slot="left">
					<u-image src="@/static/ico/news-ico.png" width="30rpx" height="37rpx"></u-image>
				</view>
				<view
					class="u-nav-slot"
					slot="center">
					首页
				</view>
			</u-navbar>
		</u-sticky>
		<view id="scrollHeight">
			<!-- 轮播图 -->
			<view class="header">
				<u-swiper
					height="320rpx"
					radius="10"
					:autoplay="false"
					:list="homeList.banners"
					keyName="banner"
					@click="swiperClick()"
				    ></u-swiper>
			</view>
			<!-- 其他列表导航 -->
			<navList :list="navList"></navList>
			<!-- 即将开课 -->
			<beginList :list="homeList.courseRecent"></beginList>
			<!-- 推荐课程 -->
			<recommendList :list="homeList.recommend"></recommendList>
		</view>
		
		<!-- 列表 -->
		<view class="content">
			<u-sticky :offsetTop="iStatusBarHeight" bgColor="#ffffff">
				<u-tabs 
				:list="tabList" 
				:scrollable="false" 
				:current="current"
				@click="tabClick"></u-tabs>
			</u-sticky>
			<view class="fixed-box">
				<indexList :list="list" :loadStatus="loadStatus"></indexList>
			</view>
		</view>
	</view>
</template>

<script>
	var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
	import navList from '../../components/common/nav-list.vue'
	import beginList from '../../components/common/begin-list.vue'
	import recommendList from '../../components/common/recommend-list.vue'
	import indexList from '../../components/index-list/index-list.vue';
	
	export default {
		components:{
			navList,
			beginList,
			recommendList,
			indexList
		},
		data() {
			return {
				current:0,
				page:1,
				iStatusBarHeight:0,
				loadStatus:'loading',
				title: 'Hello',
				tabList:[{
						name: '品牌资讯',
					},{
						name: '行业资讯',
					},
				],
				navList: [
					{
						name: '课程排期',
						url: '/pages/server/scheduling',
						src: 'https://img.alicdn.com/imgextra/i2/1650780431/O1CN01qsbO2v1F3RRVk8Faj_!!1650780431.png'
					},
					{
						name: '近期活动',
						url: '/pages/quick/active',
						src: 'https://img.alicdn.com/imgextra/i1/1650780431/O1CN013GKXGw1F3RRXV8gLe_!!1650780431.png'
					},
					{
						name: '专家导师',
						url: '/pages/quick/tutor',
						src: 'https://img.alicdn.com/imgextra/i1/1650780431/O1CN01eo5GOD1F3RRa8sszQ_!!1650780431.png'
					},
					{
						name: '书院介绍',
						url: '/pages/quick/introduce?id=sc_bref',
						src: 'https://img.alicdn.com/imgextra/i2/1650780431/O1CN01KQ0iQj1F3RRMWvywM_!!1650780431.png'
					}
				],
				list1:[
					'https://img.alicdn.com/imgextra/i4/1650780431/O1CN01kCrTjA1F3RRa8gnkx_!!1650780431.png',
					'https://img.alicdn.com/imgextra/i4/1650780431/O1CN01kCrTjA1F3RRa8gnkx_!!1650780431.png',
					'https://img.alicdn.com/imgextra/i4/1650780431/O1CN01kCrTjA1F3RRa8gnkx_!!1650780431.png',
				],
				list:[],
				homeList:[]
			}
		},
		onLoad(options) {
			if (options.scene) {
			//扫描普通链接进入小程序，并获取参数
				const scene = decodeURIComponent(options.scene);
				console.log(scene);//inviteCode="OOOOOO"
				let arr = scene.split('=');
				uni.setStorageSync("inviteCode", arr[1]);
				// console.log(arr);[inviteCode,OOOOOO]
			}else{
				//普通链接进入
				let inviteCode= options.inviteCode?options.inviteCode:""
				uni.setStorageSync("inviteCode",inviteCode);
				 
				 
			}
			
			
			
			//NavigationBar	导航栏	固定高度44px
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight+44;
			this.getIndexList(this.current)
			this.getHomeData()
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { 
				//分享按钮
				console.log(res.target)
			}
			return {
				title: this.$c.miniappName,
				path: '/pages/index/index',
				imageUrl: this.shareCover
			}
		},
		onShow() {
			// this.getArticle()
		},
		onReachBottom() {
			this.page++;
			this.getIndexList(this.current);
		},
		onPullDownRefresh() {
			
		},
		methods: {
			tabClick(item){
				this.current = item.index
				this.page = 1
				this.list = []
				this.getIndexList(this.current);
			},
			//首页消息
			leftClick(){
				this.$f.jump('/pages/news/news')
			},
			getHomeData(){
				this.$u.api.indexInfo({
					}).then(res=>{
					this.homeList = res.data
					// banners 轮播图 --banner 图片
					// courseRecent 即将开课
					// recommend 推荐课程 
					// courseName 课程名     
					// courseImg 课程图片
				})
			},
			//轮播图
			swiperClick(item){
				
			},
			//品牌资讯  行业资讯
			getIndexList(curr){
				let page = this.page
				// 类型 1 品牌资讯 2 行业资讯 3 活动 ycy
				let type = curr+1;
				this.$u.api.getArticle({
						ycy:type,
						page: page,
					}).then(res=>{
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
	page{
		background-color: #f5f5f5;
		.header{
			background-color: white;
			padding:20rpx;
		}
		.fixed-box{
			min-height:500rpx;
		}
		.u-nav-slot{
			font-size:34rpx;
			font-weight: bold;
		}
		
	}
</style>
