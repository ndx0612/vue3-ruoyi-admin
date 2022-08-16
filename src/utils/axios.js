import axios from 'axios'
import { ElMessage } from 'element-plus'
import { setStorage, getStorage, removeStorage } from "@/utils/storage";

// 配置请求头
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8;"

// 配置baseURL
axios.defaults.baseURL = "/api"

// 配置请求token
axios.defaults.headers["access-token"] = getStorage("token") || ""


// 响应拦截器
axios.interceptors.response.use(
  // 请求成功
  (res) => {
    switch (res.data.errCode) {

      // 请求并响应成功
      case 0:
        if (res.data.data && window.location.hash == '#/login') {
          const newToken = res.data.data ? res.data.data["access-token"] || "" : ""
          setStorage("token", newToken)
        }
        break

      // 未登录
      case -1:
        ElMessage({
          message: "未登录, 请登录后再进行操作!",
          type: "warning",
        })
        removeStorage("token")
        setTimeout(() => {
          router.push("/login")
        }, 1000);
        break

      // 登录过期
      case -2:
        ElMessage({
          message: "登录过期，请重新登录!",
          type: "warning",
        })
        removeStorage("token")
        setTimeout(() => {
          router.push("/login")
        }, 1000);
        break

      // 其它错误
      default:
        console.log('发送请求错误', res.data.errDesc);
        
    }
    return res.data
  },

  // 请求失败
  (error) => {
    if (error.response.status == 404) {
      ElMessage({
        message: "请求地址不存在!",
        type: "error",
      })
    } else if (error.response.status == 500) {
      ElMessage({
        message: "服务器出错!",
        type: "error",
      })
    } else {
      ElMessage({
        message: error.response.statusText,
        type: "error",
      })
    }
    return Promise.reject(error.response)
  }
)

/**
 * @description: 过滤参数空值
 * @param {string} param:参数
 */
const formatParams = (param) => {
  Object.keys(param).forEach((item) => {
    if (
      param[item] === "" ||
      param[item] === null ||
      param[item] === undefined
    ) {
      delete param[item]
    }
  })
  return param
}

/**
 * @description: post请求
 * @param {string} url:请求地址
 * @param {string} param:参数
 * @param {boolean} notFilter(是否对param进行空数据过滤。true:不过滤;false:过滤;)
 */
function post(url, param = {}, notFilter = false) {
  // 目前编辑接口不进行空数据过滤
  if (!notFilter) {
    formatParams(param)
  }
  axios.defaults.timeout = 6000 // 响应时间
  return new Promise((resolve, reject) => {
    /* 目前无需转换类型 qs.stringify(param) */
    axios
      .post(url, param)
      .then(
        (res) => {
          resolve(res)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * @description: get请求
 * @param {string} url:请求地址
 * @param {string} param:参数
 * @param {boolean} notFilter(是否对param进行空数据过滤。true:不过滤;false:过滤;)
 */
function get(url, param = {}, notFilter = false) {
  // 目前编辑接口不进行空数据过滤
  if (!notFilter) {
    formatParams(param)
  }
  axios.defaults.timeout = 6000 // 响应时间
  return new Promise((resolve, reject) => {
    /* 目前无需转换类型 qs.stringify(param) */
    axios
      .get(url, param)
      .then(
        (res) => {
          resolve(res)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * @description: delete请求
 * @param {string} url:请求地址
 */
function del(url) {
  // 目前编辑接口不进行空数据过滤
  axios.defaults.timeout = 6000 // 响应时间
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(
        (res) => {
          resolve(res)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * @description: put请求
 * @param {string} url:请求地址
 * @param {string} param:参数
 * @param {boolean} notFilter(是否对param进行空数据过滤，true:不过滤；fase:过滤；)
 */
function put(url, param = {}, notFilter = false) {
  // 目前编辑接口不进行空数据过滤
  if (!notFilter) {
    formatParams(param)
  }
  axios.defaults.timeout = 6000 // 响应时间
  return new Promise((resolve, reject) => {
    /* 目前无需转换类型 qs.stringify(param) */
    axios
      .put(url, param)
      .then(
        (res) => {
          resolve(res)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  get,
  post,
  del,
  put
}
