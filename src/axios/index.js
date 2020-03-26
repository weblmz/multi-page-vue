import axios from 'axios'
import qs from 'qs'

Object.assign(axios.defaults, {
  timeout: 60000,
  withCredentials: true // 跨域请求是否需要凭证
})

// 请求数据转换
axios.defaults.transformRequest = [
  (data, cfg) => {
    if (!cfg['Content-Type']) return qs.stringify(data)
    switch (cfg['Content-Type'].toLowerCase()) {
      case 'multipart/form-data:charset=utf-8': {
        return data
      }
      default: {
        return qs.stringify(data)
      }
    }
  }
]

// 请求设置
axios.interceptors.request.use(
  cfg => {
    // 可以进行其他数据处理或特殊操作
    return cfg
  },
  err => {
    // console.log(err, 'axios.err')
    return Promise.reject(err)
  }
)

// 响应操作
axios.interceptors.response.use(
  res => {
    if (res.data.status !== 200) {
      // 未返回200状态则按错误抛出
      return Promise.reject(new Error(res.data.msg || 'error'))
    } else {
      return res
    }
  },
  err => {
    return Promise.reject(err)
  }
)

export default axios
