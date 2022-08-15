//导入axios
import axios from 'axios'
import api from "@/api/index.js"
import { ElMessage } from 'element-plus'
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8;" // 配置请求头

axios.defaults.baseURL = api.http // 配置接口地址
// console.log(axios.defaults.baseURL);

// 传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做某件事
    const token = localStorage.getItem("token") || "" // 获取token
    token && (config.headers["access-token"] = token)
    config.headers['sys-admin-token'] = 'sys-admin-token'
    return config
  },
  (error) => {
    console.log("错误的传参")
    return Promise.reject(error)
  }
)
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  (response) => {
    // 对响应数据做些事
    switch (response.data.errCode) {
      // 0：返回成功
      case 0:
        /* 成功后更新token */
        // eslint-disable-next-line no-case-declarations
        const newToken = response.data.data ? response.data.data.accessToken || "" : ""
        newToken && newToken !== "" && localStorage.setItem("token", newToken)
        newToken && newToken !== "" && localStorage.setItem("ueditor_token", newToken)
        break
      /**
       * -1 用户未登录
       * 清除本地token
       */
      case -1:
        ElMessage({
          message: "未登录, 请登录后再进行操作!",
          type: "warning",
        })
        /* 清除token */
        localStorage.removeItem("token")
        /* 跳转登录页面 */
        setTimeout(function () {
          router.push("/login")
        }, 1000)
        break
      /**
       * -2 登录过期 token过期
       * 登录过期对用户进行提示
       * 清除本地token
       * 跳转登录页面
       */
      case -2:
        ElMessage({
          message: "登录过期，请重新登录!",
          type: "warning",
        })

        /* 清除token */
        localStorage.removeItem("token")

        /* 跳转登录页面 */
        setTimeout(function () {
          router.push("/login")
        }, 1000)
        break
      /**
       * 其他错误，直接抛出错误提示
       */
      default:
        ElMessage({
          message: response.data.errDesc,
          type: "warning",
        })
    }
    return response.data
  },
  (error) => {
    console.log(error)
    if (error.response) {
      if (error.response.status) {
        switch (error.response.status) {
          /**
           * 404请求不存在
           */
          case 404:
            ElMessage({
              message: "网络请求不存在!",
              type: "error",
            })
            break
          case 500:
            ElMessage({
              message: "网络错误,请检查网络状态!",
              type: "error",
            })
            break
          /**
           * 其他错误，直接抛出错误提示
           */
          default:
            ElMessage({
              message: error.response.statusText,
              type: "error",
            })
        }
        return Promise.reject(error.response)
      } else {
        ElMessage({
          message: "网络错误,请检查网络状态!",
          type: "error",
        })
      }
    } else if (error.request) {
      if (error.request.readyState === 4 && error.request.status === 0) {
        ElMessage({
          message: "请求超时,请稍后再试!",
          type: "error",
        })
      }
    }
  }
)

/**
 * 入参格式化(传参删除空值)
 * @param {string} param:参数
 */
function formatParams(param) {
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
 * Promise(发送post请求)
 * @param {string} url:请求地址
 * @param {string} param:参数
 * @param {boolean} notFilter(是否对param进行空数据过滤，true:不过滤；fase:过滤；)
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
        (response) => {
          resolve(response)
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
 * Promise(发送get请求)
 * @param {string} url:请求地址
 * @param {string} param:参数
 * @param {boolean} notFilter(是否对param进行空数据过滤，true:不过滤；fase:过滤；)
 */
function get(url, param = {}, notFilter = false) {
  // 目前编辑接口不进行空数据过滤
  axios.defaults.timeout = 6000 // 响应时间
  if (!notFilter) {
    formatParams(param)
  }
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: param,
      })
      .then(
        (response) => {
          resolve(response)
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
 * Promise(发送delete请求)
 * @param {string} url:请求地址
 * @param {string} param:参数
 * @param {boolean} notFilter(是否对param进行空数据过滤，true:不过滤；fase:过滤；)
 */
function del(url, param = {}, notFilter = false) {
  // 目前编辑接口不进行空数据过滤
  axios.defaults.timeout = 6000 // 响应时间
  if (!notFilter) {
    formatParams(param)
  }
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(
        (response) => {
          resolve(response)
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
 * Promise(发送put请求)
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
        (response) => {
          resolve(response)
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
