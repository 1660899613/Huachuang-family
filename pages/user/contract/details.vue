<template>
	<view class="">
		<view class="wrap" v-if="iscontact">
			<view class="tp">
				<view class="title">
					{{signTitle}} 
				</view>
				<view class="desc">
					状态 <text class="state1">{{result_desc}}</text>
				</view>
				<view class="htInfor">
					<!-- <view class="li">发起方： 法大大</view> -->
					<view class="li">发起时间：{{date}}</view>
					<view class="li">截至签署：{{endTime}}</view>
				</view>
			</view>
			<view class="wdInfor" v-if="view_url">
				<!-- <view class="title" @click="$f.jump('/pages1/web-view/look-web?url='+view_url)">签约文档</view> -->
				<view class="title" @click="contactWorld">签约文档</view>
			</view>
		</view>
		<web-view v-if="!iscontact" :src="myUrl" @message="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				fddInfo:{},
				userInfo:{},
				contractId:'',
				download_url: '',
				view_url: '',
				signTitle:"",
				date:"",
				endTime:"",
				result_desc:"",
				myUrl:"",
				iscontact:true
			};
		},
		onLoad(option){
			this.id = option.id
			this.contractId = option.contractId
			this.date=option.date
			this.signTitle=option.signTitle
			console.log(option)
			this.getUserInfo()
		},
		methods:{
			
			contactWorld(){
				let url=this.view_url.replace('https://testapi.fadada.com:8443/api//','https://testapi01.fadada.com/api/')
				this.myUrl=url
				this.iscontact=false
				// uni.navigateTo({
				// 	url:`/pages1/web-view/look-web?url=${encodeURIComponent(JSON.stringify(url))}`
				// })
			},
			getUserInfo(){
				this.$u.api.getUserInfo({
					}).then(res=>{
					this.userInfo = res.data.userInfo
					this.fddInfo = res.data.fddInfo
					console.log(this.fddInfo,this.userInfo,'用户信息')
					this.querySignResult()
				})
			},
			//合同签署查询
			querySignResult(){
				let that = this;
				let customer_id = this.fddInfo.customerId
				// let userAgreementId = uni.getStorageSync('userAgreementId')
				this.$u.api.signCode({
						transaction_id: this.id,//合同交易号
						customer_id:customer_id, //客户编号
						contract_id: this.contractId,//合同编号
					}).then(res=>{
						// res.data.signCode
					console.log(res,'data 合同签署')
					let option = {
						app_id:this.$c.app_id,
						timestamp:res.data.timestamp,
						v:this.$c.v,
						msg_digest:res.data.signCode,
						transaction_id: this.id,
						contract_id: this.contractId,
						customer_id:customer_id,
					}
					uni.request({
						url: that.$c.fddApiUrl+"api/query_sign_result.api",
						header: { 
							'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
						},
						data: option, 
						method: 'POST',
						success: function(result){
							var res = result.data;
							console.log(result,'合同结果查询....')
							//签章成功
							if(!result.data.data){
								that.$u.toast(result.data.msg)
							}
							
							if(result.data.data.result==3000){
								that.view_url = result.data.data.view_url
								that.download_url = result.data.data.download_url
								that.result_desc = result.data.data.result_desc
								that.endTime = result.data.data.endTime
								
							}else{
								
							}
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
	.wrap{
		.wdInfor{
			.title{
				font-size:26rpx;
				color:#666;
				padding:20rpx 30rpx;
				background-color: #F6F7FB;
			}
		}
		.tp{
			padding:30rpx;
			.title{
				font-size:36rpx;
			}
			.desc{
				color:#999;
				font-size:24rpx;
				.state1{
					color:#007AFF;
					margin-left:10rpx;
				}
				margin:20rpx 0;
			}
			.htInfor{
				background-color: #f5f5f5;
				padding:20rpx;
				border-radius: 10rpx;
				.li{
					padding:10rpx 0;
					color:#333333;
					font-size:26rpx;
				}
			}
			
		}
	
	}
</style>
