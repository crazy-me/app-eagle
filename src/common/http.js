import axios from 'axios'
import IP from './ip'
import { Loading } from 'element-ui'

let loadingInstance

axios.defaults.baseURL = IP.Ip
// 设置超时时间
axios.defaults.timeout = 10000
// post 请求头
// axios.defaults.headers.post['Content-type'] = 'application/json;charset=UTF-8'
// 请求拦截
axios.interceptors.request.use(
  (config) => {
    loadingInstance = Loading.service({
      fullscreen: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, .6)'
    })
    config.headers['system'] = 'sys'
    if (config.url !== '/login') {
      if (axios.defaults.baseURL === config.baseURL) {
        const token = localStorage.getItem('tokenB')
        const userId = localStorage.getItem('userIdB')
        if (token) {
          config.headers['token'] = token
          config.headers['userid'] = userId
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截
axios.interceptors.response.use(
  (response) => {
    if (response.headers.token && '' !== response.headers.token) {
      localStorage.setItem('tokenB', response.headers.token)
    }
    loadingInstance.close()
    return Promise.resolve(response)
  },
  (error) => {
    loadingInstance.close()
    return Promise.reject(error)
  }
)
export default axios
