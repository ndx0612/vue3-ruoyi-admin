// PS:为了方便,将全局的方法挂载到proxy原型的全局上。
// proxy.util.function()


const SIGN_REGEXP = /([yMdhsm])(\1*)/g
const DEFAULT_PATTERN = "yyyy-MM-dd"

// 个位日期补0
function padding(s, len) {
	len = len - (s + "").length
	for (var i = 0; i < len; i++) {
		s = "0" + s
	}
	return s
}

export default {
	/**
	 * @description: 时间戳转日期对象 默认当前日期
	 * @param {number} date 时间戳
	 * @param {string} pattern 时间格式
	 * @return {*}
	 */
	formatDate(date, pattern) {
		if (!date) {
			return '-'
		}
		if (typeof date == "string") date = Number(date)
		if (typeof date == "string" || typeof date == "number") {
			date = new Date((date + "").length == 10 ? date * 1000 : date)
		}
		pattern = pattern || DEFAULT_PATTERN
		return pattern.replace(SIGN_REGEXP, function ($0) {
			switch ($0.charAt(0)) {
				case "y":
					return padding(date.getFullYear(), $0.length)
				case "M":
					return padding(date.getMonth() + 1, $0.length)
				case "d":
					return padding(date.getDate(), $0.length)
				case "w":
					return date.getDay() + 1
				case "h":
					return padding(date.getHours(), $0.length)
				case "m":
					return padding(date.getMinutes(), $0.length)
				case "s":
					return padding(date.getSeconds(), $0.length)
			}
		})
	},
	/**
	 * @description: 深拷贝
	 * @param {*} source 
	 * @returns 
	 */
	deepClone(source) {
		// 如果类型不是对象
		if (typeof source != "object") {
			return source;
		}
		// 如果为null
		if (source == null) {
			return source;
		}
		var newObj = (source.constructor === Array) ? [] : {}; //开辟一块新的内存空间
		for (var i in source) {
			newObj[i] = deepClone(source[i]);
		}
		return newObj;
	},

	/**
	 * @description: 重置一个对象的所有key的值
	 * @param {Object} obj
	 * @returns {Object}
	 */
	resetObject(obj) {
		for (const item in obj) {
			if (obj[item]) {
				if (obj[item].constructor === Array) {
					obj[item] = []
				} else {
					obj[item] = ""
				}
			}
		}
		return obj
	},
	/**
	 * @description:退出登录
	 */
	logOut() {
		removeStorage("token")
		setTimeout(() => {
			router.push("/login")
		}, 1000);
	}
}