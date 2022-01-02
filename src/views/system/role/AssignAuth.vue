<template>
  <el-dialog title="分配权限"
             :visible.sync="showModal"
             @close="handleClose"
             width="40%">
    <el-col :span="24">
      <el-form :model="authorityForm"
               :rules="rules"
               ref="authorityForm"
               label-width="110px"
               class="reset-form">
        <el-form-item label="用户名称："
                      prop="name">
          <p>{{ authorityForm.name }}</p>
        </el-form-item>
        <el-form-item label="操作权限："
                      prop="selMenuIdList">
          <el-tree ref="authorityTree"
                   :data="roleList"
                   show-checkbox
                   node-key="id"
                   :default-checked-keys="defaultKeys"
                   :props="defaultProps"
                   @check-change="checkChange">
          </el-tree>
        </el-form-item>
      </el-form>
    </el-col>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary"
                 @click="confirmReset('authorityForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import fetch from '@/common/apis/system'
export default {
  props: {
    isShow: {
      type: Boolean
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      showModal: this.isShow,
      roleList: [],
      authorityForm: {
        name: '',
        selMenuIdList: ''
      },
      defaultKeys: [],
      rules: {
        selMenuIdList: [{ required: true, message: '请选择权限' }]
      },
      defaultProps: {
        children: 'children',
        label: 'menuName'
      }
    }
  },
  created() {
    this.authorityForm.name = this.data.name
    this.getMenuList()
    this.getCurrentAuthority()
  },
  methods: {
    // 获取所有权限
    getMenuList() {
      fetch.getMenuList({ code: this.data.from }).then((data) => {
        data.procData(
          data.res,
          (data) => {
            this.roleList = data
          },
          (err) => {
            this.$message.error(err)
          }
        )
      })
    },
    // 获取当前角色权限
    getCurrentAuthority() {
      fetch.getRoleAuth({ roleId: this.data.id, code: this.data.from }).then((data) => {
        data.procData(
          data.res,
          (data) => {
            this.defaultKeys = data
            this.authorityForm.selMenuIdList = data
          },
          (err) => {
            this.$message.error(err)
          }
        )
      })
    },
    checkChange() {
      this.authorityForm.selMenuIdList = this.$refs.authorityTree.getCheckedKeys()
    },
    confirmReset(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let halfIds = this.$refs.authorityTree.getHalfCheckedKeys()
          // selMenuIdList 全选列表   menuIdList 半选列表
          fetch
            .setRoleAuth({
              code: this.data.from,
              roleId: this.data.id,
              menuIdList: halfIds,
              selMenuIdList: this.authorityForm.selMenuIdList
            })
            .then((data) => {
              data.procData(
                data.res,
                () => {
                  this.$message.success('操作成功')
                  this.handleClose()
                },
                (err) => {
                  this.$message.error(err)
                }
              )
            })
        }
      })
    },
    handleClose() {
      this.$emit('handleClose')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
