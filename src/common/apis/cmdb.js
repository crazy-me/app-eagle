import { fetch, nFetch } from '../mainFetch'
const jurisdiction = {
  // --------------------模型管理---------------------
  // ---------模型管理----------
  // 获取模型列表
  getModelList: (params, config) => {
    return fetch('/cmdb/model/group/getGroupModelList', params, config)
  },
  // 新增模型
  addModel: (params, config) => {
    return fetch('/cmdb/model/add', params, config)
  },
  // 编辑模型
  editModel: (params, config) => {
    return fetch('/cmdb/model/modify', params, config)
  },
  // 删除模型
  delModel: (params, config) => {
    return fetch('/cmdb/model/delete', params, config)
  },
  // 模型详情
  getModelInfo: (params, config) => {
    return fetch('/cmdb/model/attr/getInfoByModelId', params, config)
  },
  // ---------字典管理----------
  // 获取字典列表
  getTypeList: (params, config) => {
    return fetch('/cmdb/model/dict/page', params, config)
  },
  // 新增字典
  addType: (params, config) => {
    return fetch('/cmdb/model/dict/add', params, config)
  },
  // 编辑字典
  editType: (params, config) => {
    return fetch('/cmdb/model/dict/modify', params, config)
  },
  // 删除字典
  delType: (params, config) => {
    return fetch('/cmdb/model/dict/delete', params, config)
  },
  // 字典详情
  getTypeInfo: (params, config) => {
    return fetch('/cmdb/model/dict/getDictInfoById', params, config)
  },
  // 导出
  exportTypeList: (params, config) => {
    return nFetch('/', params, config)
  }
}
export default jurisdiction
