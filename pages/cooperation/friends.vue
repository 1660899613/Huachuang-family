<template>
	<view class="wrap">
		
		<view class="list-ul">
			
			<view class="li li-4 ">
				<view class="td flex-box">
					<view class="left box-1" >
						<view class="border-box "  :class="istype==1?'b-active':'c-active'" >
							<view class="td">{{teamInviteCount}}</view>
							团队推荐总次 
						</view>
						
					</view>
					<view class="left box-1">
						<view class="border-box ">
							<view class="td">{{teamCustomerCount }}</view>
							团队总客户数
						</view>
					</view>
					<view class="left box-1">
						<view class="border-box ">
							<view class="td">{{teamAchievement  }}</view>
							团队总业绩
						</view>
					</view>
				</view>
				<view class="otherLi flex-box">
					<view class="left box-1 flex-box">
						团队成员 {{teamNum}}
					</view>
					<view class="left box-1 flex-box" @click="order('1')">
						推荐次数<u-icon :name="type==1?'arrow-up':'arrow-down'"></u-icon>
					</view>
					<view class="left box-1 flex-box" @click="order('2')">
						客户数量<u-icon :name="type==2?'arrow-up':'arrow-down'"></u-icon>
					</view>
					<view class="left box-1 flex-box" @click="order('3')">
						个人业绩<u-icon :name="type==3?'arrow-up':'arrow-down'"></u-icon>
					</view>
				</view>
				<view class="firends">
					<view class="firends_box" v-for="(item,index) in record " :key="index">
						<view class="name">
							<u-avatar :src="item.userImg"
							 size="58rpx" 
							 :default-url="'https://img.alicdn.com/imgextra/i4/1650780431/O1CN01kCrTjA1F3RRa8gnkx_!!1650780431.png'" 
							 shape="circle"></u-avatar>
							 <span>{{item.userName }}</span>
							 <u-tag v-if="item.isSelf==1" text="我" plain size="mini" type="warning"></u-tag>
						</view>
						<view class="">{{item.inviteCount }}</view>
						<view class="">{{item.customerCount }}</view>
						<view class="">
							{{item.achievement }}
						</view>
					</view>
					
				
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				type:'',
				achievement:"2",//按业绩排序 1 升序 2 降序
				customerCount:"2",//按客户数量排序 1 升序 2 降序
				inviteCount:"2",//按邀请次数排序 1 升序 2 降序
				page:"1",
				loadMord:true,
				record:[],
				teamAchievement:"",
				teamCustomerCount:"",
				teamInviteCount:"",
				teamNum:"",
				istype:''
			};
		},
		onLoad(option) {
			this.istype=option.istype
			this.getTeamMember()
		},
		onReachBottom() {
			this.page++;
			this.getTeamMember();
		},
		methods:{
			
			
			order(value){
				if(this.type==value){
					this.type=""
					this.achievement="2"//按业绩排序 1 升序 2 降序
					this.customerCount="2"//按客户数量排序 1 升序 2 降序
					this.inviteCount="2"//按邀请次数排序 1 升序 2 降序
					
				}else{
					this.type=value
					if(this.type==1){
						this.inviteCount=1
						this.achievement="2"
						this.customerCount="2"
					}
					if(this.type==2){
						this.customerCount=1
						this.achievement="2"
						this.inviteCount="2"
					}
					if(this.type==3){
						this.achievement=1
						this.customerCount=2
						this.inviteCount=2
					}	
				}
				
				this.record=[]
				this.page=1
				this.loadMord=true
				this.getTeamMember()
				
			},
			getTeamMember(){
				console.log("11")
				if(!this.loadMord){
					return
				}
				
				let params={
					achievement:this.achievement,//按业绩排序 1 升序 2 降序
					customerCount:this.customerCount,//按客户数量排序 1 升序 2 降序
					inviteCount:this.inviteCount,//按邀请次数排序 1 升序 2 降序
					page:this.page,
					
				}
				
				this.$u.api.getTeamMember(params).then(res=>{
					this.teamAchievement=res.data.record.teamAchievement
					this.teamInviteCount=res.data.record.teamInviteCount
					this.teamNum=res.data.record.teamNum 
					this.teamCustomerCount=res.data.record.teamCustomerCount 
					this.record=this.record.concat(res.data.record.memberInfos) 
					let pageTotal=res.data.pageTotal
					if(this.record.length<pageTotal){
						this.loadMord=true
					}else {
						this.loadMord=false
					}
					
				})
			},
		}
	}
</script>

<style lang="scss">
	
	page{
		
		// background-color: #f5f5f5;
		.wrap{
			.list-ul{
				// position:relative;
				// top:-100rpx;
				// padding:20rpx;
				z-index: 99;
				.otherLi{
					background-color: #f5f5f5;
					padding:20rpx;
					justify-content: center;
					text-align: center;
					font-size:24rpx;
					.box-1{
						text-align: center;
						justify-content: center;
					}
				}
				.td-list{
					.li{
						padding:20rpx 30rpx;
						.center{
							font-size:24rpx;
						}
						.right{
							font-size:28rpx;
						}
						border-bottom:1rpx solid #eee;
					}
				}
				.li{
					margin-top:20rpx;
					// padding:20rpx;
					// background-color: #fff;
					border-radius: 10rpx;
					.center{
						margin:0 20rpx;
					}
				}
				.li-1{
					color:#5F80FF;
					.left{
						font-size:32rpx;
						display: flex;
						align-items: center;
						width: 200rpx;
					}
					.center{
						text-align: right;
						font-size:40rpx;
					}
				}
				.li-2{
					font-size:30rpx;
				}
				.li-3{
					color:#6F6F6F;
					.box-1{
						padding:0 25rpx;
						text-align: center;
						font-size:26rpx;
						.td{
							color:#333333;
							font-size:34rpx;
						}
					}
				}
				.li-4{
					
					
					
					.td{
						color:#6F6F6F;
						.box-1{
							padding:0 20rpx;
							text-align: center;
							font-size:22rpx;
							.td{
								color:#333333;
							}
							.b-active{
								border-bottom:2rpx solid #1577FF;
							}
							.c-active{
								border-bottom:2rpx solid #5333A3;
							}
							.border-box{
								padding-bottom:10rpx;
							}
						}
					}
				}
			}
			.header{
				position:relative;
				.hd-box{
					width:750rpx;
					height:295rpx;
					position: absolute;
					top:0;
					left:0;
					width:100%;
					box-sizing: border-box;
					color:#fff;
					padding:20rpx;
					.r-rule{
						text-align: right;
					}
					.h-infor{
						.center{
							margin:0 20rpx;
							.c-title{
								font-size:34rpx;
							}
							.c-yqm{
								font-size:24rpx;
								margin-top:20rpx;
							}
						}
						.right{
							color:#5F80FF;
							background-color: #fff;
							padding:5rpx 20rpx;
							border-radius: 30rpx;
							text-align: center;
							font-size:22rpx;
						}
					}
				}
				
			}
		}
	}
	
	
	.firends{
		
		.firends_box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			text-align: center;
			border-bottom:1rpx solid #eee;
			.name{
				display: flex;
				align-items: center;
				
			}
		}
	}
</style>
