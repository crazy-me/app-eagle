import { fetch, nFetch } from '../mainFetch'
import axios from 'axios'
const equipment = {
  // --------------------装备管理---------------------
  // 获取装备列表
  getAreaList: (params, config) => {
    return fetch('/', params, config)
  },
  // 新增装备
  addArea: (params, config) => {
    return fetch('/', params, config)
  },
  // 编辑装备
  editArea: (params, config) => {
    return fetch('/', params, config)
  },
  // 装备详情
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
export default equipment
