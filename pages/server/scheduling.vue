<template>
	<view class="severContent">
		<u-sticky :offsetTop="0" bgColor="#ffffff">
			<view class="topMask">
				<u-tabs
				:list="tabList" 
				:scrollable="false" 
				:current="current"
				@click="tabClick"></u-tabs>
				
			</view>
		</u-sticky>
		<!-- 列表 -->
		<severList :list="list" :loadStatus="loadStatus"></severList>
		<!-- 蒙层 -->
		<u-overlay :show="showMask" :duration="400" :z-index ="5" :opacity="0.3"></u-overlay>
	</view>
</template>

<script>
	import severList from '../../components/server-list/server-list.vue';
	import sortClass from '../../components/common/sort-Class.vue';
	export default {
		components:{
			severList,
			sortClass
		},
		data() {
			return {
				tabList:[{
						name: '全部',
					},{
						name: '课程班级',
					},
					{
						name: '活动峰会',
					},
				],
				current:0,
				showMask: false,
				page:1,
				loadStatus: 'loading',
				keyword: '',
				list: [],
				sortClass:[
					{
						name: '状态',
						cond: false,
					},
					{
						name: '课程',
						cond: false,
						
					}
					
				],
			}
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
		methods: {
			tabClick(item){
				console.log(item)
				this.current = item.index
				this.page = 1
				this.list = []
				this.getIndexList();
			},
			//sort监听
			changSort(mask,el){
				this.showMask = mask
				this.sortClass = el
			},
			changClild(itemText,indexItem){
				this.sortClass.forEach(function(item,index,array){
					if(indexItem==index){
						item.name = itemText
					}
				},this)
				this.showMask = false
				//查询 开始
				this.getList()
			},
			//搜索
			searchClick(){
				
			},
			//默认列表数据
			getIndexList(){
				uni.showLoading({
				    title: '加载中'
				});
				let page = this.page
				// 类型 1 品牌资讯 2 行业资讯 3 活动 ycy
				let type = this.current;
				this.$u.api.getCourseHaveList({
						courseType:type,
						page: page,
					}).then(res=>{
					console.log(res,res.data.pageTotal ,'data')
					if(this.page==1|| res.data.pageTotal == 1){
						this.list = res.data.courseList
						this.loadStatus = "nomore";
					}else{
						this.list = this.list.concat(res.data.courseList);
						if (this.page >= res.data.pageTotal) {
							this.loadStatus = "nomore";
						} else {
							this.loadStatus = "loadmore"
						}
					}
					uni.hideLoading();
				})
			},
		}
	}
</script>

<style lang="scss">
	.topMask{
		background-color: white;
		overflow: hidden;
		position: relative;
		z-index: 9;
	}
</style>
