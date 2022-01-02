<template>
  <el-dialog :title="getTitle"
             :visible.sync="showModal"
             @close="handleCancel"
             :close-on-click-modal="false"
             width="40%">
    <el-col :span="24">
      <el-form :model="modalForm"
               :rules="rules"
               ref="modalForm"
               label-width="90px"
               class="modal-form">
        <el-form-item label="名称："
                      prop="name">
          <diy-input v-model.trim="modalForm.name"
                     placeholder="请输入名称"></diy-input>
        </el-form-item>
        <el-form-item label="协议："
                      prop="agreement">
          <el-select v-model="modalForm.agreement"
                     placeholder="请选择协议">
            <el-option label="SNMP"
                       value="snmp"></el-option>
            <el-option label="通用协议"
                       value="common"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="modalForm.agreement === 'snmp'">
          <el-form-item label="版本："
                        prop="vision">
            <el-select v-model="modalForm.vision"
                       placeholder="请选择版本">
              <el-option label="V1"
                         value="1"></el-option>
              <el-option label="V2C"
                         value="2"></el-option>
              <el-option label="V3"
                         value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="团体名："
                        prop="pname">
            <diy-input v-model.trim="modalForm.pname"
                       placeholder="请输入团体名"></diy-input>
          </el-form-item>
          <el-form-item label="端口："
                        prop="port">
            <diy-input v-model.trim="modalForm.port"
                       placeholder="请输入端口"></diy-input>
          </el-form-item>
        </template>
        <template v-if="modalForm.agreement === 'common'">
          <el-form-item label="用户名："
                        prop="username">
            <diy-input v-model.trim="modalForm.username"
                       placeholder="请输入用户名"></diy-input>
          </el-form-item>
          <el-form-item label="密码："
                        prop="password">
            <diy-input v-model.trim="modalForm.password"
                       type="password"
                       placeholder="请输入密码"></diy-input>
          </el-form-item>
          <el-form-item label="端口："
                        prop="port">
            <diy-input v-model.trim="modalForm.port"
                       placeholder="请输入端口"></diy-input>
          </el-form-item>
          <el-form-item label="实例名："
                        prop="realname">
            <diy-input v-model.trim="modalForm.realname"
                       placeholder="请输入实例名"></diy-input>
          </el-form-item>
          <el-form-item label="IP："
                        prop="ip">
            <diy-input v-model.trim="modalForm.ip"
                       placeholder="请输入IP"></diy-input>
          </el-form-item>
        </template>
      </el-form>
      <el-form :model="testForm"
               :rules="testRules"
               ref="testForm"
               label-width="100px"
               inline
               class="test-form">
        <el-form-item label="测试：">
          <el-form-item label=""
                        prop="ip">
            <diy-input v-model.trim="testForm.ip"
                       placeholder="请输入IP地址"></diy-input>
          </el-form-item>
          <el-form-item label=""
                        prop="testport"
                        class="ml-10">
            <diy-input v-model.trim="testForm.testport"
                       :width="100"
                       placeholder=""></diy-input>
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="handleTest('testForm')">测 试</el-button>
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
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      showModal: this.isShow,
      modalForm: {
        name: '',
        agreement: 'snmp',
        vision: '',
        pname: '',
        port: '161',
        username: '',
        password: '',
        realname: '',
        ip: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称' }],
        agreement: [{ required: true, message: '请选择协议' }],
        vision: [{ required: true, message: '请选择版本' }],
        pname: [{ required: true, message: '请输入团体名' }],
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }],
        port: [{ required: true, message: '请输入端口' }]
      },
      testForm: { ip: '', testport: 161 },
      testRules: {
        ip: [{ required: true, message: '请输入IP地址' }]
      },
      paramsList: []
    }
  },
  computed: {
    getTitle() {
      return this.data.type === 'add' ? '新增采集协议' : '编辑采集协议'
    }
  },
  methods: {
    handleTest(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          fetch.addUserType({ ...this.testForm }).then((data) => {
            data.procData(
              data.res,
              (data) => {
                this.$message.success(data.msg)
              },
              (err) => {
                this.$message.error(err)
              }
            )
          })
        } else {
          return false
        }
      })
    },
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
