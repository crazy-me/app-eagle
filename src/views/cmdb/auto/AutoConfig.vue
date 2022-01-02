<template>
  <el-dialog title="网络设置"
             :visible.sync="showModal"
             @close="handleCancel"
             :close-on-click-modal="false"
             width="40%">
    <el-col :span="24">
      <el-form :model="modalForm"
               :rules="rules"
               ref="modalForm"
               label-width="130px"
               class="modal-form">
        <el-form-item label="扫描范围："
                      prop="range">
          <diy-input v-model.trim="modalForm.range"
                     type="textarea"
                     :rows="6"
                     :placeholder="'填入多个网断时，请使用回车分割。\n输入样例：\n10.0.0.0、172.31.0.0 \n192.158.0.0-192.168.0.220'"></diy-input>
        </el-form-item>
        <el-form-item label="选择发现协议："
                      prop="agreement">
          <el-select v-model="modalForm.agreement"
                     placeholder="请选择协议">
            <el-option label="SNMP"
                       value="snmp"></el-option>
            <el-option label="通用协议"
                       value="common"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通知设置："
                      prop="showUnit">
          <el-switch v-model="modalForm.showUnit"
                     inactive-value="0"
                     active-value="1">
          </el-switch>
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
        range: '',
        agreement: ''
      },
      rules: {
        range: [{ required: true, message: '请输入扫描范围' }]
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
