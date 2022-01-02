import { fetch, nFetch } from '../mainFetch'
const unit = {
  // --------------------单位管理---------------------
  // 获取单位列表
  getUnitList: (params, config) => {
    return fetch('/', params, config)
  },
  // 新增单位
  addUnit: (params, config) => {
    return fetch('/', params, config)
  },
  // 编辑单位
  editUnit: (params, config) => {
    return fetch('/', params, config)
  },
  // 单位详情
  getUnitInfo: (params, config) => {
    return fetch('/', params, config)
  },
  // 导出
  exportUnitList: (params, config) => {
    return nFetch('/', params, config)
  },
  // 获取标示类型
  getTypeList: (params, config) => {
    return fetch('/', params, config)
  }
}
export default unit
