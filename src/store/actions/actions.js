import fetch from '@/common/apis/other'
export default {
  // 获取系统按钮的显示权限
  updateBtnAsync: function(store) {
    fetch.getBtnList({}).then((data) => {
      data.procData(
        data.res,
        (data) => {
          store.commit('updateBtn', data)
        },
        (err) => {
          this.$message.error(err)
        }
      )
    })
  }
}
