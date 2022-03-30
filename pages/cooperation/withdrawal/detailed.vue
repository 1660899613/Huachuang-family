<template>
	<view class="wrap">
		<view class="header flex-box">
			<view class="left box-1">
				<view class="title">余额明细</view>
				<view class="des">已提现金额：￥{{usedMoney}}</view>
				<view class="des">剩余可提现金额：￥{{money }}</view>
			</view>
			<view class="right" @click="$f.jump('./withdrawal')">申请提现</view>
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
			<view class="ul-list">
				<view class="li flex-box" v-for="(item,index) in record">
					<view class="left box-1">
						<view class="title">{{item.status==1?'申请中':item.status==2?'交易变动':'已通过'}}</view>
						{{item.times}}
					</view>
					<view class="right">{{item.status=='1'||item.status=='3'?'-':'+'}}{{item.changeNum }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				withdrawInfo:{},
				page:1,
				current:0,
				tabList:[{
						name: '全部',
					},{
						name: '审核中',
					},{
						name: '已通过',
					},
					{
						name: '交易变动',
					},
				],
				loadMord:true,
				money:"",
				usedMoney:"",
				record:[]
			};
		},
		onShow() {
			// this.getWithdrawInfo()
			this.page=1
			this.getBalanceInfo()
		},
		onReachBottom() {
			this.page++;
			this.getBalanceInfo();
		},
		methods:{
			
			getBalanceInfo(){
				if(!this.loadMord){
					return
				}
				let type=""
				if(this.current==3){
					type=2
				}else if(this.current==2){
					type=3
				}else{
					type=this.current
				}
				this.$u.api.getBalanceInfo({page:this.page,type}).then(res=>{
					this.money=res.data.record.money
					this.usedMoney=res.data.record.usedMoney
					this.record=this.record.concat(res.data.record.record) 
					let pageTotal=res.data.pageTotal
					if(this.record.length<pageTotal){
						this.loadMord=true
					}else {
						this.loadMord=false
					}
					
				})
			},
			
			
			// getWithdrawInfo(){
			// 	this.$u.api.getWithdrawInfo({}).then(res=>{
			// 		this.withdrawInfo=res.data.withdrawInfo
			// 		console.log("可提现金额",res)
			// 	})
			// },
			tabClick(item){
				console.log("查看",item)
				this.current = item.index
				this.page = 1
				this.record=[]
				this.loadMord=true
				this.getBalanceInfo()
				
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.wrap{
		.ul-list{
			background-color: #fff;
			.li{
				padding:20rpx;
				border-bottom:1rpx solid #eee;
				.left{
					color:#7C7C7C;
					.title{
						font-size:30rpx;
						color:#333333;
					}
				}
				.right{
					// color:#1370F7;
					font-size:34rpx;
				}
			}
		}
		.header{
			padding:20rpx;
			margin-bottom:20rpx;
			background-color: #fff;
			.left{
				.title{
					font-size:30rpx;
					margin-bottom:20rpx;
				}
				.des{
					color:#666666;
					font-size:26rpx;
				}
			}
			.right{
				width: 161rpx;
				height: 66rpx;
				line-height: 66rpx;
				background: #1370F7;
				border-radius: 33rpx;
				text-align:center;
				color:#fff;
			}
		}
	}
</style>
