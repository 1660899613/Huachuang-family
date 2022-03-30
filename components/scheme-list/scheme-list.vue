<template>
	<view>
		<view class="ul">
			 <!-- v-if="current==10?true:(current==item.orderStatus)" -->
			<view class="li " v-for="(item,index) in list" :key="index">
				<view class="t-title ">
					<view class="flex-box t-1">
						<view class="dec box-1">服务单号：{{item.orderId}}</view>
						<view class="dec-r">
							<text class="state1" v-if="item.orderStatus==0&&item.isRetrain==1">复训待支付</text>
							<text class="state1" v-if="item.orderStatus==0&&item.isRetrain==0">待支付</text>
							<text class="state1" v-if="item.orderStatus==1">已支付</text>
							<text class="state1" v-if="item.coursePackage==1&&item.orderStatus==2">待选课</text>
							<text class="state1" v-if="item.orderStatus==3">学习中</text>
							<text class="state3" v-if="item.orderStatus==4">已完成</text>
							<text class="state1" v-if="item.orderStatus==5">退款申请中</text>
							<text class="state1" v-if="item.orderStatus==6">已退款</text>
							<text class="state1" v-if="item.orderStatus==7">复训待收费</text>
							<!-- <text class="state3">已完成</text> -->
							<text class="state2" 
							v-if="item.coursePackage==2&&item.orderStatus==2" 
							@click="$f.jump('/pages/user/skChoose/skChoose?id='+item.orderId)">选上课时间</text>
						</view>
						
					</view>
					<view class="td-title">{{item.courseName}}</view>
				</view>
				<view class="childBox"  v-if="item.coursePackage==1">
					<view  v-for="(it,indexd) in item.packageClasses" :key="indexd">
						<view class="t-title ">
							<view class="flex-box t-1" style="padding-top:10px">
								<view class="dec box-1">子服务单号：{{it.orderId}}</view>
								<view class="dec-r">
									<!-- <text class="state1">待支付</text> -->
									<text class="state2" 
									@click="$f.jump('/pages/user/skChoose/skChoose?id='+it.orderId)"
									 v-if="it.orderStatus==2">选上课时间</text>
								</view>
							</view>
						</view>
						
						<view class="t-box flex-box"  @click="$f.jump('/pages/courseDetails/index?id='+item.courseId)">
							<view class="left">
								<u-image class="szIco"
								 radius="5"
								 :src="it.courseImg" 
								 :lazy-load="true" width="225rpx" height="135rpx"></u-image>
							</view>
							<view class="center box-1">
								<view class="hd media_title">{{it.courseName}}</view>
								<view class="bd">￥{{it.courseMoney}}</view>
								<!-- <view class="desc media_desc"></view> -->
							<!-- 	<view class="time flex-box">
									<view class="color">8w人报名</view>
									<view>
										<image class="imgSty" src="@/static/ico/huo-ico.png"></image>
										<view>热销中</view>
									</view>
								</view> -->
							</view>
						</view>
					</view>
					<view class="d-btn flex-box">
						<button class="text-btn text-1" hover-class='none' @click="cencelOrder(item.orderId,index)" v-if="item.orderStatus==0">取消订单</button>
						<button class="text-btn text-1" open-type="contact" hover-class='none' v-if="item.orderStatus!=0">联系客服</button>
						<button class="text-btn text-2" hover-class='none' v-if="item.orderStatus==1">已完成支付</button>
						<!-- <button class="text-btn text-3" hover-class='none'
						 @click="$f.jump('/pages/refund/refund?id='+item.orderId+'&orderStatus='+item.orderStatus)" 
						 v-if="item.orderStatus==2">申请退款</button> -->
						<button class="text-btn text-3" hover-class='none' @click="phoneCall" v-if="item.orderStatus==2">联系客服</button>
						<button class="text-btn text-3" hover-class='none'
						 @click="$f.jump('/pages/pay/payOrder?orderId='+item.orderId+'&orderStatus='+item.isRetrain)" 
						 v-if="item.orderStatus==0">去支付</button>
					</view>
				</view>
				<view class="oneBox" v-else>
					
					<view class="t-box flex-box" @click="$f.jump('/pages/courseDetails/index?id='+item.courseId)">
						<view class="left">
							<u-image class="szIco"
							 radius="5"
							 :src="item.courseImg" 
							 :lazy-load="true" width="225rpx" height="135rpx"></u-image>
						</view>
						<view class="center box-1">
							<view class="hd media_title">{{item.courseName}}</view>
							<view class="bd">￥{{item.courseMoney}}</view>
							<!-- <view class="desc media_desc"></view> -->
						<!-- 	<view class="time flex-box">
								<view class="color">8w人报名</view>
								<view>
									<image class="imgSty" src="@/static/ico/huo-ico.png"></image>
									<view>热销中</view>
								</view>
							</view> -->
						</view>
					</view>
					<view class="d-btn flex-box">
						<button class="text-btn text-1" @click="cencelOrder(item.orderId,index)" hover-class='none' v-if="item.orderStatus==0">取消订单</button>
						<button class="text-btn text-1" open-type="contact" hover-class='none' v-if="item.orderStatus!=0">联系客服</button>
						<button class="text-btn text-2" hover-class='none' v-if="item.orderStatus==1">已完成支付</button>
						<!-- <button class="text-btn text-3" hover-class='none'
						 @click="$f.jump('/pages/refund/refund?orderId='+item.orderId+'&orderStatus='+item.orderStatus)" 
						 v-if="item.orderStatus==2">申请退款</button> -->
						 <button class="text-btn text-3" hover-class='none' @click="phoneCall" v-if="item.orderStatus==2">联系客服</button>
						<button class="text-btn text-3" hover-class='none'
						 @click="$f.jump('/pages/pay/payOrder?orderId='+item.orderId+'&orderStatus='+item.isRetrain)"
						  v-if="item.orderStatus==0">去支付</button>
					</view>
				</view>
				
				
			</view>
		</view>
		<block v-if="!list.length">
			<u-empty text="暂无数据" mode="favor"></u-empty>
		</block>
		<!-- 加载状态 -->
	<!-- 	<block v-if="loadStatus != 'none'">
			<block v-if="list.length > 0">
				<view style="padding: 30rpx;">
					<u-loadmore loadingIcon="semicircle" :icon="true" :status="loadStatus"  />
				</view>
			</block>
		
		</block> -->
		<u-modal :show="show" :showConfirmButton="true" @confirm="confirm" :showCancelButton="true" @cancel="show=false" :title="title" :content='content'></u-modal>
	</view>
