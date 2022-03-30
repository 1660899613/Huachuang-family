<template>
	<view class="severContent">
		<u-sticky :offsetTop="0" bgColor="#ffffff">
			<view class="topMask">
				<u-tabs
				:list="tabList" 
				:scrollable="false" 
				:current="current"
				@click="tabClick"></u-tabs>
				<!-- 分类 -->
				<sortClass 
				:sortClass="sortClass" 
				:showMask="showMask"
				:studyStatusList="studyStatusList" 
				@changSort="changSort"
				@changClild="changClild"
				></sortClass>
				
			</view>
		</u-sticky>
		<!-- 列表 -->
		<studyList :list="list" @changeopenItem="changeopenItem" :loadStatus="loadStatus"></studyList>
		<!-- 推荐课程 -->
		<recommendList :list="recommend"></recommendList>
		<!-- 蒙层 -->
		<u-overlay :show="showMask" :duration="400" :z-index ="5" :opacity="0.3"></u-overlay>
	</view>
</template>

<script>
	import studyList from '../../components/study-list/study-list.vue';
	import sortClass from '../../components/common/sort-studyClass.vue';
	import recommendList from '../../components/common/recommend-list.vue'
	export default {
		components:{
			studyList,
			sortClass,
			recommendList
		},
		data() {
			return {
				tabList:[
					{
						name: '全部',
					},
					{
						name: '打卡学习',
					},
					{
						name: '套餐服务',
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
				studyStatusList: [],
				defualtIndex:0,
				childIndex:null,
				courseNameList: [],
				kccourseId:null,
				recommend:[]
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.current=0
			this.defualtIndex=0
			this.getIndexList()
			this.getLearnCourseName()
			this.getHomeData()
		},
		onReachBottom() {
			this.page++;
			this.getIndexList();
		},
		onPullDownRefresh() {
			
		},
		methods: {
			
			getHomeData(){
				this.$u.api.indexInfo({
					}).then(res=>{
					console.log(res,'data')
					this.recommend = res.data.recommend
					// recommend 推荐课程 
					
				})
			},
			//显示课程服务 子信息
			changeopenItem(index){
				
				this.list[index].cond = !this.list[index].cond 
			},
			//切换
			tabClick(item){
				console.log("查看一下",item)
				this.current = item.index
				this.page = 1
				this.list = []
				if(this.current==1||this.current==0){
					this.getIndexList();
				}else if(this.current==2){
					this.getPackageLearn()
				}
				
			},
			//sort监听
			changSort(mask,el){
				this.showMask = mask
				this.sortClass = el
			},
			changClild(itemText,indexItem,childIndex){
				console.log(itemText,indexItem,childIndex)
				//初始化
				this.page = 1;
				this.list = []
				// this.current = indexItem //一级下标 //类型 对象 时间
				this.childIndex = childIndex //二级下标
				if(indexItem==1){
					console.log(this.studyStatusList,childIndex,'课程i')
					this.kccourseId = this.studyStatusList[childIndex].courseId
				}else{
					this.kccourseId = null
				}
				this.sortClass.forEach(function(item,index,array){
					if(indexItem==index){
						item.name = itemText
					}
				},this)
				this.showMask = false
				//查询 开始
				if(this.current==0||this.current==1){
					this.getIndexList()
				}else{
					
					this.getPackageLearn()
				}
				
			},
			//搜索
			searchClick(){
				
			},
			getLearnCourseName(){
				
				this.$u.api.getLearnCourseName({
					ycy:this.defualtIndex,//1 学习-打卡学习 2 套餐产品
					}).then(res=>{
					console.log(res,'data studyStatusList')
					this.studyStatusList = res.data.courseNameList
					
				})
			},
			//获取课程服务
			getPackageLearn(){
				uni.showLoading({
				    title: '加载中'
				});
				console.log('课程服务')
				let type = this.current;
				if(this.childIndex!=null){
					type = this.childIndex
				}
				let option = {}
				let page = this.page
				option.page = page
				if(this.kccourseId){
					option.courseId = this.kccourseId
				}else{
					option.learnStatus = type
				}
				this.$u.api.getPackageLearn(option).then(res=>{
					res.data.courseList.forEach(function(item,index,arr){
						item.cond = false
					},this)
					if(res.data.pageTotal == 1&&this.page ==1){
						
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
					console.log(this.list ,'data courseList')
				})
			},
			//默认列表数据
			getIndexList(){
				uni.showLoading({
				    title: '加载中'
				});
				let type = this.current;
				if(this.childIndex!=null){
					type = this.childIndex
				}
				let option = {}
				let page = this.page
				option.page = page
				if(this.kccourseId){
					option.courseId = this.kccourseId
				}else{
					option.learnStatus = type
				}
				console.log('111',option)
				// 0 全部 1 学习-打卡学习 2 套餐产品
				this.$u.api.getLearnCourse(option).then(res=>{
					console.log(res ,'data')
					if(res.data.learnList){
						if(res.data.pageTotal == 1&&this.page ==1){
							this.list = res.data.learnList
							this.loadStatus = "nomore";
						}else{
							this.list = this.list.concat(res.data.learnList);
							if (this.page >= res.data.pageTotal) {
								this.loadStatus = "nomore";
							} else {
								this.loadStatus = "loadmore"
							}
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
