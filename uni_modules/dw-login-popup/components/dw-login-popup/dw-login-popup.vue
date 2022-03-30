<template>
	<view class="overlay">
		<view
			class="login-content-bg"
			:animation="animationData"
			@animationstart="bindanimationstart"
			@animationiteration="bindanimationiteration"
			@transitionend="bindtransitionend"
			@animationend="bindanimationend"
		>
			<view class="login-content-img"></view>
			<view class="login-content">
				<view class="login-content-title">
					<image class="icon" :src="logo_url"></image>
					<view class="title">{{ title }}</view>
				</view>
				<view class="text">{{ text }}</view>
				<view class="login" :style="login_style" @click="getUserProfile">{{ loginTitle }}</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { styleFromObject } from '@/uni_modules/dw-utils/js_sdk'
	
	export default {
		name: 'dw-login-popup',
		emits: [
			'beforeUserProfile',
			'userProfileSuccess',
			'userProfileError',
			'animationstart',
			'animationiteration',
			'transitionend',
			'animationEnd'
		],
		props: {
			/**
			 * logo的地址，相对于当前目录的地址
			 */
			logoUrl: {
				type: String,
				default: '../../../../static/logo.png'
			},
			/**
			 * 标题
			 */
			title: {
				type: String,
				default: "欢迎来到西筹OpenAlpha"
			},
			/**
			 * 提示文本
			 */
			text: {
				type: String,
				default: "股票动态分析，基于公募基金持仓的维度"
			},
			/**
			 * 登录按钮文本
			 */
			loginTitle: {
				type: String,
				default: "微信快捷登录"
			},
			/**
			 * 登录按钮样式
			 */
			loginStyle: {
				type: Object,
				default () {
					return {
						background: '#D55A26'
					}
				}
			},
			/**
			 * 关闭动画
			 */
			hidden: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				login_style: {},
				logo_url: '../../../../static/logo.png',
				/**
				 * userInfo Storage key
				 */
				userInfoKey: 'WX_USER_INFO_KEY',
				/**
				 * 动画
				 */
				animationData: '',
				/**
				 * 开启隐藏动画
				 */
				hiddenAnimation: false,
			}
		},
		watch: {
			loginStyle: {
				handler (newValue, oldValue) {
					this.login_style = styleFromObject(newValue)
				},
				immediate: true
			},
			logoUrl: {
				handler (newValue, oldValue) {
					let url = newValue
					if (newValue.startsWith('@')) {
						url = url.replace('@', '../../../..')
					}
					this.logo_url = url
				},
				immediate: true
			},
			hidden: {
				handler (newValue, oldValue) {
					if (!newValue) {
						return
					}
					this.setAnimation()
				},
				immediate: true
			},
		},
		computed: {
			
		},
		methods: {
			/**
			 * 获取用户信息
			 */
			getWxUserProfile: () => {
				return new Promise((resolve, reject) => {
					uni.getUserProfile({
						desc: '西筹OpenAlpha希望获取信息',
						lang:'zh_CN',
						success(res) {
							console.log('dw-login获取用户信息成功', res);
							resolve(res)
						},
						fail(err) {
							console.log('dw-login获取用户信息失败', err);
							reject(err)
						},
						complete() {
							console.log('dw-login获取用户信息完成');
						}
					})
				})
			},
			/**
			 * 获取用户信息
			 */
			getUserProfile() {
				this.setAnimation()
				this.$emit('beforeUserProfile')
				this.getWxUserProfile()
				.then((res) => {
					this.$emit('userProfileSuccess', {
						res,
					})
				})
				.catch((err) => {
					this.$emit('userProfileError', {
						err,
					})
				})
			},
			/**
			 * 设置动画
			 */
			setAnimation() {
				this.hiddenAnimation = true
				// 创建动画
				let animation = wx.createAnimation({
					duration: 400,
				})
				// 描述动画步骤
				animation.bottom(-326).step()
				// 导出动画数据传递给组件的animation属性,否则动画不会执行
				this.animationData = animation.export()
			},
			/**
			 * 动画开始
			 */
			bindanimationstart() {
				console.log('CSS 动画开始')
				this.$emit('animationstart', this.hiddenAnimation)
			},
			/**
			 * 动画结束一个阶段
			 */
			bindanimationiteration() {
				console.log('CSS 动画结束一个阶段')
				this.$emit('animationiteration', this.hiddenAnimation)
			},
			/**
			 * bindtransitionend监听的是wx.createAnimation 结束一个阶段而不是整个动画的结束（也就是一个step()结束）
			 */
			bindtransitionend() {
				console.log('CSS 渐变结束或 wx.createAnimation 结束一个阶段')
				this.$emit('transitionend', this.hiddenAnimation)
			},
			/**
			 * 动画开始
			 */
			bindanimationend() {
				console.log('CSS 动画结束')
				this.$emit('animationEnd', this.hiddenAnimation)
			},
		},
		mounted() {
			
		}
	}
</script>
<style lang="scss" scoped>
	.overlay {
		position: fixed;
		left: 0px;
		top: 0px;
		height: 100vh;
		width: 100vw;
		background: rgba(0, 0, 0, 0.5);
		.login-content-bg {
			height: 415px;
			width: 100vw;
			position: absolute;
			bottom: 0px;
			left: 0px;
			animation-name: showAnimation;
			animation-duration: 400ms;
			animation-iteration-count: 1;
			animation-timing-function: linear;
			.login-content-img {
				position: absolute;
				top: 0px;
				left: 0px;
				width: 85px;
				height: 132px;
				margin-left: 24px;
				background-image: url("../../static/login-left-top-icon.png");
				background-size: 85px 132px;
			}
			.login-content {
				margin-top: 89px;
				height: 326px;
				width: 100vw;
				border-top-left-radius: 8px;
				border-top-right-radius: 8px;
				background: #FFFFFF;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-start;
				.login-content-title {
					width: 100vw;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 72px 52px 0px 52px;
					.icon {
						width: 42px;
						height: 42px;
						flex-grow: 0;
						flex-shrink: 0;
						margin-right: 8px;
					}
					.title {
						font-size: 20px;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #323232;
						line-height: 28px;
					}
				}
				.text {
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #323232;
					line-height: 20px;
					text-align: center;
					margin: 9px 0px 62px 0px;
				}
				.login {
					width: 184px;
					height: 40px;
					background: #D55A26;
					border-radius: 4px;
					font-size: 17px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 40px;
					text-align: center;
				}
			}
		}
	}
	@keyframes showAnimation {
		from {
			bottom: -326px;
		}
		to {
			bottom: 0px;
		}
	}
	@keyframes hiddenAnimation {
		from {
			bottom: 0px;
		}
		to {
			bottom: -326px;
		}
	}
</style>
