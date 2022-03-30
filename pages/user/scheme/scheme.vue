<template>
	<view class="severContent">
		<u-sticky :offsetTop="0" bgColor="#ffffff">
			<view class="topMask">
				<u-tabs
				:list="tabList" 
				:flex="2"
				:scrollable="false" 
				:current="current"
				@click="tabClick"></u-tabs>
				
			</view>
		</u-sticky>
		<!-- 列表 -->
		<schemeList :list="list" @changeCencel="changeCencel" :current="checkIndex" :loadStatus="loadStatus"></schemeList>
		<!-- 蒙层 -->
		<u-overlay :show="showMask" :duration="400" :z-index ="5" :opacity="0.3"></u-overlay>
	</view>
</template>

<script>
	import schemeList from '../../../components/scheme-list/scheme-list.vue';
	export default {
		components:{
			schemeList,
		},
		data() {
			return {
				tabList:[{
						name: '全部',
					},{
						name: '待支付',
					},
					{
						name: '选上课时间',
					},
					{
						name: '已完成',
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
				checkIndex: 10, //全部
			}
		},
		onLoad() {
			this.getIndexList()
		},
		onShow() {
			
		},
		onReachBottom() {
			// this.page++;
			// this.getIndexList();
		},
		onPullDownRefresh() {
			
		},
		methods: {
			//取消订单
			changeCencel(index){
				console.log(index,'删除指定下标')
				this.list.splice(index,1);
			},
			tabClick(item){
				console.log(item)
				this.current = item.index
				this.checkIndex = this.current
				this.page = 1
				this.list = []
				if(this.current==0){
					this.checkIndex = 10
				}
				if(this.current==1){
					this.checkIndex = 0
				}
				if(this.current==2){
					this.checkIndex = 2
				}
				if(this.current==3){
					this.checkIndex = 4
				}
				//0 全部 1 待支付 2带选课 3已完成
				// orderStatus '0 待支付  1 已支付预付款  2 待选课 3 学习中 4 已完成 5  退款申请中 6 已退款  7 复训待收费 
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
				// let type = curr+1;
				this.$u.api.getUserOrder({
						
					}).then(res=>{
					console.log(res,'data')
					
					if(this.checkIndex==10){
						this.list = res.data.classRes
					}else{
						let newList = []
						res.data.classRes.forEach(function(item,index,arr){
							if(this.checkIndex==item.orderStatus){
								this.list=this.list.concat(item);
							}
						},this)
					}
					uni.hideLoading();
					// if(res.data.pageTotal == 1){
					// 	this.list = res.data.classRes
					// 	this.loadStatus = "nomore";
					// }else{
					// 	this.list = this.list.concat(res.data.classRes);
					// 	if (this.page >= res.data.pageTotal) {
					// 		this.loadStatus = "nomore";
					// 	} else {
					// 		this.loadStatus = "loadmore"
					// 	}
					// }
					
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
