<template>
	<view class="wrap">
		<view class="list">
			<view class="li li-1">
				<view class="th">服务单号:{{orderId}}</view>
				<view class="td flex-box">
					<view>退款课程</view>
					<view>{{infor.courseName}}</view>
				</view>
			</view>
			<view class="li li-2">
				<view class="row" @click="show=true">
					<view class="nominal">
						<text class="dian">*</text> 请选择申请类别
					</view>
					<view class="input box-1">
						
						<!-- <input placeholder="请选择" readonly type="text" v-model="typeValue" /> -->
						
					</view>
					<view class="icon">
						<span v-if="typeValue">{{typeValue}}</span>
						<span v-else>请选择</span>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="row" @click="show1=true">
					<view class="nominal">
						<text class="dian">*</text> 申请原因
					</view>
					<view class="input box-1">
						<!-- <input placeholder="请选择" readonly type="text" v-model="yyValue" /> -->
						
					</view>
					<view class="icon">
						<span v-if="yyValue">{{yyValue}}</span>
						<span v-else>请选择</span>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="desc">
					<u--textarea v-model="value1" border="0" placeholder="请尽可能的描述申请售后服务的具体原因~" ></u--textarea>
				</view>
				<view class="upImg">
						<u-upload
							:fileList="fileList1"
							@afterRead="afterRead"
							@delete="deletePic"
							name="1"
							multiple
							:maxCount="10"
						></u-upload>
				</view>
			</view>
			<view class="li li-3 li-1">
				<view class="td flex-box">
					<view>退款课程</view>
				</view>
				<view class="th">请填写退款账户与原订单支付账户一致</view>
				<view class="row">
					<view class="nominal">
						<text class="dian">*</text> 账户名称
					</view>
					<view class="input box-1">
						<input placeholder="请输入账户名称" type="text" v-model="bankName" />
						
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="row">
					<view class="nominal">
						<text class="dian">*</text> 银行账号
					</view>
					<view class="input box-1">
						<input placeholder="请输入银行账号" type="text" v-model="bankNum" />
						
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="row">
					<view class="nominal">
						<text class="dian">*</text> 开户银行
					</view>
					<view class="input box-1">
						<input placeholder="请输入开户银行" type="text" v-model="bankHang" />
						
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<view class="li li-4">
				<view class="btn" @click="submit">
					确认申请
				</view>
			</view>
		</view>
		<u-popup :show="show" :round="10" @close="show = false" @open="show=true" :closeable="true">
			<view class="p-list">
				<view class="title">申请类别</view>
				<view class="row"
				 @tap="type=item.type;show=false;typeValue=item.name" v-for="(item,index) in typeList" :key="index">
						<view class="center">
							{{item.name}}
						</view>
						<view class="right">
							<radio :checked="type==item.type" color="#CBA668" />
						</view>
				</view>
				
			</view>
		</u-popup>
		<u-popup :show="show1" :round="10" @close="show1 = false" @open="show1=true" :closeable="true">
			<view class="p-list">
				<view class="title">申请原因</view>
				<view class="row"
				 @tap="yytype=item.type;show1=false;yyValue=item.name" v-for="(item,index) in yyList" :key="index">
						<view class="center">
							{{item.name}}
						</view>
						<view class="right">
							<radio :checked="yytype==item.type" color="#CBA668" />
						</view>
				</view>
			</view>
		</u-popup>
		<uni-popup ref="myPopup" type="dialog">
			<uni-popup-dialog mode="base" content="是否确认退款？" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userAgreementId:null,
				value1:'',//描述
				infor:{},
				orderId:null,
				show: false,
				type:0,
				yytype:0,
				typeValue:'',//
				fileList1: [],
				show1:false,
				typeList: [
					{type:1,name:'退款'}
				],
				yyValue: '',
				yyList: [
					{type:1,name:'个人原因'},
					{type:2,name:'企业原因'},
					{type:3,name:'经济原因'},
					
				],
				upFlile:[],
				bankName: '',
				bankNum: '',
				bankHang: ''
			};
		},
		onLoad(option){
			if (option.scene) {
			//扫描普通链接进入小程序，并获取参数
				const scene = decodeURIComponent(option.scene);
				console.log(scene);//orderId="OOOOOO"
				let arr = scene.split('=');
				console.log('22222',arr);
				this.orderId = arr[1]	
				this.getCourseInfoByOrderId()
			}else{
				//普通链接进入
				this.$u.toast('未获取到订单ID')
			}
		},
		methods:{
			close() {
				this.$refs.myPopup.close()
			},
			//申请退款
			submit(){
				if(!this.typeValue){
					this.$u.toast('请选择申请类别')
					return false
				}
				if(!this.yyValue){
					this.$u.toast('请选择申请原因')
					return false
				}
				if(!this.bankName){
					this.$u.toast('请输入账户名称')
					return false
				}
				if(!this.bankNum){
					this.$u.toast('请输入银行卡号')
					return false
				}
				if(!this.bankHang){
					this.$u.toast('请输入开户行')
					return false
				}
				this.$H.post('/buy/getRefundInfoByOrderId',{id: this.orderId}).then(res=>{
					console.log('res:',res);
					this.userAgreementId = res.data.contractInfo.userAgreementId;
					this.$refs.myPopup.open();
				}).catch(err=>{
					console.log(err);
					this.$u.toast('请求出错请重试。')
				})
			},
			confirm(){
				this.$u.api.refundOrder({
						orderId: this.orderId,
						refundAccount:this.bankNum,
						refundDetail:this.value1,
						refundImg: this.upFlile,
						refundInfo: this.yyValue,
						refundType: this.typeValue,
						bankName: this.bankHang,
						accountName:this.bankName,
						userAgreementId:this.userAgreementId,
					}).then(res=>{
						console.log(res,'data')
						if(res.status){
							this.$f.jump('/pages/refund/succ',3)
						}else{
							this.$u.toast(res.message)
						}
					})
			},
			//获取信息
			getCourseInfoByOrderId(){
				this.$u.api.getCourseInfoByOrderId({
						id:this.orderId
					}).then(res=>{
						
					this.infor = res.data.course
					console.log('1111111111',this.info)
					// this.infor.coursePackage = 2
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
							console.log(res,'上传信息')
							let data = JSON.parse(res.data)
							console.log(data.data.filepath[0])
							that.upFlile = that.upFlile.concat(data.data.filepath[0])
							setTimeout(() => {
								resolve(res.data.data)
								
							}, 1000)
						}
					});
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.wrap{
		.p-list{
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
		.list{
			.li{
				padding:30rpx;
				background-color: #fff;
				margin-bottom:20rpx;
				.btn{
					width: 700rpx;
					height: 100rpx;
					line-height:100rpx;
					color:#fff;
					background: #1370F7;
					border-radius: 15rpx;
					text-align: center;
					margin:20rpx auto;
				}
			}
			.li-1{
				.th{
					font-size:24rpx;
					color:#666666;
				}
				.td{
					justify-content: space-between;
					font-size:30rpx;
				}
			}
			.li-2,.li-3{
				.row{
					width: 100%;
					height: 90upx;
					display: flex;
					align-items: center;
					border-bottom:1rpx solid #eee;
					.dian{
						color:#DD524D;
					}
					.desc{
						padding:20rpx 0;
					}
					.upImg{
						
					}
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
			}
			.li-4{
				background:none;
			}
			.li-3{
				.row:last-child{
					border-bottom:0;
				}
			}
		}
	}
</style>
