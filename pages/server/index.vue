<template>
	<view class="severContent">
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
					@focus="onfocus"
					v-model="keyword"></u-search>
				<!-- 分类 -->
				<sortClass 
				:sortClass="sortClass" 
				:showMask="showMask"
				@changSort="changSort"
				@changClild="changClild"
				:objList="objList" 
				:typeList="typeList"
				></sortClass>
				
			</view>
		</u-sticky>
		<!-- 列表 -->
		<severList :list="list"  :loadStatus="loadStatus"></severList>
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
							
						],
						id:0,
					},
					{
						name: '对象',
						cond: false,
						id:1,
						
					},
					{
						name: '时间',
						cond: false,
						child: [
							
						],
						id:2
					}
				],
				objList:[],
				typeList: [],
				times:0,
				tags:'',
				curr: 0,
				childIndex: 0,
				default1Value: '全部',
				obj: {
					courseType:0,
					page: 1,
				},
				keyword:""
			}
		},
		onLoad() {
			
			this.confInfo1()
			this.confInfo2()
		},
		onShow() {
			let searchValue= uni.getStorageSync("searchValue");
			this.keyword=searchValue?searchValue:''
			this.page=1

			
			this.list = []
			this.getIndexList()
			
		},
		computed:{
			
			
		},
		onReachBottom() {
			this.page++;
			this.getIndexList();
		},
		onPullDownRefresh() {
			
		},
		methods: {
			
			
			confInfo1(){
				this.$u.api.confInfo({
						vkey:'course_type',
					}).then(res=>{
					console.log(res,'data 确认信息')
					this.objList = res.data.conf
					
				})
			},
			confInfo2(){
				this.$u.api.confInfo({
						vkey:'course_tag',
					}).then(res=>{
					console.log(res,'data 确认信息')
					this.typeList = res.data.conf
				})
			},
			//sort监听
			changSort(mask,el,index){
				console.log(mask,el,index)
				this.showMask = mask
				this.sortClass = el
				this.page=1
				this.tags=""
				if(index==2){
					//时间正反排序
					if(el[2].cond){
						this.times = 2
					}else{
						this.times = 1
					}
					this.list = []
					this.getIndexList()
				}
				
			},
			changClild(itemText,indexItem,childIndex){
				console.log(itemText,indexItem,childIndex)
				//初始化
				this.page = 1;
				this.list = []
				this.curr = indexItem //一级下标 //类型 对象 时间
				this.childIndex = childIndex //二级下标
				this.tags = childIndex
				
				if(this.curr==0){
					this.obj = {
						courseType:this.childIndex,
						page: this.page,
					}
					
				}
				if(this.curr==1){
					this.obj = {
						page: this.page,
						tags: this.tags
					}
					
				}
				if(this.curr==2){
					
				}
				this.sortClass.forEach(function(item,index,array){
					if(indexItem==index){
						item.name = itemText
					}
				},this)
				this.showMask = false
				//查询 开始
				this.getIndexList()
			},
			//搜索
			onfocus(){
				this.$f.jump('/pages/server/search')
			},
			//默认列表数据
			getIndexList(){
				uni.showLoading({
				    title: '加载中'
				});
				// 类型 0 全部 1 精品课程 2 活动 keywords 搜索关键字
				let type = this.current;
				
				let obj={
					courseType:this.childIndex,
					keywords:this.keyword,
					page:this.page,
					recommend:1,
					tags:this.tags,
					times:this.times
				}
				this.$u.api.getCourseList(obj).then(res=>{
					console.log(res,res.data.pageTotal ,'data')
					if(this.page==1 && res.data.pageTotal == 1){
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
