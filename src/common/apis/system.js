import { fetch } from '../mainFetch'
import axios from 'axios'
// 系统数据管理部分页面
const system = {
  // --------------------用户角色管理---------------------
  // 用户列表
  getUserList: (params, config) => {
    return fetch('/account/tripartite/user/page', params, config)
  },
  // 删除用户
  deleteUser: (params, config) => {
    return fetch('/account/tripartite/user/del', params, config)
  },
  // 新增用户
  addUser: (params, config) => {
    return fetch('/account/tripartite/user/add', params, config)
  },
  // 编辑用户
  editUser: (params, config) => {
    return fetch('/account/tripartite/user/modify', params, config)
  },
  // 用户详情
  getUserInfo: (params, config) => {
    return fetch('/account/tripartite/user/getOne', params, config)
  },
  // 切换状态
  changeSatus: (params, config) => {
    return fetch('/account/tripartite/user/orStop', params, config)
  },
  // 获取角色
  getCurrentRole: (params, config) => {
    return fetch('/account/role/user/userHaveRole', params, config)
  },
  // 获取所有角色
  getAllRoleList: (params, config) => {
    return fetch('/account/role/list', params, config)
  },
  // 角色列表
  getRolePageList: (params, config) => {
    return fetch('/account/role/page', params, config)
  },
  // 删除角色
  deleteRole: (params, config) => {
    return fetch('/account/role/del', params, config)
  },
  // 新增角色
  addRole: (params, config) => {
    return fetch('/account/role/add', params, config)
  },
  // 编辑角色
  editRole: (params, config) => {
    return fetch('/account/role/modify', params, config)
  },
  // 角色详情
  getRoleInfo: (params, config) => {
    return fetch('/', params, config)
  },
  // 获取菜单
  getMenuList: (params, config) => {
    return fetch('/', params, config)
  },
  // 获取权限
  getRoleAuth: (params, config) => {
    return fetch('/', params, config)
  },
  // 设置权限
  setRoleAuth: (params, config) => {
    return fetch('/', params, config)
  },
  // --------------------品牌管理---------------------
  // 获取品牌
  getBrandList: (params, config) => {
    return fetch('/account/sysBrand/page', params, config)
  },
  // 新增品牌
  addBrand: (params, config) => {
    return fetch('/account/sysBrand/add', params, config)
  },
  // 编辑品牌
  editBrand: (params, config) => {
    return fetch('/account/sysBrand/modify', params, config)
  },
  // 删除品牌
  delBrand: (params, config) => {
    return fetch('/account/sysBrand/del', params, config)
  },
  // 品牌详情
  getBrandInfo: (params, config) => {
    return fetch('/account/sysBrand/getOne', params, config)
  },
  importBrand: axios.defaults.baseURL + '/',
  // --------------------系统配置---------------------
  // 获取系统配置信息
  getSysInfo: (params, config) => {
    return fetch('/account/sysConfig/list', params, config)
  },
  // 修改系统配置信息
  editSysInfo: (params, config) => {
    return fetch('/account/sysConfig/modify', params, config)
  }
}
export default system
