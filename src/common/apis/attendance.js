import { fetch, nFetch } from '../mainFetch'
const attendance = {
  // --------------------考勤管理---------------------
  // ------考勤规则-----
  // 获取考勤规则列表
  getHolidayList: (params, config) => {
    return fetch('/', params, config)
  },
  // 新增考勤规则
  addHolidayRule: (params, config) => {
    return fetch('/', params, config)
  },
  // 编辑考勤规则
  editHolidayRule: (params, config) => {
    return fetch('/', params, config)
  },
  // 删除考勤规则
  delHolidayRule: (params, config) => {
    return fetch('/', params, config)
  },
  // 考勤规则详情
  getHolidayRuleInfo: (params, config) => {
    return fetch('/', params, config)
  },
  // 新增上下班规则
  getWorkRuleList: (params, config) => {
    return fetch('/', params, config)
  },
  // 新增上下班规则
  addWorkRule: (params, config) => {
    return fetch('/', params, config)
  },
  // 编辑上下班规则
  editWorkRule: (params, config) => {
    return fetch('/', params, config)
  },
  // 删除上下班规则
  delWorkRule: (params, config) => {
    return fetch('/', params, config)
  },
  // 上下班规则详情
  getWorkRuleInfo: (params, config) => {
    return fetch('/', params, config)
  },
  // ------考勤统计-----
  // 考勤统计列表
  getStatisticsList: (params, config) => {
    return fetch('/', params, config)
  },
  // 考勤统计导出
  statisticsExport: (params, config) => {
    return nFetch('/', params, config)
  },
  // 考勤记录列表
  getRecordList: (params, config) => {
    return fetch('/', params, config)
  },
  // 考勤记录导出
  recordExport: (params, config) => {
    return nFetch('/', params, config)
  }
}
export default attendance
