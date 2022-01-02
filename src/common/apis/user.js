import { fetch, nFetch } from '../mainFetch'
const user = {
  // --------------------人员管理---------------------
  // ------人员档案-----
  // 人员列表
  getRecordList: (params, config) => {
    return fetch('/', params, config)
  },
  // 人员导出
  recordExport: (params, config) => {
    return nFetch('/', params, config)
  }
}
export default user
