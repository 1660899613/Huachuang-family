<template>
	<view class="courseDetails" v-if="infor.courseName">
		<!-- 头部 -->
		<view class="header">
			<u-swiper
				height="450rpx"
				radius="0"
				:autoplay="false"
				:list="list1"
				@click="swiperClick()"
			    ></u-swiper>
			<view class="hdeader">
				<view class="title flex-box">
					<view class="box-1"><text v-if="infor.courseTerm">第{{infor.courseTerm}}期</text>{{infor.courseName}}</view>
					<view class="img-box" v-if="infor.hotSign">
						<image class="imgSty" src="@/static/ico/huo-ico.png"></image>
						<view>热销中</view>
					</view>
				</view>
				<view class="desc">
					{{infor.courseBrief}}
				</view>
				<view class="bdSty flex-box">
					<view class="bdTitle box-1">
						<text  v-show="infor.coursePackage==1">已有{{infor.signCompany}}位企业家选择该套餐</text>
						<text  v-show="infor.coursePackage==2">已开{{infor.courseTerm}}期培养{{infor.signCount}}人</text>
					</view>
					<text class="text">已售 {{infor.signCount}}</text>
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="content">
			<u-sticky :offsetTop="0" bgColor="#ffffff">
				<u-tabs
				:list="tabList" 
				:scrollable="false" 
				:current="current"
				@click="tabClick"></u-tabs>
			</u-sticky>
			<!-- chuld -->
			<detailsList :current="current" :bannerList="list1" :infor="infor" @changeopenItem="changeopenItem()" :tcList="tcList"></detailsList>
			
		</view>
		<view class="footer flex-box">
			<button @click="shareRecord" class="sc other" hover-class="none" open-type="share"   v-bind:data-student="infor" >
				<image class="img-box" src="../../static/ico/share-ico-1.png" mode=""></image>
				<view>分享</view>
			</button>
			<view class="share other" @click="courseCollection">
				<image v-if="infor.isCollect!=1 " class="img-box" src="../../static/ico/sc-ico-1.png" mode=""></image>
				<image v-else class="img-box" src="../../static/ico/sc-ico-1-2.png" mode=""></image>
				
				<view>收藏</view>
			</view>
			<view class="text-desc box-1">
				<view class="hd">￥{{infor.courseMoney}}</view>
				<view class="test">课程费用</view>
			</view>
			<view class="sbBtn"  @click="subClic">{{infor.coursePackage=='1'?'去购买':infor.coursePackage=='2'?'去报名':'去申请'}}</view>
		</view>
		
		
		<u-popup :show="show" mode="center" @close="close" @open="open">
			<view class="question-box">
				<view class="title">
					问答题
				</view>
				<view class="question" v-for="(item,index) in questResList" :key="index">
					<p>{{item.questNo}}、{{item.questStr}}</p>
					<view class="">
						
						<u--input
						    placeholder="请输入您的回答"
						    v-model="item.value"
						  ></u--input>
					</view>
				</view>
				<view class="question-button">
					<u-button :plain="true"  text="取消" @click="close"></u-button>
					<u-button type="primary" @click="questionnaireSave" text="确定"></u-button>
					
				</view>
				
				
			</view>
		</u-popup>
	</view>
</template>

