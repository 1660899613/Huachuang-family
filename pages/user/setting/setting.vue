<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row">
					<view class="title">头像</view>
					<view class="right">
						<view class="tis">
							<u-upload
								width="50"
								height="50"
								:fileList="fileList1"
								@afterRead="afterRead"
								@delete="deletePic"
								name="1"
								:previewFullImage="true"
								multiple
								:maxCount="1"
								>
								<u-avatar :src="userInfo.headPortrait"  size="100rpx" :default-url="userInfo.headPortrait" shape="circle"></u-avatar>
								</u-upload>
						</view>
							<view class="icon">
								<u-icon name="arrow-right"></u-icon>
							</view>
					</view>
				</view>
				<view class="row">
					<view class="title">昵称</view>
					<view class="right">
						<view class="tis">
							<u-input
								inputAlign="right"
								placeholderStyle="color:#848383"
								border="false"
								placeholder="请输入昵称"
								v-model="userInfo.userName" 
								type="text"></u-input>
						</view>
						<view class="icon">
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</view>
				<view class="row">
					<view class="title">姓名</view>
					<view class="right">
						<view class="tis">
							<u-input
								inputAlign="right"
								placeholderStyle="color:#848383"
								border="false"
								placeholder="请输入姓名"
								v-model="userInfo.realName" 
								type="text"></u-input>
						</view>
						<view class="icon">
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</view>
				<view class="row">
					<view class="title">性别</view>
					<view class="right" @click="show=true">
						<view class="tis tis_sex" v-if="userInfo.gender==1">男</view>
						<view class="tis tis_sex" v-else-if="userInfo.gender==2">女</view>
						<view class="tis tis_sex" v-else>未关联</view>
						<view class="icon">
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="row">
					<view class="title">手机号码</view>
					<view class="right"><view class="tis">
					<view v-if="userInfo.userPhone" style="color: #000000;">
						{{userInfo.userPhone}}
					</view>
					<u-input
						v-else
						inputAlign="right"
						placeholderStyle="color:#848383"
						border="false"
						placeholder="请输入手机号码"
						v-model="userInfo.userPhone " 
						type="text">
					</u-input>
					</view><view class="icon"><u-icon name="arrow-right"></u-icon></view></view>
				</view>
			</view>
			
		</view>
		<view class="footer" @click="modifyClick">修改</view>
		
		
		
		<u-popup :show="show" :round="10" @close="show = false" @open="show=true" :closeable="true">
			<view class="list_sex">
				<view class="title">选择性别</view>
				<view class="row" @click="selectSex(item)" v-for="(item,index) in classList" :key="index">
						<view class="center">
							{{item.sexName}}
						</view>
						<view class="right">
							<radio :checked="type===item.value" color="#CBA668" />
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
				src: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				userInfo: null,
				fileList1: [],
				upFlile:[],
				classList:[
					{sexName:'男',value:'1'},
					{sexName:'女',value:'2'},
					
				],
				show:false,
				type:""
			};
		},
		onLoad() {
			// this.userInfo = uni.getStorageSync("userInfo")
			this.getUserInfo()
		},
		methods: {
			selectSex(item){
				this.type=item.value
				this.userInfo.gender=item.value
				this.show=false
				console.log("this.type",this.type)
			},
			getUserInfo(){
				this.$u.api.getUserInfo({
						
					}).then(res=>{
					console.log(res,'data')
					this.userInfo = res.data.userInfo
				})
			},
			//修改
			modifyClick(){
				if(!this.userInfo.headPortrait){
					this.$u.toast('请选择头像')
					return false
				}
				if(!this.userInfo.userName){
					this.$u.toast('请输入昵称')
					return false
				}
				if(!this.userInfo.realName){
					this.$u.toast('请输入姓名')
					return false
				}
				if(!(/^1[3|4|5|7|8]\d{9}$/.test(this.userInfo.userPhone))){ 
					this.$u.toast('请输入正确的手机号码')
					return false
				}
				this.$u.api.modifyData({
						userPhone:this.userInfo.userPhone,
						userName:this.userInfo.userName,
						headPortrait:this.userInfo.headPortrait,
						realName:this.userInfo.realName,
						gender:this.userInfo.gender,
					}).then(res=>{
					console.log(res,'data')
					if(res.status){
						this.$f.jump('/pages/user/index',3)
					}else{
						this.$u.toast(res.message)
					}
					// this.userInfo = res.data.userInfo
				})
				
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				let that = this
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: that.$c.domain+'/home/fileupload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'fileName',
						formData: {
							user: 'test'
						},
						success: (res) => {
							let data = JSON.parse(res.data)
							console.log(data.data.filepath[0])
							this.userInfo.headPortrait = data.data.filepath[0]
							setTimeout(() => {
								resolve(res.data.data)
								
							}, 1000)
						}
					});
				})
			},
			toUrl(item){
				uni.navigateTo({
					url:item
				})
			},
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f3f3f3;	
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
			background: linear-gradient(90deg, #1370F7 0%, #3484F8 100%);
		}

.icon {
	font-size: 30upx;

}
.content{
	padding-bottom: 20upx;
	// padding:20rpx;
	.list{
		border-radius: 20rpx;
		// width: 96%;
		// padding-left: 4%;
		padding:20rpx;
		background-color: #fff;
		margin-bottom: 20upx;
		.row{
			widows: 100%;
			min-height: 90upx;
			padding:10rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: solid 1upx #eee;
			&:last-child{
				border-bottom: none;
			}
			.title{
				font-size: 32upx;
				color: #333;
			}
			.right{
				display: flex;
				align-items: center;
				color: #999;
				.tis_sex{
					font-size: 30upx !important;
					color: #333;
				}
				.tis{
					font-size: 26upx;
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
}
.list_sex{
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
</style>
