/**
 * 是否是字符串
 * @param {Object} value
 */
function isString(value) {
	return typeof value === 'string'
}

/**
 * 是否没有值
 * @param {Object} value
 */
function isNotValue(value) {
	return value === undefined || value === null
}

export {
	isString,
	isNotValue
}