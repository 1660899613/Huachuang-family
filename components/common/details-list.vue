<template>
	<view class="wrap">
		<view class="details" v-if="current==0">
			
			<u-parse :content="infor.courseInfo"></u-parse>
		</view>
		<view class="tcWrap" v-if="current==1">
			<!-- coursePackage 套餐 1 套餐 2 课程 -->
			<view class="ul" v-if="infor.coursePackage==1">
				<view class="li"  v-for="(item,index) in tcList" :key="index">
					<view class="tp flex-box" @click="maskShow = true">
						<view class="left">
							<u-image class="szIco"
							 radius="5"
							 :src="item.courseImg" 
							 :lazy-load="true" width="225rpx" height="135rpx"></u-image>
						</view>
						<view class="center box-1">
							<view class="hd media_title">{{item.courseName}}</view>
							<view class="time flex-box">
								<view class="color box-1">名额{{item.restNum}}</view>
								<view @click="openItem(index)">
									<u-icon name="arrow-down" v-if="!item.show" color="#aaa"></u-icon>
									<u-icon name="arrow-up" color="#106df7" v-else></u-icon>
								</view>
							</view>
						</view>
					</view>
					
					
					<view class="jianjie" v-if="item.cond">
						<u-image class="szIco"
						 radius="5"
						 :src="item.courseImg" 
						 :lazy-load="true" width="100%" height="260rpx"></u-image>
						 
						 <view class="courseBrief">
						 	{{item.courseBrief}}
						 </view>
					</view>
				</view>
					
			</view>
			<view class="ul" v-if="infor.coursePackage==2">
				
				<view class="li" >
					<view class="tp flex-box" >
						<view class="left">
							<u-image class="szIco"
							 radius="5"
							 :src="infor.courseImg" 
							 :lazy-load="true" width="225rpx" height="135rpx"></u-image>
						</view>
						<view class="center box-1">
							<view class="hd media_title">{{infor.courseName}}</view>
							<view class="time flex-box">
								<view class="color box-1">￥{{infor.courseMoney}}</view>
								<view @click="showClass">
									<u-icon name="arrow-down" v-if="!show" color="#aaa"></u-icon>
									<u-icon name="arrow-up" color="#106df7" v-else></u-icon>
								</view>
							</view>
						</view>
					</view>
					<view class="bm" v-show="show" v-for="(item,index) in tcList"  :key="index"  >
						<view class="hang flex-box">
							<view class="left box-1">
								<text class="le-t">第{{item.classTerm}}期</text>
								{{item.classBegin}}-{{item.classEnd}}
							</view>
							<view class="right tab1">热报中</view>
						</view>
					</view>
				</view>
			</view>
			
			
			
		</view>
		<view class="mlWrap" v-if="current==2">
			<view class="labelText">
				<view class="navli" v-for="(item,index) in jcList" :key="index" @click="mlLiClick(item,index)" :class="item.cond?'liActive':''">
					<view class="title">
						{{item.title}}
					</view>
				</view>
				<view class="mlContent" v-if="!mlCurr">
					<view class="ul flex-box">
						<view class="li" v-for="(item,index) in videoShowList" :key="index">
							<video
							  poster="https://img.alicdn.com/imgextra/i4/1650780431/O1CN01kCrTjA1F3RRa8gnkx_!!1650780431.png"
							  class="video-box"
							  :id="'myVideo' + index"
							  src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
							  @play="statusChange(index)"
							  @fullscreenchange="fullscreenchange"
							  enable-danmu danmu-btn controls
							  >
							  </video>
						</view>
						<view class="li">
							<video
								poster="https://img.alicdn.com/imgextra/i4/1650780431/O1CN01kCrTjA1F3RRa8gnkx_!!1650780431.png"
								class="video-box"
								id="myVideo999"
								src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
								@play="statusChange(999)"
								@fullscreenchange="fullscreenchange"
								enable-danmu danmu-btn controls
						></video>
						</view>
						
					</view>
				</view>
				<view class="mlContent" v-else>
					<view class="ul flex-box">
						<view class="li" v-for="(item,index) in imgShowList" :key="index">
							<u-image class="szIco"
							 radius="5"
							 :src="item" 
							 :lazy-load="true" width="340rpx" height="250rpx"></u-image>
						</view>
					</view>
				</view>
			</view>
		</view>
	
		<view class="masking flexac" v-if="maskShow" @click="maskShow = false">
			 <view class="maskBox bor_radius_20" @click.stop>
				 测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容
				 测试内容人人人呢人内容内容你人内容内容
				 测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容测试内容人人人呢人内容内容你人内容内容
			 </view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"nav-list",
		props: {
			current:String,
			tcList: Array,
			showMask: Boolean,
			infor: Object,
			bannerList: Array,
		
		},
		data() {
			return {
				videoContext:null,
				isContent: false,
				mlCurr: 0,
				jcList: [
					{title:'视频',cond: true},{title:'图片',cond: false}
				],
				imgShowList: [],
				videoShowList: [],
				show:false,
					maskShow:false,
			};
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			statusChange(index){
				console.log('开始播放');
				this.videoContext = uni.createVideoContext(`myVideo${index}`,this);
				this.videoContext.requestFullScreen({
					direction:90
				});
			},
			fullscreenchange(e){
				console.log('e:',e);
				this.$nextTick(()=>{
					if(!e.detail.fullScreen){
						//退出全屏使触发
						console.log('退出全屏');
						this.videoContext.pause();
					}
				})
				
			},
			//影藏班级排期
			showClass(){
				this.show=!this.show
			},
			openItem(index){
				// item.cond = !item.cond
				this.$emit('changeopenItem',index)
			},
			//视频图片
			mlLiClick(el,index){
				this.jcList.forEach(function(item,index,array){
					item.cond = false
				},this)
				el.cond = true
				this.mlCurr = index
				this.getCourseShow()
				if(this.mlCurr){
					//图片
					
				}else{
					//视频
				
				}
			},
			getCourseShow(){
				this.$u.api.getCourseShow({
						id:this.infor.courseId
					}).then(res=>{
					console.log(res,'精彩集锦')
					this.videoShowList  = res.data.videoShowList 
					this.imgShowList  = res.data.imgShowList 
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.maskBox{
		width:650rpx;
		max-height: 74%;
		background: #FFFFFF;
		overflow: scroll;
	}
	.overLay-box{
		width:90%;
		height:80vh;
		background-color: #fff;
		margin-top:5vh;
		margin-left:5%;
		border-radius: 10rpx;
	}
	.jianjie{
		padding: 20rpx;
		font-size: 30rpx;
		color: #333333;
		.courseBrief{
			margin-top: 20rpx;
		}
		
	}
	.courseDetails{
		.content{
			// min-height:500rpx;
			margin-top:20rpx;
			padding-bottom:130rpx;
			.wrap{
				background-color: white;
				padding:20rpx;
			}
		}
		
	}
	.header{
		.hdeader{
			background-color: #fff;
			padding:25rpx;
			text-align: left;
			.title{
				font-size:34rpx;
				.img-box{
					font-size:22rpx;
					text-align: center;
					color:#666666;
					.imgSty{
						width:30rpx;
						height:27rpx;
					}
				}
			}
			.desc{
				font-size:26rpx;
				color:#666666;
				margin:10rpx auto;
			}
			.bdSty{
				font-size:34rpx;
				color:#B7945D;
				.text{
					font-size:22rpx;
					color:#666666;
				}
			}
		}
	}
	.wrap{
		padding-bottom:120rpx;
	}
	.mlWrap{
		.navli{
			display: inline-block;
			margin-right:20rpx;
			font-size:26rpx;
		}
		.mlContent{
			.ul{
				flex-wrap: wrap;
				justify-content: space-between;
				.li{
					width: 345rpx;
					margin-top:20rpx;
					.video-box{
						width:340rpx;
						height:260rpx;
					}
				}
			}
		}
		.liActive{
			background: #106DF7;
			border-radius: 25rpx;
			padding:5rpx 20rpx;
			color:#fff;
			
		}
	}
	.tcWrap{
		.ul{
			.li{
				box-shadow:0px 0px  10px 5px #eee;
				.bm{
					border-top: 1rpx solid #eee;
					background-color: white;
					text-align: center;
					padding:20rpx;
					.img-box{
						width:640rpx;
						height:260rpx;
						margin:20rpx auto;
					}
					.hang{
						padding:20rpx 0;
						
						.le-t{
							margin-right:20rpx;
						}
						.left{
							text-align: left;
						}
						.right{
							color:#F83C3C;
						}
						.tab1{
							color:#F83C3C;
						}
						.tab2{
							color:#F79810;
						}
						.tab3{
							color:#B7B7B7;
						}
					}
				}
				.tp{
					padding:20rpx;
					margin-bottom: 20rpx;
					align-items: flex-start;
					border-bottom: 1rpx solid #EBEBEB;
					.center{
						margin-left:20rpx;
						.time{
							margin-top:50rpx;
						}
					}
					
				}
			}
		}
	}
</style>
