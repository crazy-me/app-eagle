import { fetch } from './../mainFetch'
import axios from 'axios'
import Ip from './../ip'
const other = {
  // 获取当前IP
  getHostName: axios.defaults.baseURL,
  // 获取验证码
  getVerifyCode: (params, config) => {
    return fetch('/getLoginCode', params, config)
  },
  // 获取公钥
  getLoginPubKey: (params, config) => {
    return fetch('/getLoginPubKey', params, config)
  },
  // 登录
  login: (params, config) => {
    return fetch('/login', params, config)
  },
  // 退出登录
  logout: (params, config) => {
    return fetch('/logout', params, config)
  },
  // 获取菜单
  getMenu: (params, config) => {
    return fetch('/sys/menu/getMenuListByUserId', params, config)
  },
  // 获取按钮显示列表
  getBtnList: (params, config) => {
    return fetch('/sys/menu/getButtonPathByUserId', params, config)
  },
  // 获取民族列表
  getNationList: (params, config) => {
    return fetch('/ethnic/list', params, config)
  },
  // 获取省市区
  getAreaList: (params, config) => {
    return fetch('/area/tree', params, config)
  },
  // 下载模板地址
  downLoadUrl: Ip.DownLoadIp,
  // 上传背景图
  uploadUrl: axios.defaults.baseURL + '/utils/file/upload',
  // 获取字典下拉
  getTypeSelect: (params, config) => {
    return fetch('/cmdb/model/dict/list', params, config)
  }
}
export default other
