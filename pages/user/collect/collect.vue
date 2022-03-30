<template>
	<view class="severContent">
		<!-- 列表 -->
		<severList :list="list" :loadStatus="loadStatus"></severList>
		<!-- 蒙层 -->
		<u-overlay :show="showMask" :duration="400" :z-index ="5" :opacity="0.3"></u-overlay>
	</view>
</template>

<script>
	import severList from '../../../components/server-list/server-list.vue';
	export default {
		components:{
			severList,
		},
		data() {
			return {
				showMask: false,
				page:1,
				loadStatus: 'loading',
				keyword: '',
				list: [],
				sortClass:[
					{
						name: '类型',
						cond: false,
						child: [
							'全部','精品课程','活动峰会'
						]
					},
					{
						name: '对象',
						cond: false,
						
					},
					{
						name: '时间',
						cond: false,
						child: [
							'全部','精品课程','活动峰会'
						]
					}
				],
			}
		},
		onLoad() {
		},
		onShow() {
			this.getUserCollection()
		},
		onReachBottom() {
			this.page++;
			this.getUserCollection();
		},
		onPullDownRefresh() {
			
		},
		methods: {
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
			onfocus(){
				this.$f.jump('/pages/server/search')
			},
			//默认列表数据
			getUserCollection(){
				let page = this.page
				// 类型 1 品牌资讯 2 行业资讯 3 活动 ycy
				this.$u.api.getUserCollection({
						page: page,
					}).then(res=>{
					console.log(res,'data')
					if(this.page==1&& res.data.pageTotal==1){
						this.list = res.data.collectionList
						this.loadStatus = "nomore";
					}else{
						this.list = this.list.concat(res.data.collectionList);
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
	.topMask{
		background-color: white;
		overflow: hidden;
		position: relative;
		z-index: 9;
	}
</style>
