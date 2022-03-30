/**
 * 从styleObject获取样式字符串
 * @param {Object} styleObject
 * uni-app不支持Vue官方文档:Class与Style绑定中的classObject和styleObject语法
 * 但可以用computed方法生成class或style字符串，此时可以使用该方法转换style字符串
 */
function styleFromObject(styleObject) {
	let style_str = ''
	if (styleObject == null) {
		return style_str
	}
	let type = typeof styleObject
	if (type !== "object") {
		return style_str
	}
	let keys = Object.keys(styleObject)
	for (var i = 0; i < keys.length; i++) {
		let key = keys[i]
		try {
			style_str += key + ':' + styleObject[key] + ';'
		} catch(e) {
			console.warn(`styleFromObject转换${key}属性失败`)
		}
	}
	return style_str
}

export {
	styleFromObject
}