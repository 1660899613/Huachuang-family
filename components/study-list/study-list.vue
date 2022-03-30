<template>
	<view>
		<view class="ul">
			<view class="li" v-for="(item,index) in list" :key="index" @click="$f.jump('/pages/courseDetails/index?id='+item.courseId)">
				<block v-if="!item.childCourse.length">
					<view class="flex-box">
						<view class="left">
							<u-image class="szIco"
							 radius="5"
							 :src="item.courseImg" 
							 :lazy-load="true" width="180rpx" height="110rpx"></u-image>
						</view>
						<view class="center box-1">
							<view class="hd media_title">{{item.courseName}}</view>
							<view class="bd flex-box">
								<view class="icoBox">
									<u-image src="@/static/ico/dz-ico.png" :lazy-load="true" width="21rpx" height="21rpx"></u-image> 
								</view>
								
								{{item.classCity}}</view>
							<!-- <view class="desc media_desc"></view> -->
							<view class="time ">
								<view class="color">
									第{{item.classTerm}}期 {{item.classTime[0].classBegin}} - {{item.classTime[0].classEnd}}{{item.classCity}}
								</view>
								
								<view class="flex-box" style="margin-top:20rpx;justify-content: flex-end;">
									<view class="rt-sty" v-if="item.learnStatus==1||item.learnStatus==0"
									 @click.stop="$f.jump('/pages/user/siginCode/siginCode?id='+item.classId)" >
										签到码
									</view>
									
									<view class="rt-sty"
									 v-if="item.learnStatus==0" 
									  @click.stop="$f.jump('/pages/user/skChoose/skChoose?id='+item.orderId)">
										修改期数
									</view>
									<view class="rt-sty" v-if="item.learnStatus==2&&item.retrain==1&&item.status==2"
									@click.stop="$f.jump('/pages/user/skChoose/repeat?id='+item.classId+'&orderId='+item.orderId+'&courseId='+item.courseId)">
										申请复训
									</view>
								</view>
								
							</view>
							
						</view>
					</view>
					<view class="btn-style"  v-if="item.learnStatus==0&&item.status==0">待上课</view>
					<view class="btn-style"  v-if="item.retrain==1&&item.status==3">复训申请中</view>
					<view class="btn-style"  v-if="item.retrain==1&&item.status==4||item.status==5">复训中</view>
					<view class="btn-style btn-style-end"  v-if="item.learnStatus==2">已完成</view>
				</block>
				<block v-else>
					<view>
						<view class="flex-box" style="align-items: flex-start;" @click.stop="openItem(index)">
							<view class="left">
								<u-image class="szIco"
								 radius="5"
								 :src="item.courseImg" 
								 :lazy-load="true" width="180rpx" height="110rpx"></u-image>
							</view>
							<view class="center box-1">
								<view class="hd media_title">{{item.courseName}}</view>
								<view class="time flex-box">
									<view class="color box-1"></view>
									<view>
										<u-icon name="arrow-down" v-if="!item.cond" color="#aaa"></u-icon>
										<u-icon name="arrow-up" color="#106df7" v-else></u-icon>
									</view>
								</view>
							</view>
						</view>
						<view class="bm" v-if="item.cond">
							<view class="hang flex-box" v-for="(it,i) in item.childCourse">
								<view class="left">
									<u-image class="szIco"
									 radius="5"
									 :src="it.courseImg" 
									 :lazy-load="true" width="180rpx" height="110rpx"></u-image>
								</view>
								<view class="center box-1">
									<view class="hd flex-box">
										<view class=" media_title box-1">{{it.courseName}}</view>
										<view class="fxDesc" v-if="it.retrain" style="color:#CBA668;font-size:24rpx;">已复训{{it.retrain}}次</view>
									</view>
									<view class="time flex-box" style="margin-top:20rpx;">
										<view class="color box-1">名额{{it.quota}}</view>
										<view v-if="it.learnTimes" style="color:#999;">
											已完成学习{{it.learnTimes}}次
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 加载状态 -->
		<block v-if="loadStatus != 'none'">
			<block v-if="list.length > 0">
				<view style="padding: 30rpx;">
					<!-- <u-loadmore loadingIcon="semicircle" :icon="true" :status="loadStatus"  /> -->
				</view>
			</block>
			<block v-else>
				<u-empty text="暂无数据" mode="favor"></u-empty>
			</block>
		</block>
	</view>
</template>

<script>
	export default {
		name:"assets-list",
		props: {
			list: Array,
			loadStatus: String
		},
		data() {
			return {
				
			};
		},
		onShow() {
			
		},
		methods:{
			openItem(index){
				// item.cond = !item.cond
				this.$emit('changeopenItem',index)
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.bm{
		.hang{
			padding:20rpx 30rpx;
			align-items: flex-start;
			border-bottom:1rpx solid #eee;
		}
		.hang:last-child{
			padding-bottom:0;
			border:0;
		}
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
			.btn-style{
				width: 654rpx;
				height: 58rpx;
				line-height: 58rpx;
				background: #DEEBFF;
				border-radius: 29px;
				text-align: center;
				margin:20rpx auto;
				color:#106DF7;
			}
			.btn-style-end{
				background: #E9EAEA;
				color:#999999;
			}
			.left{
				
			}
			.center{
				margin-left: 20rpx;
				.hd{
					// font-size:32rpx;
				}
				.bd{
					font-size:24rpx;
					margin-top:20rpx;
					.icoBox{
						margin-right:15rpx;
					}
				}
				.desc{
					font-size:24rpx;
					margin:15rpx 0;
					color:#666666;
				}
				.time{
					align-items: center;
					text-align: left;
					justify-content: flex-start;
					color:#FF4D4D;
					font-size:24rpx;
					
					.color{
						color:#999999;
					}
					.rt-sty{
						font-size:22rpx;
						color:#106DF7;
						padding:5rpx 20rpx;
						min-width:80rpx;
						margin-left:10rpx;
						background-color: #DEEBFF;
						border:1rpx solid #106DF7;
						border-radius: 30rpx;
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
