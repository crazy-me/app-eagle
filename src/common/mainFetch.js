import axios from './http'
import Router from '@/router/index'

const procData = (data, cb, err) => {
  switch (data.code) {
    case 0:
      cb(data.data)
      // eslint-disable-next-line semi
      break
    case 2:
      err(data.msg)
      localStorage.clear()
      sessionStorage.clear()
      Router.replace({
        path: '/login'
      })
      // eslint-disable-next-line semi
      break
    default:
      err(data.msg)
  }
}

export function fetch(url, params, config) {
  let c = config || ''
  return axios.post(url, params, c).then((res) => {
    return {
      res: res.data,
      procData: procData
    }
  })
}
// 导出用
export function nFetch(url, params, config) {
  let c = config || ''
  return axios.post(url, params, c).then((res) => {
    return {
      res: res.data
    }
  })
}
