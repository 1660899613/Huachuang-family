<template>
	<view class="wrap">
		<view class="header">
			<view :class="['hd-box', istype == 1 ? 'b1' : 'b2']">
				<view class="r-rule" @click="$f.jump('/pages/cooperation/rule')">合作规则</view>
				<view class="h-infor flex-box">
					<view class="top-tx" @click="$f.jump('/pages/cooperation/withdrawal/detailed')">
						<u-avatar :src="userInfo.userInfo.headPortrait" 
						 size="120rpx" 
						 :default-url="'https://img.alicdn.com/imgextra/i4/1650780431/O1CN01kCrTjA1F3RRa8gnkx_!!1650780431.png'" 
						 shape="circle"></u-avatar>
					</view>
					<view class="center box-1">
						
						<view class="c-title flex-box" v-if="istype==1">
							<text style="margin-right:10rpx;">{{userName}}</text> <u-image class="szIco"
								 src="@/static/ico/hz-label-1.png" 
								 :lazy-load="true" width="116rpx" height="37rpx"></u-image>
						</view>
						<view class="c-title flex-box" v-if="istype==2">
							<text style="margin-right:10rpx;">公司</text> <u-image class="szIco"
								 src="@/static/ico/hz-label-2.png" 
								 :lazy-load="true" width="116rpx" height="37rpx"></u-image>
						</view>
						<view class="c-yqm">{{userInfo.userInfo.userName}}</view>
						<!-- <view class="c-yqm">邀请码 {{details.inviteCode}}</view> -->
					</view>
					<view v-if="istype==1 && toBase64Url"  class="right1 " @click="openShare">邀请好友</view>
					<view  v-if="istype==2 && toBase64Url" class="right2 " @click="openShare">邀请好友</view>
				</view>
			</view>
		</view>
		<view class="list-ul">
			<view v-if="istype==1" class="li li-1 flex-box colo1"  style="color: #5F80FF;" @click="$f.jump('/pages/cooperation/withdrawal/detailed')">
				<view class="left">可提现余额(元)</view>
				<view class="center box-1" >￥{{details.money?details.money:'0'}}</view>
				<view class="right">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view v-if="istype==2" class="li li-1 flex-box" style="color: #5333A3;" @click="$f.jump('/pages/cooperation/withdrawal/detailed')">
				<view class="left">可提现余额(元)</view>
				<view class="center box-1" >￥{{details.money?details.money:'0'}}</view>
				<view class="right">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="li li-2 flex-box" v-if="istype==1">
				<view class="left box-1">我的上级</view>
				
				<view class="right flex-box">
					<u-avatar :src="details.inviterHead"
					 size="58rpx" 
					 :default-url="'https://img.alicdn.com/imgextra/i4/1650780431/O1CN01kCrTjA1F3RRa8gnkx_!!1650780431.png'" 
					 shape="circle"></u-avatar>
					 <text style="margin-left:10rpx;">{{details.inviter}}</text>
				</view>
			</view>
			<view class="li li-3 flex-box">
				<view class="left box-1">
					<view class="td">{{details.inviteCount }}</view>
					我的推荐次数
				</view>
				<view class="left box-1">
					<view class="td">{{details.customerCount  }}</view>
					我的客户数量
				</view>
				<view class="left box-1">
					<view class="td">{{details.achievement }}</view>
					我的销售业绩
				</view>
				<view class="left box-1"  @click="$f.jump('/pages/cooperation/friends?istype='+istype)">
					<view class="td">{{details.teamMembers }}</view>
					我的团队成员
				</view>
			</view>
			<view class="li li-4 ">
				<view class="td flex-box">
					<view class="left box-1" @click="getGainClass('1')">
						<view class="border-box" :class="type==1?istype==1?'b-active':'c-active':''">
							<view class="td">{{details.gainToday}}</view>
							今日预估收益
						</view>
						
					</view>
					<view class="left box-1" @click="getGainClass('2')">
						<view class="border-box " :class="type==2?istype==1?'b-active':'c-active':''" >
							<view class="td">{{details.gainMonth }}</view>
							本月预估收益
						</view>
					</view>
					<view class="left box-1" @click="getGainClass('3')">
						<view class="border-box " :class="type==3?istype==1?'b-active':'c-active':''" >
							<view class="td">{{details.gainAll}}</view>
							累计收益
						</view>
					</view>
				</view>
				<view class="td-list">
					<view class="li flex-box" v-for="(item,index) in record" :key="index">
						<view class="left">
							<u-avatar :src="item.userImg"
							 size="58rpx" 
							 :default-url="'https://img.alicdn.com/imgextra/i4/1650780431/O1CN01kCrTjA1F3RRa8gnkx_!!1650780431.png'" 
							 shape="circle"></u-avatar>
						</view>
						<view class="center box-1" :style="item.isWish == 3 ? 'color: #999;' : '' " >{{item.recordInfo}}</view>
						<view class="right" :style="item.isWish == 3 ? 'color: #999;' : '' ">
							{{item.gain}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<canvas  style="width: 800px; height: 1280px;position:fixed;left:9000px;" canvas-id="myCanvas" id="myCanvas"></canvas>
		<share :inviteCode="details.inviteCode" ref="share" @saveImg="saveImg" :code="toBase64Url" :type="istype"></share>
	</view>
</template>

<script>
	import share from '../../components/common/share.vue'; 
	export default {
		components:{
			share
		},
		data() {
			return {
				details:{},
				userInfo:{},
				record:[],
				type:'1',
				page:"1",
				istype:"",
				loadMord:true,
				inviteCode:{},
				toBase64Url:null,
				//个人真实信息
				userName:'**',
			};
		},
		onLoad(option) {
			console.log('onLoad:', option);
			this.istype = option.type;
			this.getInviteCode()
		},
		onReachBottom() {
			this.page++;
			this.getGainRecordList();
		},
		onShow() {
			this.loadMord=true
			this.page=1
			this.record=[],
			this.pageInit()
			this.getUserInfo()
			this.getGainRecordList()
		},
		methods:{
			//长按保存图片
			saveImg(){
				uni.showLoading({
				    title: '图片保存中...'
				});
				var _this=this
				//获取文件管理器对象
				const fs = wx.getFileSystemManager()
				//文件保存路径
				const Imgpath = wx.env.USER_DATA_PATH + '/qrcodeImg' + '.png'
				//_this.data.imgsrc   base64图片文件
				let imageSrc = this.toBase64Url.replace(/^data:image\/\w+;base64,/, '')
				//写入本地文件
				fs.writeFile({
					filePath: Imgpath,
					data: imageSrc,
					encoding: 'base64',
					success (res) {
						//保存到手机相册
						wx.saveImageToPhotosAlbum({
						filePath: Imgpath,
						success(res) {
							uni.hideLoading();
							wx.showToast({
								title: '保存成功',
								icon: 'success'
							})
						},
						fail:function(err){
						    uni.hideLoading();
							wx.showToast({
							  title: '保存失败',
							  icon: 'success'
							})
						}
				    })
				  }
				})
			},
			
			saveImagePhotos(url) { //点击保存
				uni.saveImageToPhotosAlbum({
					filePath: url,
					success() {
						uni.showLoading({
						    title: '图片保存成功'
						});
						setTimeout(function () {
						    uni.hideLoading();
						}, 1000);
						
					}
				})
			},
			getInviteCode(){
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				this.$u.api.getInviteCode({}).then(res=>{
					this.inviteCode=res.data.inviteCode
					// let base64 = wx.arrayBufferToBase64(res.data.inviteCode.qRBuffer); //把arraybuffer转成base64
					this.toBase64Url = 'data:image/jpeg;base64,' + res.data.inviteCode.fullImgBuffer; //不加上这串字符，在页面无法显示
					uni.hideLoading();
				})
				
			},
			
			getGainClass(value){
				this.page=1
				this.type=value
				this.record=[]
				this.loadMord=true
				this.getGainRecordList()
			},
			
			getGainRecordList(){
				let params={
					page:this.page,
					type:this.type,//1 今日 2 本月 3 累计
				}
				if(!this.loadMord){
					return
				}
				this.$u.api.getGainRecordList(params).then(res=>{
					this.record=this.record.concat(res.data.record)
					let pageTotal=res.data.pageTotal
					if(this.record.length<pageTotal){
						this.loadMord=true
					}else {
						this.loadMord=false
					}
				})
			},
			
			
			
			getUserInfo(){
				this.$u.api.getUserInfo({}).then(res=>{
					if(res.code==200){
						this.userInfo=res.data;
					}else{
						uni.showModal({
							title: '提示',
							content: res.message,
							success: function (res) {
							}
						});
					}
				})
				
			},
			//页面初始化数据
			pageInit(){
				this.$u.api.extensionIndex({}).then(res=>{
					if(res.code==200){
						this.details=res.data.extensionIndex;
						//获取用户真实姓名
						this.userName = this.details.name;
					}else{
						uni.showModal({
							title: '提示',
							content: res.message,
							success: function (res) {	
							}
						});
					}
				})
			},
			
			//打开分享
			openShare(){
				this.$refs.share.openShare();
			},
		}
	}
</script>

<style lang="scss">
		.wrap{
			width: 100vw;
			height: 100vh;
			background-color: #f5f5f5;
			.list-ul{
				position:relative;
				top:-100rpx;
				padding:20rpx;
				z-index: 99;
				.td-list{
					.li{
						.center{
							font-size:24rpx;
						}
						.right{
							font-size:28rpx;
						}
						border-top:1rpx solid #eee;
					}
				}
				.li{
					margin-top:20rpx;
					padding:20rpx;
					background-color: #fff;
					border-radius: 10rpx;
					.center{
						margin:0 20rpx;
					}
				}
				
				
				.color1{
					color:#5F80FF;
				}
				.color2{
					color:#5333A3 !important;
				}
				.li-1{
					
					.left{
						font-size:32rpx;
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
					// background-color: #6182FF;
					width:750rpx;
					height:295rpx;
					// position: absolute;
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
						
					
						.right1{
							color:#5F80FF !important;
							background-color: #fff;
							padding:5rpx 20rpx;
							border-radius: 30rpx;
							text-align: center;
							font-size:22rpx;
						}
						.right2{
							color:#5333A3 !important;
							background-color: #fff;
							padding:5rpx 20rpx;
							border-radius: 30rpx;
							text-align: center;
							font-size:22rpx;
						}
					}
				}
				.b1{
					background-image: url('~@/static/ico/hz-g-bg1.png');
				}
				.b2{
					background-image: url('~@/static/ico/hz-g-bg2.png');
				}
			}
		}
</style>
