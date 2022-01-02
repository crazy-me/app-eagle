import { fetch, nFetch } from '../mainFetch'
import axios from 'axios'
const cost = {
  // --------------------费用管理---------------------
  // 获取费用列表
  getAreaList: (params, config) => {
    return fetch('/', params, config)
  },
  // 新增费用
  addArea: (params, config) => {
    return fetch('/', params, config)
  },
  // 编辑费用
  editArea: (params, config) => {
    return fetch('/', params, config)
  },
  // 费用详情
  getAreaInfo: (params, config) => {
    return fetch('/', params, config)
  },
  // 导出
  exportAreaList: (params, config) => {
    return nFetch('/', params, config)
  },
  // 获取标示类型
  getTypeList: (params, config) => {
    return fetch('/', params, config)
  },
  // 导入
  importEquipment: axios.defaults.baseURL + '/'
}
export default cost