<script>
	import detailsList from '../../components/common/details-list.vue'
	export default {
		components:{
			detailsList
		},
		data() {
			return {
				show:false,
				mlCurr: 0,
				cuIndex:0,
				current:0,
				tabList:[{
						name: '详情',
					},{
						name: '套餐产品',
					},
					{
						name: '精彩集锦',
					}
				],
				
				list1:[
					
				],
				tcList: [],
				app_id:406077,
				app_secret:'Xt4yN3Fzgr1xd11kCbHFx6Fk',
				timestamp:this.generateTimeReqestNumber(),
				account_type:1,
				open_id:'18375875809',
				v: '2.0',
				customer_id: '',
				transactionNo: ''|| uni.getStorageSync("transactionNo"),
				infor:{},
				userInfo: {},
				fddInfo: {},
				questResList:[]
			};
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 分享按钮
			}
			return {
				title: this.infor.courseName,
				path: '/pages/courseDetails/index?id='+this.infor.courseId,
				imageUrl: this.shareCover
			}
		},
		onLoad(option) {
			this.id = option.id
			// this.registerFdd()
		},
		onShow(){
			this.getDetails()
			this.getUserInfo()
		},
		methods:{
			// 分享记录接口
			shareRecord(){
				this.$H.post('/extension/shareCourse').then(res=>{
					console.log('share record succ')
				}).catch(err=>{
					console.error('share record error!')
				})
			},
			open() {
				this.show=true
			  // console.log('open');
			},
			close() {
			  this.show = false
			  // console.log('close');
			},
			//收藏课程
			courseCollection(){
				if(this.infor.isCollect){
					this.$u.api.courseCollection({
							collect:0,
							courseId:this.infor.courseId
						}).then(res=>{
						console.log(res,'data')
						this.infor.isCollect = 0
						this.$u.toast(res.message)
					})
				}else{
					this.$u.api.courseCollection({
							collect:1,
							courseId:this.infor.courseId
						}).then(res=>{
						console.log(res,'data')
						this.infor.isCollect = 1
						this.$u.toast(res.message)
					})
				}
			
			},
			//详情
			getDetails(){
				uni.showLoading({
				    title: '加载中'
				});
				this.$u.api.getCourseInfo({
						id:this.id
					}).then(res=>{
					console.log(res,'data1000')
					this.infor = res.data.course
					// this.infor.coursePackage = 2
					this.list1.push(this.infor.courseImg)
					if(this.infor.coursePackage==1){
						this.tabList[1].name = '套餐产品'
						this.getCourseClass()
					}
					if(this.infor.coursePackage==2){
						this.tabList[1].name = '班级排期'
						this.getCourseClass()
					}
					if(this.infor.coursePackage==3){
						this.tabList=[{
							name: '详情',
						}]
					}
					
					
					uni.hideLoading();
					console.log(this.list1,'banner')
				})
			},
			//获取班级排期
			getCourseClass(){
				this.$u.api.getCourseClass({courseId:this.infor.courseId}).then(res=>{
					let courseResList=res.data.courseResList?res.data.courseResList:[]
					if(courseResList.length>0){
						res.data.courseResList.forEach((item)=>{
							item.cond=false
						})
					}
					this.tcList=res.data.classList?res.data.classList:res.data.courseResList
					console.log("获取班级排期",this.tcList)
				})
			},
			changeopenItem(index){
				this.tcList[index].cond = !this.tcList[index].cond 
			},
			swiperClick(){
				
			},
			tabClick(item){
				this.current = item.index
			},
			
			// questionnaireApply,questionnaireSave,
			
			questionnaireSave(){
				console.log("this.questResList",this.questResList)
				const that = this
				let params={
					answer:"",
					courseId:that.infor.courseId
				}
				let answer=[]
				for(let i=0;i<that.questResList.length;i++){
					if(!that.questResList[i].value){
						that.$u.toast('请回答第'+that.questResList[i].questNo+"个问题")
						return
					}else{
						let obj={
							answerStr:that.questResList[i].value,
							questId:that.questResList[i].questId,
						}
						answer.push(obj)
					}
				}
				
				params.answer=JSON.stringify(answer)
				console.log(params)
				that.$u.api.questionnaireSave(params).then(res=>{
					that.show=false
					that.$u.toast(res.message)
	
					setTimeout(function () {
					    that.$f.jump('/pages/index/index',4)
					}, 1000);
					
				})
			},
			
			questionnaireApply(){
				this.$u.api.questionnaireApply({courseId:this.infor.courseId}).then(res=>{
					if(res.code==200){
						this.questResList=res.data.questionnaire.questResList
						this.open()
						console.log(res.data.questionnaire.questResList)
						
					}else{
						uni.$u.toast(res.message);
					}
					
				})
			},
			subClic(){
				
				if(this.infor.coursePackage==3){
					
					this.questionnaireApply()
				}else{
					this.nextClick()
				}
				
			},
			sha1(s) {
			
			var hash = this.$crypto.createHash('sha1');
			
			hash.update(s);
			
			return hash.digest('hex').toUpperCase();
			
			},
			
			md5(s) {
			
			var hash = this.$crypto.createHash('md5');
			
			hash.update(s);
			
			return hash.digest('hex').toUpperCase();
			
			},
			
			base64(s) {
			
			var b = new Buffer.from(s);
			
			return b.toString('base64');
			
			},
			
			ast(s) {
			
				return s.split('').sort().join('');
			
			},
			//实名认证回调
			callbackSmrz(){
				this.$u.api.signCode({
						transaction_id: code,
						contract_id: 1234,
						customer_id:this.customer_id,
						doc_title: '股权代持协议及授权委托书',
						
					}).then(res=>{
						// res.data.signCode
					console.log(res,'data 合同签署')
					let option = {
						app_id:this.app_id,
						timestamp:res.data.timestamp,
						v:this.v,
						msg_digest:res.data.signCode,
						transaction_id: code,
						contract_id: 1234,
						customer_id:this.customer_id,
						doc_title: '股权代持协议及授权委托书',
						contract_id: 1234,
					}
					uni.request({
						url: "http://test.api.fabigbig.com:8888/api/extsign.api",
						header: { 
							'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
						},
						data: option, 
						method: 'POST',
						success: function(result){
							var res = result.data;
							console.log(result,'合同签署测试....')
							
						},
						fail:function(err){
							console.log(err);
						}
					});
				})
			},
			
			
			//查询个人实名认证信息
			isRz(callbanck){
				// let msg_digest = this.isRzSecre()
				let that = this;
				this.$u.api.signCode({
						verified_serialno:this.fddInfo.transactionId
					}).then(res=>{
						let option = {
							app_id:this.app_id,
							timestamp:res.data.timestamp,
							v:this.v,
							msg_digest:res.data.signCode,
							verified_serialno:this.fddInfo.transactionId
						}
					uni.request({
						url: "http://test.api.fabigbig.com:8888/api/find_personCertInfo.api",
						header: { 
							'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
						},
						data: option, 
						method: 'POST',
						success: function(result){
							var res = result.data;
							console.log(result,'查询实名认证测试输出....')
							//实名结果 
							callbanck(res)
							// that.certificateSq()
						},
						fail:function(err){
							console.log(err);
						}
					});
					
				})
				
			},
			getUserInfo(){
				this.$u.api.getUserInfo({
					}).then(res=>{
					this.userInfo = res.data.userInfo
					this.fddInfo = res.data.fddInfo
					console.log(this.fddInfo,this.userInfo,'用户信息')
				})
			},
			nextClick(){
				this.$f.jump('/pages/pay/order?id='+this.infor.courseId)
				return false
				let that = this
				//如果未注册
				if(!this.fddInfo.transactionId){
					//去注册  走实名认证
					this.registerFdd()
				}else{
					this.isRz(function(res){
						//未审核 或者 审核未通过 重新认证 已注册    已通过为2
						if(res.data.person.status!=2){
							wx.navigateToMiniProgram({
								appId:'wx855361a721050c6b',
								path: 'pages/result-loading/result-loading?verifyUrl=' + encodeURIComponent(that.fddInfo.url),
								envVersion: 'release',
								success(res) {
									console.log(res)
									uni.request({
										url: "http://huachuang.yxy5g.com//home/fddNotify",
										header: { 
											'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
										},
										method: 'POST',
										success: function(ress){
											console.log(ress,'回调信息')
										},
										fail:function(err){
											console.log(err);
										}
									});
								// 打开成功
								}
							})
						}else{
							//去签署协议  是否签署协议
							  
							// that.contractQs()
							// that.$f.jump('/pages1/web-view/web-view')
							// 去下单
							that.$f.jump('/pages/pay/order?id='+that.infor.courseId)
							
						}
					})
				}
				
			},
			
			//实名证书申请   默认已申请 不用
			certificateSq(){
				let msg_digest = this.certificateSecret()
				let that = this;
				let transactionNo = this.transactionNo 
				let customer_id = this.customer_id;
				let option = {
					app_id:this.app_id,
					timestamp:this.timestamp,
					v:this.v,
					msg_digest,
					customer_id,
					verified_serialno:transactionNo,
					
				}
				uni.request({
					url: "http://test.api.fabigbig.com:8888/api/apply_cert.api",
					header: { 
						'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
					},
					data: option, 
					method: 'POST',
					success: function(result){
						var res = result.data;
						console.log(result,'实名认证结果测试输出....')
						uni.showToast({
							title: res.msg,
							icon: "none"
						});
						//手动签署
						
					},
					fail:function(err){
						console.log(err);
					}
				});
			},
			signSecret(){
				
			},
			signFdd(){
				
			},
			getFddUrl(){
				//个人 实名认证
				let verified_way = 1;//实名认证套餐类型： 0：三要素标准方 案；1：三要素补充方 案；2：四要素标准方 案；3：四要素补充方 案；4：纯三要素方案； 5：纯四要素方案； 9：人脸识别方案
				let page_modify = 2; //是否允许用户修改界面 1 允许 2不允许
				let notify_url = 'http://huachuang.yxy5g.com//home/fddNotify';//回调地址
				let return_url = '';//认证结果返回地址
				let is_mini_program = 1;//是否小程序认证。默认为0 1代表小程序认证,0非小程序
				let cert_flag = 1;
				let that = this;
				this.$u.api.signCode({
						customer_id:this.customer_id,
						verified_way,
						page_modify,
						cert_flag,
						notify_url,
						is_mini_program,
						return_url
					}).then(res=>{
						let option = {
							app_id:this.app_id,
							timestamp:res.data.timestamp,
							v:this.v,
							customer_id:this.customer_id,
							msg_digest:res.data.signCode,
							verified_way,
							page_modify,
							is_mini_program,
							cert_flag,
							notify_url,
							return_url
						}
						uni.request({
							url: "http://test.api.fabigbig.com:8888/api/get_person_verify_url.api",
							header: { 
								'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
							},
							data: option, 
							method: 'POST',
							success: function(result){
								var res = result.data;
								console.log(res,'认证地址')
								that.transactionNo = res.data.transactionNo
								let url = that.$w_base.decode(res.data.url)
								//交易信息保存
								// uni.setStorageSync("transactionNo",that.transactionNo)
								that.fddSave(that.customer_id,res.data.transactionNo,url,function(){
									that.$u.api.getUserInfo({
										}).then(res=>{
										let fddInfo = res.data.fddInfo
										if(fddInfo.url){
											wx.navigateToMiniProgram({
												appId:'wx855361a721050c6b',
												path: 'pages/result-loading/result-loading?verifyUrl=' + encodeURIComponent(fddInfo.url),
												envVersion: 'release',
												success(res) {
													console.log(res)
													
												// 打开成功
												}
											})
										}
										
									})
								})
								
							},
							fail:function(err){
								console.log(err);
							}
						});
					
				})
				
			},
			fddSave(customer_id,id,url,callback){
				this.$u.api.fddSave({
						customerId:customer_id,
						transactionId: id,
						url: url,
					}).then(res=>{
					console.log(res,'data fddSave')
						callback()			
				})
			},
			codeChange(text) {
				this.tips = text;
			},
			generateTimeReqestNumber() {
				var date = new Date();
				return date.getFullYear().toString() + this.pad2(date.getMonth() + 1) + this.pad2(date.getDate()) + this.pad2(date.getHours()) + this.pad2(date.getMinutes()) + this.pad2(date.getSeconds());
			},
			pad2(n) { return n < 10 ? '0' + n : n },
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	
	.question-box{
		border-radius: 12rpx;
		width: 500rpx;
		padding: 40rpx;
		.question{
			margin-top: 30rpx;
		}
		.question-button{
			margin-top: 60rpx;
			display: flex;
			justify-content: space-between;
			button{
				width: 200rpx;
			}
		}
		.title{
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}
		.u-input{
			margin-top: 20rpx;
			background-color: #F0F0F0;
		}
	}
	button::after{
		border: none;
		background-color: none;
	}
	.footer{
		position:fixed;
		bottom:0;
		right:0;
		left:0;
		padding:20rpx;
		background-color: #fff;
		justify-content: center;
		font-size:24rpx;
		.other{
			display: block;
			font-size:24rpx;
			width:15%;
			text-align: center;
			background-color: none;
			position: relative;
				display: block;
				margin-left: auto;
				margin-right: auto;
				padding-left: 0px;
				padding-right: 0px;
				box-sizing: border-box;
				// font-size: 18px;
				text-align: center;
				text-decoration: none;
				// line-height: 1;
				line-height: 1.35;
				// border-radius: 5px;
				-webkit-tap-highlight-color: transparent;
				overflow: hidden;
				color: #000000;
				background-color: #fff;
			.img-box{
				margin:0 auto;
				width:40rpx;
				height:37rpx;
			}
		}
		.text-desc{
			text-align: center;
			.hd{
				font-size:30rpx;
			}
			.test{
				color:#999999;
				font-size:22rpx;
			}
		}
		.sbBtn{
			margin-left:20rpx;
			width: 278rpx;
			height: 74rpx;
			line-height: 74rpx;
			background: #106DF7;
			border-radius: 14rpx;
			text-align: center;
			color:#fff;
			font-size:26rpx;
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
		.header{
			.hdeader{
				background-color: #fff;
				padding:25rpx;
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
	}
</style>
