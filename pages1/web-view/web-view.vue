<template>
	<view>
		<web-view :src="srcurl" @message="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				srcurl: '',
				thisUrl:'',
				contract_id: "",
				doc_title: "",
				doc_url: "",
				transaction_id: "",
				type:""
			}
		},
		onLoad(options) {
			if (options && options.transaction_id) {
				this.customer_id = options.customer_id
				this.contract_id = options.contract_id
				this.doc_title = options.doc_title
				this.doc_url = options.doc_url
				this.transaction_id = options.transaction_id
				this.type=options.type
				console.log("查看合同参数",options)
				this.contractQs()
			}else{
				
			}
		},
		onShow() {
			
		},
		methods: {
			//合同签署
			contractQs(){
				console.log('合同签署')
				// let customer_id = uni.getStorageSync('customer_id')
				let open_environment = 1;
				let return_url=""
				if(this.type==1){
					return_url='pages/cooperation/withdrawal/succ?type='+this.type
				}else{
					return_url= 'pages/pay/payOrder?id='+this.transaction_id+'&otherId='+this.contract_id;
				}
				let position_type = 1;
				let signature_positions = [
					{
						'pagenum':3,
						'x':250,
						'y':240
					},
					{
						'pagenum':3,
						'x':540,
						'y':760
					}
				]
				console.log(JSON.stringify(signature_positions))
				let that = this;
				this.$u.api.signCodeForSign({
						transaction_id: this.transaction_id,
						customer_id:this.customer_id,
					}).then(res=>{
					let option = {
						app_id:this.$c.app_id,
						timestamp:res.data.timestamp,
						v:this.$c.v,
						msg_digest:res.data.signCode,
						open_environment:2,
						transaction_id: this.transaction_id, //交易号 订单号
						contract_id: this.contract_id,
						customer_id:this.customer_id,
						doc_title: encodeURIComponent(this.doc_title),
						return_url: '',
						open_environment:open_environment,
					}
					let url = that.$c.fddApiUrl+'extsign.api'+
								'?app_id='+this.$c.app_id+
								'&mobile_sign_type=2'+
								'&writing_track=1'+
								'&open_environment='+open_environment+
								'&return_url='+return_url+
								'&timestamp='+res.data.timestamp+
								'&v='+this.$c.v+
								'&msg_digest='+res.data.signCode+
								'&transaction_id='+this.transaction_id+
								'&contract_id='+this.contract_id+
								'&customer_id='+this.customer_id+
								'&doc_title='+encodeURIComponent(this.doc_title)+
								'&position_type='+ position_type+
								'&signature_positions='+ encodeURIComponent(JSON.stringify(signature_positions));
					console.log(url,'路径')
					this.srcurl = url
					uni.hideLoading();
				})
			},
			getMessage(event) {
				console.log(event)
				uni.showModal({
					content: JSON.stringify(event.detail),
					showCancel: false
				});
			},
		}
	}
</script>

<style>

</style>
