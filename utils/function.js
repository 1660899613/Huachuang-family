export default {
	// 通过时间戳  返回 全部时间
	getFullTime(a) {
	  let b = new Date(a)
	  var y = b.getFullYear()
	  var mon = b.getMonth() + 1
	  var day = b.getDate()
	  var h = b.getHours()
	  h = h < 10 ? '0' + h : h
	  var m = b.getMinutes()
	  m = m < 10 ? '0' + m : m
	  var s = b.getSeconds()
	  s = s < 10 ? '0' + s : s
	  // return y + '年' + mon + '月' + day + '日' + h + ':' + m + ':' + s
	  return y + '年' + mon + '月' + day + '日 ' + h + ':' + m
	},
	// 公共跳转方法
	jump(url, type = 1) {
		// 保留当前页面，跳转到应用内的某个页面
		if (type == 1) {
			uni.navigateTo({
				url: url
			})
		}

		// 关闭当前页面，跳转到应用内的某个页面
		if (type == 2) {
			uni.redirectTo({
				url: url
			})
		}
		// 关闭所有页面，打开到应用内的某个页面
		if (type == 3) {
			uni.reLaunch({
				url: url
			})
		}

		// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
		if (type == 4) {
			uni.switchTab({
				url: url
			})
		}
	},
	tostring(value){
		return JSON.stringify(value);
	},
	 /**
	   * 判断手机是否符合格式--1开头，11位数字
	   * @param {*} phoneNumber //手机号前三位
	   */
	isPhoneNum(phoneNumber) {
	    if (typeof phoneNumber !== 'string') {
	      console.error('入参格式：string');
	      return false;
	    }
	    ;
	    return /^1[\d]{10}$/.test(phoneNumber);
	},
	
	isNumber(value) {         //验证是否为数字
	    var patrn = /^(-)?\d+(\.\d+)?$/;
	    if (patrn.exec(value) == null || value == "") {
	        return false
	    } else {
	        return true
		}
	}
}
