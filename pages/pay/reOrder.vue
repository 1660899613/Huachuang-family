<template>
	<view class="wrap" >
		<view class="ul">
			<view class="li flex-box">
				<view class="left">
					<u-image class="szIco"
					 radius="3"
					 :src="infor.courseImg" 
					 :lazy-load="true" width="230rpx" height="150rpx"></u-image>
				</view>
				<view class="right box-1">
					<view class="title">{{infor.courseName}}</view>
					<view class="other flex-box">
						<view class="l-text box-1">
							<view class="">￥{{infor.courseMoney}}</view>
							<view class="desc">共{{infor.courseCount}}门课程</view>
						</view>
						<!-- <view class="r-text">
							<u-number-box :min="1" v-model="value" @change="valChange"></u-number-box>
						</view> -->
					</view>
				</view>
			</view>
			<view class="otherList">
				<view class="oi flex-box">
					<view class="left box-1">教材费</view> {{infor.bookCost}}
				</view>
				<view class="oi flex-box">
					<view class="left box-1">学杂费</view> {{infor.otherCost}}
				</view>
				<view class="oi flex-box">
					<view class="left box-1">应付</view>
					<text class="sty">￥{{infor.bookCost+infor.otherCost}}</text>
				</view>
			</view>
			<view class="smInfor">
				<view class="title">特别说明</view>
				<view>1、教材费为学习过程中使用的书籍、教案、工具手册、电子材料等； </view>
				<view>2、学杂费包含场地费、茶歇、笔、笔记本、证件证书等杂费。 </view>
				<view>3、本班级住宿和交通费自理。</view>
			</view>
			<!-- <view class="payMoney">应付：</view> -->
		</view>
		<view class="footer" @click="submitBuy">立即支付</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 1,
				id: null,
				infor: {},
				customer_id: '',
				infor:{},
				userInfo: {},
				fddInfo: {},
				orderInfo: {}
			};
		},
		onLoad(option) {
			this.id = option.id
			this.orderSelect();
		},
		onShow(){
			// this.getUserInfo()
		},
		methods:{
			getUserInfo(){
				this.$u.api.getUserInfo({
					}).then(res=>{
					this.userInfo = res.data.userInfo
					this.fddInfo = res.data.fddInfo
					console.log(this.fddInfo,this.userInfo,'用户信息')
				})
			},
			orderSelect(){
				this.$u.api.orderSelect({
						ycy:3,
						orderId:this.id
					}).then(res=>{
					console.log(res,'data')
					this.infor = res.data.orderId
				})
			},
			submitBuy(){
				this.$f.jump('/pages/pay/payOrder?orderId='+this.id+'&orderStatus='+7)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.wrap{
		.smInfor{
			padding:30rpx;
			font-size:24rpx;
			color:#666666;
			line-height:2;
		}
		.otherList{
			background-color: #fff;
			margin-top:30rpx;
			padding:0 20rpx;
			.oi{
				padding:20rpx;
				border-bottom:1rpx solid #eee;
			}
			.ol:last-child{
				border:none;
			}
		}
		.footer{
			position:fixed;
			bottom:20rpx;
			left:20rpx;
			width:710rpx;
			height:100rpx;
			line-height:100rpx;
			border-radius: 10rpx;
			text-align: center;
			color:#fff;
			background: #CBA668;
		}
		.ul{
			color:#333333;
			.li{
				background-color: #fff;
				padding:20rpx;
				.left{
					width:230rpx;
					height:150rpx;
				}
				.right{
					margin-left:20rpx;
					.title{
						
					}
					.other{
						font-size:28rpx;
						margin-top:20rpx;
						.desc{
							font-size:24rpx;
							color:#999;
						}
					}
				}
			}
			.payMoney{
				background-color: #fff;
				text-align: right;
				padding:20rpx;
				.sty{
					font-size:34rpx;
					color:#FF4D4D;
				}
			}
		}
	}
</style>
