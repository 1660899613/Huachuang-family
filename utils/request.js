import config from './config.js';
export default {
	request(options = {}) {
		return new Promise((resolve, reject) => {
			let url = options.url;
			// console.log(url,'url')
			//#ifdef MP
			if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
				options.url = config.domain + url;
			}
			//#endif
			//#ifdef APP-PLUS
			if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
				options.url = config.domain + url;
			}
			//#endif
			//#ifdef APP-PLUS-NVUE
			if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
				options.url = config.domain + url;
			}
			console.log(options,'请求参数')
			//#endif
			options.header["content-type"] = 'application/x-www-form-urlencoded;charset=UTF-8';
			options.header.uToken = uni.getStorageSync("token");
			options.header.apikey = "773EDB6D2715FACF9C93354CAC5B1A3372872DC4D5AC085867C7490E9984D33E";
			options.header.hversion = '1.0';
			options.complete = (response) => {
				console.log(response,'33333')
				if (response.statusCode == 200) {
					if (response.data.code == 700) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
					}
					// if (response.data.code == 400) {
					// 	uni.showToast({
					// 		title: response.data.msg,
					// 		icon: "none"
					// 	});
					// }
					resolve(response.data)
				} else {
					uni.showToast({
						title: '请求异常！',
						icon: "none"
					});
				}
			}

			uni.request(options)
		})
	},

	post(url, data = {}, header = {}) {

		let options = {
			url: url,
			data: data,
			header: header,
			method: "POST"
		}

		return this.request(options);
	},

	get(url, data = {}, header = {}) {
		let options = {
			url: url,
			data: data,
			header: header
		}

		return this.request(options);
	}
};