</template>

<script>
	export default {
		name:"assets-list",
		props: {
			list: Array,
			loadStatus: String,
			current: Number
		},
		data() {
			return {
				title:'取消订单',
				content: '是否取消订单',
				show:false,
				orderId:'',
				orderIndex:null,
			};
		},
		methods:{
			phoneCall(){
				this.$H.post("/user/getServerPhone ").then(res => {
					uni.makePhoneCall({
					    phoneNumber: res.data.phone.toString()//仅为示例
					});
				}).catch(err=>{
					console.log(err);
					this.$u.toast('客服电话获取失败，请稍后再试')
				})
				
			},
			cencelOrder(orderId,index){
				this.show = true
				this.orderId = orderId
				this.orderIndex = index
			},
			confirm() {
				this.$u.api.cancelOrder({
					id:this.orderId
					}).then(res=>{
					console.log(res,'data')
					this.show = false
					this.$u.toast('删除成功')
					this.$emit("changeCencel",this.orderIndex)
				})
			}
		},
		onShow() {
			console.log(this.list)
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.text-btn{
		background-color: transparent;
		font-size:26rpx;
		padding:0;
		margin:0;
		color:#666;
	}
	.childBox{
		.d-btn{
			margin-bottom:20rpx;
		}
	}
	button::after {
	  border: none;
	  
	}
	.ul{
		background-color: #f5f5f5;
		padding:20rpx;
		.li{
			padding:20rpx 30rpx;
			border-radius: 10rpx;
			align-items: center;
			// border-bottom:1rpx solid #eee;
			background-color: #ffffff;
			margin-bottom:20rpx;
			box-shadow:0px 0px  10px 5px #eee;
			.t-box{
				border-top:1rpx solid #eee;
				border-bottom:1rpx solid #eee;
				padding:20rpx 0;
			}
			.t-title{
				margin-bottom:20rpx;
				.t-1{
					.dec{
						font-size:24rpx;
						color:#000;
					}
					.dec-r{
						.state1{
							color:#FF4D4D;
							display: inline-block;
						}
						.state3{
							color:#333;
						}
						.state2{
							display: inline-block;
							height: 58rpx;
							line-height:58rpx;
							padding:0 20rpx;
							// height: 44rpx;
							background: #CBA668;
							border-radius: 10rpx;
							font-size:24rpx;
							color:#fff;
						}
					}
				}
			}
			.d-btn{
				padding:20rpx 0;
				padding-bottom:0;
				justify-content: flex-end;
				font-size:24rpx;
				.text-btn{
					margin-left:20rpx;
				}
				.text-1{
					width: 160rpx;
					height: 58rpx;
					line-height:58rpx;
					background: #FFFFFF;
					border: 1rpx solid #1370F7;
					border-radius: 10rpx;
					font-size:24rpx;
				}
				.text-2{
					width: 160rpx;
					height: 58rpx;
					line-height:58rpx;
					background: #CBA668;
					border-radius: 10rpx;
					color:#fff;
					font-size:24rpx;
				}
				.text-3{
					width: 160rpx;
					height: 58rpx;
					line-height:58rpx;
					background: linear-gradient(90deg, #1370F7 0%, #3484F8 100%);
					border-radius: 10rpx;
					color:#fff;
					font-size:24rpx;
				}
			}
			.td-title{
				font-size:30rpx;
				color:#333333;
			}
			.left{
				
			}
			.center{
				margin-left: 20rpx;
				.hd{
					font-size:28rpx;
				}
				.bd{
					font-size:30rpx;
					color:#333333;
					margin-top:20rpx;
				}
				.desc{
					font-size:24rpx;
					margin:15rpx 0;
					color:#666666;
				}
				.time{
					align-items: center;
					text-align: center;
					justify-content: space-between;
					color:#FF4D4D;
					font-size:24rpx;
					.color{
						color:#999999;
					}
					.imgSty{
						width:30rpx;
						height:27rpx;
					}
				}
			}
		}
		.li:last-child{
			margin:0;
		}
	}
</style>
