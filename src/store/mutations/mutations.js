import * as types from './mutation_type'
export default {
  // 展开关闭菜单
  [types.EXPAND_MANU]: function(state) {
    state.isExpand = !state.isExpand
  },
  [types.CHANGE_CENTER]: function(state, center) {
    state.currentCenter = center
  }
}
