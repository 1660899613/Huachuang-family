<template>
	<view class="wrap" v-if="infor.courseName">
		<view class="content">
			<view class="header">
				<view class="title">{{infor.courseName}}</view>
				<view class="flex-box bd">
					<view class="box-1">第{{infor.courseTerm}}期</view>
					共4节课
				</view>
			</view>
			<view class="ewmBox">
				<!-- <view class="code">
					<u-image :src="'data:image/png;base64,'+infor.codeBase" :lazy-load="true" width="300rpx" height="300rpx"></u-image>
				</view> -->
				<view class="hd">{{infor.studyName}}</view>
				<view class="des">学员</view>
				<view class="flex-box btn-box">
					
					<view class="btn-3 btn-sty" v-if="signCond">已签到</view>
					<view class="btn-1 btn-sty" v-if="!signCond" @click="sign">签到</view>
					<view class="btn-2 btn-sty" @click="scanCode">扫一扫</view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				classId:'',
				userHash: '',
				infor: {},
				signCond: false,
			};
		},
		onLoad(option){
			console.log(option,'option 参数单元')
			if(option){
				this.classId = option.classId
				this.userHash = option.userHash
				this.signInfo()
			}
		
		},
		methods:{
			//获取学员信息
			signInfo(){
				uni.showLoading({
				    title: '加载中'
				});
				this.$u.api.signInfo({
					classId: this.classId,
					userHash: this.userHash
					}).then(res=>{
					console.log(res,'data 核销信息')
					this.infor = res.data.studentInfo
					uni.hideLoading();
				})
			},
			//签到
			sign(){
				this.$u.api.sign({
					classId: this.classId,
					userHash: this.userHash
					}).then(res=>{
					console.log(res,'data 签到信息')
					// this.infor = res.data.infor
					if(res.status){
						this.$u.toast('签到成功')
						this.signCond = true
					}else{
						this.$u.toast(res.message)
					}
					uni.hideLoading();
				})
			},
			//扫一扫
			scanCode(){
				let that = this;
				uni.scanCode({
				    success: function (res) {
						let url = res.result;
						let option = JSON.parse(res.result);
						that.classId = option.classId
						that.userHash = option.userHash
						that.signInfo()
						console.log(res,option,'二维码信息')
				    }
				});
			},
			getUrlQuery (variable,url) {
				 var query = url;
				       var vars = query.split("&");
				       for (var i=0;i<vars.length;i++) {
				               var pair = vars[i].split("=");
				               if(pair[0] == variable){return pair[1];}
				       }
			   return(false);
			},
		}
	}
</script>

<style lang="scss">
	.wrap{
		.header{
			padding:30rpx;
			.title{
				
			}
			.bd{
				color:#999999;
				font-size:24rpx;
				padding:20rpx 0;
			}
			border-bottom:20rpx solid #f5f5f5;
		}
		.btn-box{
			justify-content: space-between;
			margin-top:50rpx;
			.btn-sty{
				width: 300rpx;
				height: 100rpx;
				line-height:100rpx;
				border-radius: 12rpx;
			}
			.btn-1{
				background: #1577FF;
				color:#fff;
			}
			.btn-2{
				background: #FEF6F6;
				border:1px solid #1577FF
			}
			.btn-3{
				background-color: #eee;
				color:#333;
			}
		}
		.ewmBox{
			text-align: center;
			padding:100rpx 50rpx;
			.code{
				width:300rpx;
				height:300rpx;
				margin:20rpx auto;
			}
			.des{
				font-size:24rpx;
				color:#999;
				margin-top:20rpx;
			}
		}
	}
</style>
