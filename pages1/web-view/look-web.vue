<template>
	<view>
		<web-view :src="myUrl" @message="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myUrl: '',
				thisUrl:'',
				contract_id: "",
				doc_title: "",
				doc_url: "",
				transaction_id: "",
			}
		},
		onLoad(options) {
			this.myUrl =decodeURIComponent(options.url) 
			console.log('this.myUrl',this.myUrl)
		},
		onShow() {
			
		},
		methods: {
			
				
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
