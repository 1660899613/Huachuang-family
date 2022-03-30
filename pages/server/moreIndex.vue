<template>
	<view class="severContent">
		<!-- 列表 -->
		<severList :list="list" :loadStatus="loadStatus"></severList>
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
				let page = this.page
				this.$u.api.getCourseList({
						page: page,
					}).then(res=>{
					console.log(res,res.data.pageTotal,'data')
					if(this.page==1 || res.data.pageTotal == 1){
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
