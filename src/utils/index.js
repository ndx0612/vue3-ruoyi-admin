import { deepClone } from "outils";
import { onUnmounted, ref, isRef, unref, watch } from "vue"

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
	 * 
	 * @description: 列表处理纯逻辑封装
	 * @param {string} url 列表请求地址
	 * @param {object} params 列表请求参数
	 * @param {boolean} immediately 立马调用,注册时候就调用
	 * @return {tableData, error, loading, total, getTableList}
	 */
	useTableList(url, params, immediately = true) {
		const data = ref([])
		const error = ref(null)
		const total = ref(0)
		const loading = ref(false)

		function doRequest() {
			// 在请求之前重设状态...
			data.value = []
			error.value = null
			// unref() 解包可能为 ref 的值
			loading.value = true
			post(unref(url), _.cloneDeep(unref(params)))
				.then((res) => {
					console.log("res", res)
					data.value = res?.data?.records || res?.records || []
					total.value = res?.data?.total || res?.total || 0
				})
				.catch((err) => {
					console.log("err", err)
					error.value = err
				})
				.finally(() => {
					loading.value = false
				})
		}

		if (immediately) doRequest()
		var unwatch = watch(params, (newValue, oldValue) => {
			doRequest()
		})

		// 页面卸载 销毁监听
		onUnmounted(() => {
			unwatch()
		})

		return { tableData: data, error, loading, total, getTableList: doRequest }
	}

}