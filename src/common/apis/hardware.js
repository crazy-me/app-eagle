import { fetch, nFetch } from '../mainFetch'
import axios from 'axios'
const hardware = {
  // --------------------硬件管理---------------------
  // 获取硬件列表
  getAreaList: (params, config) => {
    return fetch('/', params, config)
  },
  // 新增硬件
  addArea: (params, config) => {
    return fetch('/', params, config)
  },
  // 编辑硬件
  editArea: (params, config) => {
    return fetch('/', params, config)
  },
  // 硬件详情
  getAreaInfo: (params, config) => {
    return fetch('/', params, config)
  },
  // 导出
  exportAreaList: (params, config) => {
    return nFetch('/', params, config)
  },
  // 导入
  importContent: axios.defaults.baseURL + '/'
}
export default hardware
