<template>
	<view class="inforContent">
		<view class="wrapContent" v-if="false">
			<u--form :model="model" errorType="toast" border="false" :rules="rules" ref="uForm">
				<u-form-item
					label="姓名"
					class="itemForm"
					label-position="labelPosition"
					prop="name" 
					border="false"
					:label-width="labelWidth">
					<u-input 
						placeholderStyle="color:#848383"
						border="false"
						placeholder="请输入姓名"
						v-model="model.name" 
						type="text"></u-input>
					
				</u-form-item>
				<u-form-item
				class="itemForm"
				:label-position="labelPosition" label="身份证号" prop="password" :label-width="labelWidth">
					<u-input
					placeholderStyle="color:#848383"
					:password-icon="true" 
					border="false" 
					type="password" 
					v-model="model.password" 
					placeholder="请输入身份证号码"></u-input>
				</u-form-item>
				<u-form-item
				class="itemForm"
					label-position="labelPosition"
					prop="phone" 
					border="false"
					label="手机"
					:label-width="labelWidth">
					<u-input
						placeholderStyle="color:#848383"
						border="false"
						placeholder="请输入有效的手机号码"
						v-model="model.phone" 
						type="number"></u-input>
				</u-form-item>
				
				<u-form-item 
				class="itemForm"
				label="验证码"
				:label-position="labelPosition" prop="dcode" :label-width="labelWidth">
					<u-input
					placeholderStyle="color:#848383"
					:password-icon="true" 
					border="false" 
					type="password" 
					prop="dcode" 
					v-model="model.dcode" 
					placeholder="请输入获取的验证码"></u-input>
					<view slot="right">
						<view class="wrap">
								<u-toast ref="uToast"></u-toast>
								<u-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
								@change="codeChange"></u-code>
								<view @tap="getCode">{{tips}}</view>
							</view>
					</view>
				</u-form-item>
			</u--form>
		</view>
		<view class="nextBtn" @click="nextClick">下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: '',
				// refCode: null,
				seconds: 10,
				codeTips: '',
				labelWidth:90,
				password:123456,
				type:1,
				labelPosition: 'left',//表单域提示文字的位置
				border: false,
				model:{
					ycode: '',//邀请码					// dcode:'',//验证码
					name: '',//昵称
					phone: '',
					password:'',
					passwords: '',
					rdSure: 1,
				},
				//验证
				rules:{
					ycode: [
						{
							required: true,
							message: '请填写邀请码',
							trigger: 'change',
						}
					],
					name:  [
						{
							required: true,
							message: '请输入平台的呢陈',
							trigger: 'change',
						}
					],
					passwords:  [
						{
							required: true,
							message: '请再次输入密码',
							trigger: 'change',
						}
					],
					phone: [
						{
							required: true,
							message: '请输入手机号',
							trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change','blur'],
						}
					],
					password: [
						{
							required: true,
							message: '请输入密码',
							trigger: ['change','blur'],
						}
					],
				
				},
				app_id:406077,
				app_secret:'Xt4yN3Fzgr1xd11kCbHFx6Fk',
				timestamp:this.generateTimeReqestNumber(),
				timestamp2:this.generateTimeReqestNumber(),
				account_type:1,
				open_id:'18375875809',
				v: '2.0',
				customer_id: '',
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			// console.log(md5,sha1,base)
		},
		methods:{
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
			//参数  获取注册签名
			secretData(){
				let app_id = this.app_id;
				let app_secret = this.app_secret;
				let timestamp = this.timestamp;
				let account_type = this.account_type
				let open_id = this.open_id
				let data1 = app_secret+account_type+open_id
				//sha1 加密
				let data2 = this.sha1(data1)
				// console.log(data2,'data2')
				//md5加密 拼接
				let data3 = app_id+this.md5(timestamp)+data2
				// console.log(data3,'data3')
				//再次sha1 加密
				let data4 = this.sha1(data3)
				// console.log(data4,'data4')
				//base64加密
				let data5 = this.base64(data4)
				// console.log(data5,'data1')
				return data5
			},
			//参数 获取认证url签名
			getUrlCode(){
				// let timestamp = '20220228144355'
				
				let timestamp = this.timestamp
				let app_id = this.app_id;
				let customer_id = this.customer_id;
				let app_secret = this.app_secret;
				let verified_way = "0";//实名认证套餐类型： 0：三要素标准方 案；1：三要素补充方 案；2：四要素标准方 案；3：四要素补充方 案；4：纯三要素方案； 5：纯四要素方案； 9：人脸识别方案
				let page_modify = "2"; //是否允许用户修改界面 1 允许 2不允许
				let data1 = app_secret+customer_id+page_modify+verified_way;
				
				console.log(data1,' sha1加密前')
				let data2 = this.sha1(data1)
				console.log(data2,' sha1加密后')
				let data3 = app_id+this.md5(timestamp)+data2
				console.log(this.md5(timestamp),'md5加密')
				console.log(data3,'data3')
				let data4 = this.sha1(data3)
				console.log(data4,' sha1加密后')
				let data5 = this.base64(data4)
				console.log(data5,' base64加密后')
				return data5
			},
			sort_ascii(obj) {
				let arr = new Array();
				let num = 0;
				for (let i in obj) {
					arr[num] = i;
					num++;
				}
				let sortArr = arr.sort();
				//let sortObj = {};    //完成排序值
				let str = '';             //自定义排序字符串
				for (let i in sortArr) {
					str += sortArr[i] + '=' + obj[sortArr[i]] + '&';
					//sortObj[sortArr[i]] = obj[sortArr[i]];
				}
				//去除两侧字符串
				let char = '&'
				str = str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
	
				return str;
				//return sortObj;
			},
			nextClick(){
				let msg_digest = this.secretData()
				let that = this;
				let option = {
					app_id:this.app_id,
					timestamp:this.timestamp,
					v:this.v,
					msg_digest,
					open_id:this.open_id,
					account_type:this.account_type
				}
				uni.request({
					url: "http://test.api.fabigbig.com:8888/api/account_register.api",
					header: { 
						'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
					},
					data: option, 
					method: 'POST',
					success: function(result){
						var res = result.data;
						console.log(res,'updata....')
						that.customer_id = res.data
						that.getFddUrl()
						
					},
					fail:function(err){
						console.log(err);
					}
				});
			},
			getFddUrl(){
				//个人 实名认证
				let msg_digest = this.getUrlCode()
				let verified_way = 0;//实名认证套餐类型： 0：三要素标准方 案；1：三要素补充方 案；2：四要素标准方 案；3：四要素补充方 案；4：纯三要素方案； 5：纯四要素方案； 9：人脸识别方案
				let page_modify = 2; //是否允许用户修改界面 1 允许 2不允许
				let notify_url = '';//回调地址
				let return_url = '';//认证结果返回地址
				console.log(msg_digest,'签名')
				let that = this;
				let option = {
					app_id:this.app_id,
					timestamp:this.timestamp,
					v:this.v,
					customer_id:this.customer_id,
					msg_digest,
					verified_way,
					page_modify
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
						console.log(res.data.url,'updata....')
						that.$f.jump('/pages1/web-view/web-view?url='+res.data.url)
						
					},
					fail:function(err){
						console.log(err);
					}
				});
			},
			codeChange(text) {
				this.tips = text;
			},
			generateTimeReqestNumber() {
				var date = new Date();
				return date.getFullYear().toString() + this.pad2(date.getMonth() + 1) + this.pad2(date.getDate()) + this.pad2(date.getHours()) + this.pad2(date.getMinutes()) + this.pad2(date.getSeconds());
			},
			pad2(n) { return n < 10 ? '0' + n : n },
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				// uni.$u.toast('倒计时结束');
			},
			start() {
				// uni.$u.toast('倒计时开始');
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.inforContent{
		background-color: #fff;
		.wrapContent{
			padding:20rpx;
			.codeBtn{
				width: 190rpx;
				height:68rpx;
				line-height: 68rpx;
				text-align: center;
				// color:white;
				// background: #2D7788;
				font-size:24rpx;
				border-radius: 34rpx;
			}
			
		}
		.nextBtn{
			width: 700rpx;
			height: 100rpx;
			line-height:100rpx;
			background: #C0C0C0;
			border-radius: 15rpx;
			margin:50rpx auto;
			text-align: center;
			color:#fff;
		}
	}
</style>
