<template>
  <el-dialog title="新建分组"
             :visible.sync="showModal"
             @close="handleCancel"
             :close-on-click-modal="false"
             width="30%">
    <el-col :span="24">
      <el-form :model="modalForm"
               :rules="rules"
               ref="modalForm"
               label-width="80px"
               class="modal-form">
        <el-form-item label="组名称："
                      prop="name">
          <diy-input v-model.trim="modalForm.name"
                     placeholder="请输入组名称"></diy-input>
        </el-form-item>
      </el-form>
    </el-col>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary"
                 @click="handleConfirm('modalForm')">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import fetch from '@/common/apis/system'
import DiyInput from '@/components/public/DiyInput'
export default {
  components: { DiyInput },
  props: {
    isShow: {
      type: Boolean
    }
  },
  data() {
    return {
      showModal: this.isShow,
      modalForm: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请输入组名称' }]
      }
    }
  },
  methods: {
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.data.type === 'add') {
            fetch.addUserType({ ...this.modalForm }).then((data) => {
              data.procData(
                data.res,
                () => {
                  this.$message.success('操作成功')
                  this.handleCancel('refresh')
                },
                (err) => {
                  this.$message.error(err)
                }
              )
            })
          } else {
            fetch.editUserType({ ...this.modalForm }).then((data) => {
              data.procData(
                data.res,
                () => {
                  this.$message.success('操作成功')
                  this.handleCancel('refresh')
                },
                (err) => {
                  this.$message.error(err)
                }
              )
            })
          }
        } else {
          return false
        }
      })
    },
    handleCancel(type) {
      this.$emit('handleClose', type)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
