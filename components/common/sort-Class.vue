<template>
	<view class="sortClass ">
		<view class="flex-box sortFlex">
			<view class="item box-1"  v-for="(item,index) in sortClass" :key="index">
				<view 
				class="title flex-box" 
				:class="item.cond?'colorSty':''"
				@click="sortClick(item,index)">{{item.name}} 
					<u-icon name="arrow-down" color="#aaa" v-if="!item.cond"></u-icon>
					<u-icon name="arrow-up" color="#106df7" v-else></u-icon>
				</view>
			</view>
		</view>
		
		<!-- 二级内容 -->
		<view class="childList flex-box" v-if="showMask">
			<view class="li" 
			:class="item.cond?'childSty':''" 
			v-for="(item,index) in childList" 
			@click="childClick(item)"
			:key="index">{{item.confContent}}</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		name:"nav-list",
		props: {
			sortClass: Array,
			showMask: Boolean,
			typeList: Array,
			objList: Array,
		},
		data() {
			return {
				mask: false,
				sort: [],
				index:0,
		
				childList: [
					{
						name: '全部',
						cond: true,
						index:0,
					},
					{
						name: '精品课程',
						cond: false,
						index:1,
					},
					{
						name: '活动峰会',
						cond: false,
						index:2
					}
				]
			};
		},
		onLoad() {
			this.mask = this.showMask
		
		},
		onShow() {
			
		},
		methods:{
		
			//分类查询
			sortClick(el,index){
				if(index==0){
					this.childList = this.objList
				
				}
				if(index==1){
					this.childList = this.typeList
				}
				if(!el.cond){
					this.sortClass.forEach(function(item,index,array){
						item.cond = false
					},this)
					this.mask  = false
				}
				this.index = index
				el.cond = !el.cond
				this.mask = !this.mask
				this.sort = this.sortClass
				if(index==2){
					this.mask = false
				}
				this.$emit("changSort",this.mask,this.sort,index)
			},
			//分类二级查询
			childClick(el){
				this.childList.forEach(function(item,index,array){
					item.cond = false
				},this)
				el.cond = true
				
				this.$emit("changClild",el.confContent,this.index,el.confIndex)
			},
		}
	}
</script>

<style lang="scss">
	
	.sortFlex{
		justify-content: center;
		align-items: center;
	}
	.sortClass{
		.item{
			font-size:26rpx;
			text-align: center;
			padding:10rpx 0;
			.title{
				justify-content: center;
				// color:#333333;
			}
			.colorSty{
				color:#106df7;
			}
		}
		.childList{
			font-size:24rpx;
			padding:20rpx;
			.li{
				padding:10rpx 20rpx;
				border-radius: 10rpx;
				background-color: #F5F5F5;
				margin-left:20rpx;
				margin-bottom:20rpx;
			}
			.childSty{
				background-color: #D9E9FF;
				color:#106DF7;
			}
		}
	}
</style>
