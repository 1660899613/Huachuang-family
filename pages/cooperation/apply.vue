<template>
	<view class="wrap_apply">
		<view class="content" v-if="option.type=='1'">
			<view class="ul">
				<view class="li">
					<view class="row1">
						<view class="row">
							<view class="nominal">
								申请人
							</view>
							<view class="input box-1">
								<input placeholder="请填写您的真实姓名" type="text" v-model="params.realName" />
								
							</view>
							<view class="icon">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
						<view class="row">
							<view class="nominal">
								联系方式
							</view>
							<view class="input box-1">
								<input placeholder="请输入您的联系方式" type="text" v-model="params.telephone" />
							</view>
							<view class="icon">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
						<view class="row">
							<view class="nominal">
								银行卡
							</view>
							<view class="input box-1">
								<input  placeholder="请去绑定银行卡" type="text" v-model="params.bankId" />
							</view>
							<view class="icon">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
					</view>
					
					
					
					
					
					
					
					
	
					
				</view>
			</view>
		</view>
		<view class="content" v-if="option.type=='2'">
			<view class="ul">
				<view class="li">
					<view class="row1">
						<view class="row">
							<view class="nominal">
								企业名称
							</view>
							<view class="input box-1">
								<input placeholder="请填写您的企业名称" type="text" v-model="params.company" />
								
							</view>
							<view class="icon">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
						<view class="row">
							<view class="nominal">
								联系人
							</view>
							<view class="input box-1">
								<input placeholder="请输入您的真实名称" type="text" v-model="params.realName" />
							</view>
							<view class="icon">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
						<view class="row">
							<view class="nominal">
								联系方式
							</view>
							<view class="input box-1">
								<input placeholder="请输入您的联系方式" type="text" v-model="params.telephone" />
							</view>
							<view class="icon">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
						
					</view>	
				</view>
			</view>
		</view>
		
		
		
		
		<view class="ruler">
			<view class="ruler_title">
				推广规则
			</view>
			
			<view class="ruler_content">
				（1）提交公司合作申请后，华创世家书院客服将于1-2个工作日内与您联系，需提供相关资料及签订合作协议，即可成为华创世家书院合作。
			</view>
			<view class="ruler_content">
				（2）公司成为合作方后，可将任意课程链接分享给客户，客户成交后，可在传承中心看到推广情况。 
			</view>
			<view class="ruler_content">
				（3）若在开课前一个月，学员退款，则视为订单未完成，该笔订单将不计入可提现金额的业绩当中（之前已计入的会重新计算，以刷新后的为准。
			</view>
			<view class="ruler_content">
				（4）由合作方邀请的客户（以下简称学员）每次购课支付成功且线下核销课程后，该订单可计入传承使者的业绩，传承使者可在“我的-可提现金额”看到明细。
			</view>
			<view class="ruler_content">
				（5）公司主账号可以查看所有二级传承使者的业绩情况、推广情况、客户数量等，二级传承使者的提成由合作方自行发放。
			</view>
			<view class="ruler_content">
				（6）每月华创世家书院将扣除手续费6‰提现手续费后，按照与合作方的分成比例进行结算，具体结算规则以《公司合作协议》为准。
			</view>
			
			
			
			
		</view>
		
		<view class="addBtn btn" @click="submit">申请合作</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel:"",
				option:{},
				params:{
					realName:"",
					telephone:"",
					type:"",
					bankId:"",
					company:"",
				},
				userInfo:{},
				fddInfo:{},
				orderInfo:{},
				customer_id:"",
				extensionIndex:{},
				BankInfo:""
				
			};
		},
		onLoad(option) {
			this.option=option
			console.log('optino:', this.option)
			this.params.type=this.option.type
			this.pageInit()	
		},
		onShow() {
			this.getUserInfo()
			//this.getBankInfo()
		},
		
		
		methods:{
			//绑定银行卡
			bangDingCard(){
				this.$f.jump('/pages/user/bank/bank')
			},
			
			getBankInfo(){
				this.$u.api.getBankInfo({
					}).then(res=>{
					this.params.bankId=res.data.bankInfo.bankId
					console.log(res.data.bankId,'银行卡')
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
			//注册法大大
			registerFdd(){
				let that = this;
				this.$u.api.signCode({
						open_id:this.userInfo.userPhone,
						account_type:this.$c.account_type
					}).then(res=>{
						let option = {
							app_id:this.$c.app_id,
							timestamp:res.data.timestamp,
							v:this.$c.v,
							msg_digest:res.data.signCode,
							open_id:this.userInfo.userPhone,
							account_type:this.$c.account_type
						}
					uni.request({
						url: that.$c.fddApiUrl+"account_register.api",
						header: {
							'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
						},
						data: option,
						method: 'POST',
						success: function(result){
							var res = result.data;
							console.log(res,'updata....')
							that.customer_id = res.data
							uni.setStorageSync('customer_id',that.customer_id)
							that.getFddUrl()
						},
						fail:function(err){
							console.log(err);
						}
					});
			
				})
			},
			
			
			//页面初始化
			pageInit(){
				let title=""
				if(this.option.type=='1'){
					title='个人合作申请'
				}else{
					title='企业推广'
				}
				uni.setNavigationBarTitle({
				　　title:title
				})
				this.getExtensionIndex()
			},
			submitBuy(){
				let that = this;
				console.log('判断是否实名认证：', this.fddInfo.customerId);
				//如果未注册
				if(!this.fddInfo.customerId){
					//去注册  走实名认证
					this.registerFdd()
				}else{
					this.isRz(function(res){
						//未审核 或者 审核未通过 重新认证 已注册    已通过为2
						console.log('审核状态：', res.data.person.status);
						if(res.data.person.status!=2){
							wx.navigateToMiniProgram({
								appId:'wx855361a721050c6b',
								path: 'pages/result-loading/result-loading?verifyUrl=' + encodeURIComponent(that.fddInfo.url),
								envVersion: 'release',
								success(res) {
									console.log(res)
									uni.request({
										url: "http://huachuang.yxy5g.com/home/fddNotify",
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
							//生成订单  去签署合同
							
							that.upcontract()
							
						}
					})
				}
			},
			
			
			//合同上传
			upcontract(){
				let that = this
				let customer_id = this.fddInfo.customerId //法大大账号
				let contract_id = this.orderInfo.contractId;//合同Id
				let doc_title = this.orderInfo.signTitle;
				let doc_url = this.orderInfo.contractUrl;
				let userAgreementId  = this.orderInfo.userAgreementId //交易号
				console.log(contract_id,userAgreementId,'合同id  交易号')
				uni.setStorageSync('userAgreementId',userAgreementId)
				console.log(this.orderInfo,'this.orderInfo')
				this.$u.api.signCode({
						contract_id: contract_id,//合同id
					}).then(res=>{
						// res.data.signCode
					let option = {
						app_id:this.$c.app_id,
						timestamp:res.data.timestamp,
						v:this.$c.v,
						msg_digest:res.data.signCode,
						contract_id: contract_id,
						doc_title: doc_title,
						doc_url: doc_url,
						doc_type: '.pdf'
					}
					uni.request({
						url: that.$c.fddApiUrl+"uploaddocs.api",
						header: {
							'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
						},
						data: option,
						method: 'POST',
						success: function(result){
							var res = result.data;
							console.log(result,'合同上传....')
							// that.$f.jump('/pages/pay/payOrder?id='+userAgreementId)
							// return false
							that.$f.jump('/pages1/web-view/web-view?contract_id='+contract_id+'&customer_id='+customer_id+'&doc_title='+doc_title+'&doc_url='+doc_url+'&transaction_id='+userAgreementId+'&type='+that.params.type,3)
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
							app_id:this.$c.app_id,
							timestamp:res.data.timestamp,
							v:this.$c.v,
							msg_digest:res.data.signCode,
							verified_serialno:this.fddInfo.transactionId
						}
						uni.request({
							url:  that.$c.fddApiUrl+"find_personCertInfo.api",
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
							},
							fail:function(err){
								console.log(err);
							}
						});
			
				})
			
			},
			
			//查询是否可以申请
			
			getExtensionIndex(){
				this.$u.api.extensionIndex({}).then(res=>{
					if(res.code==200){
						
						this.extensionIndex=res.data.extensionIndex
						console.log('1111',this.extensionIndex)
						
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
			submit(){
				if(this.params.type==1){
					
					if(this.params.realName==''){
						uni.$u.toast("请输入您的姓名");
						return
					}
					
					
					if(!this.$f.isPhoneNum(this.params.telephone)){
						uni.$u.toast("请输入正确的电话号码");
						return
					}
					if(!this.$f.isNumber(this.params.bankId)){
						uni.$u.toast("请输入正确的银行卡号");
						return
					}
				}else{
					if(this.params.company==''){
						uni.$u.toast("请输入您的企业名称");
						return
					}
					if(this.params.realName==''){
						uni.$u.toast("请输入您的真实名称");
						return
					}
					
					if(!this.$f.isPhoneNum(this.params.telephone)){
						uni.$u.toast("请输入正确的电话号码");
						return
					}
					
				}
				if(this.extensionIndex.code=='-1'){
					// this.$f.jump('/pages/cooperation/index?type='+this.option.type)
					
					let params={
						realName:this.params.realName,
						telephone:this.params.telephone,
						type:this.params.type,
						bankId:this.params.type==1?this.params.bankId:'',
						company:this.params.company,
						
					}
					this.$u.api.cooperationApply(this.params).then(res=>{
						if(res.code==200){
								
							if(this.option.type==1){
								//走签合同页面
								this.orderInfo=res.data.info
								this.submitBuy()
							}else{
								this.$f.jump('/pages/cooperation/withdrawal/succ?type='+this.option.type,3)
							}
								
						}else{
							uni.showModal({
							    title: '提示',
							    content: res.message,
							    success: function (res) {
							        
							    }
							});
						}
					})
				}else if(this.extensionIndex.code=='-2'){
					this.$f.jump('/pages/cooperation/withdrawal/succ?type='+this.option.type,3)
				}else{
					this.$f.jump('/pages/cooperation/index?type='+this.option.type)
				}	
			},
			//保存法大大注册 实名认证信息
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
			getFddUrl(){
					//个人 实名认证
					let verified_way = 1;//实名认证套餐类型： 0：三要素标准方 案；1：三要素补充方 案；2：四要素标准方 案；3：四要素补充方 案；4：纯三要素方案； 5：纯四要素方案； 9：人脸识别方案
					let page_modify = 2; //是否允许用户修改界面 1 允许 2不允许
					let notify_url = 'http://huachuang.yxy5g.com//home/fddNotify';//回调地址
					let return_url = 'pages/cooperation/apply?type='+this.option.type;//认证结果返回地址
					let is_mini_program = 1;//是否小程序认证。默认为0 1代表小程序认证,0非小程序
					let cert_flag = 1;
					console.log('第一次认证并保存认证链接');
					let that = this;
					this.$u.api.signCode({
							customer_id:this.customer_id,
							verified_way,
							page_modify,
							cert_flag,
							notify_url,
							is_mini_program,
							return_url,
						}).then(res=>{
							let option = {
								app_id:this.$c.app_id,
								timestamp:res.data.timestamp,
								v:this.$c.v,
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
								url:  that.$c.fddApiUrl+"get_person_verify_url.api",
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
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.wrap_apply{
		padding-bottom:110rpx;
		
		.ruler{
			padding: 20rpx;
			.ruler_title{
				padding: 30rpx 0;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #090925
			}
			.ruler_content{
				font-size: 24rpx;
				color: #666666;
				margin-bottom: 20rpx;
			}
			
		}
		.content{
			.ul{
				background-color: #fff;
				.li{
					
					background-color: white;
					.th{
						font-size:30rpx;
					}
					.addInfor{
						color:#CBA668 ;
						font-size:26rpx;
						padding:20rpx 0;
						text-align: center;
					}
					
					.row1{
						background-color: #fff;
						.row{
							justify-content: space-between;
							margin:0 20rpx;
							padding: 20rpx 0;
							border-bottom: solid 1upx #eee;
							background-color: #fff;
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
				}
			}
		}
		.btn{
			width: 700rpx;
			height: 90rpx;
			line-height:90rpx;
			background: #106DF7;
			border-radius: 15rpx;
			color:#fff;
			text-align: center;
		}
		.addBtn{
			position:fixed;
			bottom:30rpx;
			left:25rpx;
		}
	}
</style>
