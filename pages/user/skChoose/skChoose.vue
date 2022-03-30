<template>
	<view class="wrap" v-if="infor.courseName">
		<view class="header">
			<view class="title" style="padding-bottom:10rpx;">服务单号：{{infor.childCourse.orderId}}</view>
			<view class="t-box flex-box"  @click="$f.jump('/pages/courseDetails/index')">
				<view class="left">
					<u-image class="szIco"
					 radius="0"
					 :src="infor.courseImg" 
					 :lazy-load="true" width="225rpx" height="135rpx"></u-image>
				</view>
				<view class="center box-1">
					<view class="hd media_title">{{infor.childCourse.courseName}}</view>
					<view class="bd">￥{{infor.money}}</view>
					<!-- <view class="desc media_desc"></view> -->
					<view class="time flex-box">
						<view class="color">共{{infor.classCount}}门课程</view>
						<!-- <view>
							<image class="imgSty" src="@/static/ico/huo-ico.png"></image>
							<view>热销中</view>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="ul">
				<view class="li">
					<view class="th">{{infor.courseName}}</view>
					<view class="row" @click="show=true">
						<view class="title">选择期数</view>
						<view class="right box-1">
							<view class="tis" v-if="type">{{typeValue}}</view>
							<view class="tis" v-else>请选择</view>
							
						</view>
						<view class="icon">
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
					<view class="list-check list">
						<!-- <view class="title">选择期数</view> -->
						<view class="row" @tap="xytype=item.infoId" v-for="(item,index) in infor.studentInfo" :key="index">
							<view class="left">
								<radio :checked="xytype==item.infoId" color="#CBA668" />
							</view>
								<view class="center">
									{{item.name}}
									<view class="tel">{{item.phone}}</view>
								</view>
							<view class="icon" @click="$f.jump('/pages/user/skChoose/add?id='+item.infoId+'&name='+item.name+'&phone='+item.phone)">
								去修改
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
					<!-- 	<view class="row" @tap="type='2'">
							<view class="left">
								<radio :checked="type=='2'" color="#CBA668" />
							</view>
								<view class="center">
									美羊羊
									<view class="tel">18375875809</view>
								</view>
							<view class="icon">
								去修改
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view> -->
					</view>
				<!-- 	<view class="row1">
						<view class="row">
							<view class="nominal">
								学员姓名
							</view>
							<view class="input box-1">
								<input placeholder="请输入学员姓名" type="text" v-model="name" />
								
							</view>
							<view class="icon">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
						<view class="row">
							<view class="nominal">
								学员联系方式
							</view>
							<view class="input box-1">
								<input placeholder="请输入学员联系方式" type="text" v-model="tel" />
							</view>
							<view class="icon">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
					</view> -->
					<view class="addInfor" @click="$f.jump('/pages/user/skChoose/add')">+添加学员信息</view>
					<view class="addBtn btn" @click="submit">确定学员信息</view>
				</view>
			</view>
		</view>
		<u-popup :show="show" :round="10" @close="show = false" @open="show=true" :closeable="true">
			<view class="list">
				<view class="title">选择期数</view>
				<view class="row" @tap="type=item.classId;show=false;typeValue=item.classBegin+'-'+item.classEnd" v-for="(item,index) in classList" :key="index">
						<view class="center">
							{{item.classBegin}} - {{item.classEnd}}
						</view>
						<view class="right">
							<radio :checked="type==item.classId" color="#CBA668" />
						</view>
				</view>
				<!-- <view class="row" @tap="type='2'">
						<view class="center">
							{{item.classEnd}}
						</view>
						<view class="right">
							<radio :checked="type=='2'" color="#CBA668" />
						</view>
				</view> -->
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				columns: [
					['1', '2', '3']
				],
				xytype: 0,
				type: 0,
				id:null,
				infor: {},
				courseList: [],
				classList: [],
				typeValue: '',
			};
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id
			
		},
		onShow() {
			this.getCourseChooseInfo()
		},
		methods:{
			//查询订单信息 选择期数
			orderSelect(){
				this.$u.api.getCourseClass({
						courseId:this.infor.childCourse.courseId
					}).then(res=>{
					console.log(res.data.classList,'data')
					this.classList = res.data.classList
					// this.infor.coursePackage = 2
				})
			},
			//获取信息
			getCourseChooseInfo(){
				uni.showLoading({
				    title: '加载中'
				});
				this.$u.api.getCourseChooseInfo({
						id:this.id
					}).then(res=>{
					console.log(res,'data')
					this.infor = res.data.info
					// this.infor.coursePackage = 2
					this.orderSelect()
					uni.hideLoading();
				})
			},
			submit(){
				if(!this.xytype){
					this.$u.toast('请选择学员信息')
					return false
				}
				if(!this.type){
					this.$u.toast('请选择期数')
					return false
				}
				this.$u.api.choseCourseClass({
						orderId:this.infor.childCourse.orderId,
						infoId: this.xytype,
						classId: this.type
					}).then(res=>{
					console.log(res,'data 确认信息')
					uni.navigateBack()
					// this.infor.coursePackage = 2
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.wrap{
		.list{
			width: 100%;
			border-bottom: solid 1upx #eee;
			padding:20rpx;
			box-sizing: border-box;
			.title{
				color:#333333;
				font-size:32rpx;
				text-align: center;
				padding:20rpx;
				padding-top:0;
			}
			.row{
				width: 100%;
				height: 100upx;
				display: flex;
				align-items: center;
				.left{
					width: 65rpx;
					flex-shrink: 0;
					display: flex;
					align-items: center;
					image{
						width: 80upx;
						height: 80upx;
					}
				}
				.center{
					width: 100%;
					font-size: 30upx;
					text-align: left;
					color:#333;
					.tel{
						color:#999999;
						font-size:24rpx;
					}
				}
				.icon{
					flex-shrink: 0;
					display: flex;
					justify-content: flex-end;
					color:#999;
				}
				.right{
					width: 80upx;
					flex-shrink: 0;
					display: flex;
					justify-content: flex-end;
				}
			}
		}
		.content{
			.ul{
				.li{
					margin-top:20rpx;
					background-color: white;
					padding:20rpx;
					.th{
						font-size:30rpx;
					}
					.addInfor{
						color:#CBA668 ;
						font-size:26rpx;
						padding:20rpx 0;
						text-align: center;
					}
					.btn{
						width: 700rpx;
						height: 90rpx;
						line-height:90rpx;
						background: #CBA668;
						border-radius: 15rpx;
						color:#fff;
						text-align: center;
					}
					.addBtn{
						
					}
					.row1{
						background-color: #fff;
						// display: flex;
						// flex-wrap: wrap;
						.row{
							justify-content: space-between;
						}
						view{
							display: flex;
						}
						.input{
							text-align: right;
							input{
								width:100%;
							}
						}
						// padding:20rpx;
					}
				}
			}
		}
		
		.header{
			padding:20rpx;
			background-color: #fff;
			.t-box{
				border-top:1rpx solid #eee;
				border-bottom:1rpx solid #eee;
				padding:20rpx 0;
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
				
		}
		.row{
			widows: 100%;
			min-height: 90upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: solid 1upx #eee;
			&:last-child{
				border-bottom: none;
			}
			.title{
				// font-size: 32upx;
				color: #333;
			}
			.right{
				display: flex;
				align-items: center;
				color: #999;
				text-align: right;
				justify-content: flex-end;
				.tis{
					// font-size: 26upx;
					margin-right: 5upx;
					max-height: 120upx;
					text-align: right;
					image{
						width: 100upx;
						height: 100upx;
						border-radius: 100%;
						margin: 10upx 0;
					}
				}
				.icon{
					width: 40upx;
					color: #cecece;
				}
			}
			
		}
		
	}
</style>
