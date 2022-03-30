<template>
	<view class="wrap">
		<view class="content">
			<view class="ul">
				<view class="li">
					<!-- <view class="row" @click="show=true">
						<view class="title">选择期数</view>
						<view class="right box-1">
							<view class="tis">请选择</view>
						</view>
						<view class="icon">
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view> -->
					
					<view class="row1">
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
					</view>
	
					<view class="addBtn btn" @click="submit">确认添加</view>
				</view>
			</view>
		</view>
		<u-popup :show="show" :round="10" @close="show = false" @open="show=true" :closeable="true">
			<view class="list">
				<view class="title">选择期数</view>
				<view class="row" @tap="type='1'">
						<view class="center">
							第一期01月01日-01月03日
						</view>
						<view class="right">
							<radio :checked="type=='1'" color="#CBA668" />
						</view>
				</view>
				<view class="row" @tap="type='2'">
						<view class="center">
							第一期01月01日-01月03日
						</view>
						<view class="right">
							<radio :checked="type=='2'" color="#CBA668" />
						</view>
				</view>
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
				type:'0',//支付类型
				id:0,
				name:'',
				tel: '',
			};
		},
		onLoad(option) {
			if(option.id){
				this.id = option.id
				this.name = option.name
				this.tel = option.phone
			}
		},
		methods:{
			//添加学员信息
			submit(){
				
				if(!this.name){
					this.$u.toast('请输入姓名')
					return false
				}
				if(!(/^1[3|4|5|7|8]\d{9}$/.test(this.tel))){ 
					this.$u.toast('请输入正确的手机号码')
					return false
				}
				this.$u.api.saveLearnInfo({
						infoId: this.id,
						name:this.name,
						phone:this.tel,
					}).then(res=>{
					console.log(res,'data')
					this.courseList = res.data.course
					// this.infor.coursePackage = 2
					
				})
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.wrap{
		padding-bottom:110rpx;
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
					padding-bottom:30rpx;
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
						position:fixed;
						bottom:30rpx;
						left:25rpx;
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
