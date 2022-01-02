<template>
  <el-dialog :title="getTitle"
             :visible.sync="showModal"
             @close="handleCancel"
             :close-on-click-modal="false"
             append-to-body
             width="40%">
    <el-col :span="24">
      <el-form :model="modalForm"
               :rules="rules"
               ref="modalForm"
               label-width="100px"
               class="modal-form">
        <el-form-item label="属性名称："
                      prop="name">
          <diy-input v-model.trim="modalForm.name"
                     placeholder="请输入属性名称"></diy-input>
        </el-form-item>
        <el-form-item label="控件类型："
                      prop="typeId">
          <el-select v-model="modalForm.typeId"
                     placeholder="请选择控件类型">
            <el-option v-for="item in typeList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="必填项："
                      prop="required">
          <el-select v-model="modalForm.required"
                     placeholder="请选择是否必填项">
            <el-option label="必填"
                       value="1"></el-option>
            <el-option label="不必填"
                       value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编辑显示："
                      prop="editShow">
          <el-select v-model="modalForm.editShow"
                     placeholder="请选择编辑是否显示">
            <el-option label="显示"
                       value="1"></el-option>
            <el-option label="不显示"
                       value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="列表显示："
                      prop="tableShow">
          <el-select v-model="modalForm.tableShow"
                     placeholder="请选择列表是否显示">
            <el-option label="显示"
                       value="1"></el-option>
            <el-option label="不显示"
                       value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="modalForm.typeId === 'text'"
                      label="校验规则："
                      prop="rules">
          <el-select v-model="modalForm.rules"
                     placeholder="请选择校验规则">
            <el-option v-for="item in rulesList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="modalForm.typeId === 'text' && modalForm.rules === 'auto'"
                      label=""
                      prop="reg">
          <diy-input v-model.trim="modalForm.reg"
                     type="textarea"
                     placeholder="请输入校验表达式"></diy-input>
        </el-form-item>
        <el-form-item v-if="modalForm.typeId === 'textarea'"
                      label="默认值："
                      prop="defaultValue">
          <diy-input v-model.trim="modalForm.defaultValue"
                     type="textarea"
                     placeholder="请输入默认值"></diy-input>
        </el-form-item>
        <template v-if="modalForm.typeId === 'number'">
          <el-form-item label="单位："
                        prop="showUnit">
            <el-switch v-model="modalForm.showUnit"
                       inactive-value="0"
                       active-value="1">
            </el-switch>
          </el-form-item>
          <template v-if="modalForm.showUnit === '1'">
            <el-form-item label="添加单位："
                          prop="unitId">
              <diy-input v-model.trim="modalForm.unitId"
                         placeholder="请输入单位"></diy-input>
            </el-form-item>
            <el-form-item label="数值范围："
                          prop="unitId">
              <diy-input v-model.trim="modalForm.unitId"
                         placeholder="请输入单位"></diy-input>
            </el-form-item>
            <el-form-item label="默认值："
                          prop="defaultValue">
              <diy-input v-model.trim="modalForm.defaultValue"
                         placeholder="请输入默认值"></diy-input>
            </el-form-item>
          </template>
        </template>
        <el-form-item v-if="modalForm.typeId === 'date'"
                      label="时间格式："
                      prop="timeFormat">
          <el-radio-group v-model="modalForm.timeFormat">
            <el-radio label="date">年月日</el-radio>
            <el-radio label="datetime">年月日 - 时分秒</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="modalForm.typeId === 'switch'">
          <el-form-item label="添加选项："
                        prop="switch">
            <el-form-item class="mb-20"
                          label="开："
                          prop="switch"
                          label-width="30px">
              <diy-input v-model.trim="modalForm.switch"
                         placeholder="开"></diy-input>
            </el-form-item>
            <el-form-item label="关："
                          prop="switch"
                          label-width="30px">
              <diy-input v-model.trim="modalForm.switch"
                         placeholder="关"></diy-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="默认值："
                        prop="defaultValue">
            <diy-input v-model.trim="modalForm.defaultValue"
                       placeholder="请输入默认值"></diy-input>
          </el-form-item>
        </template>
        <template v-if="modalForm.typeId === 'radio' || modalForm.typeId === 'checkbox' || modalForm.typeId === 'select'">
          <el-form-item label="关联字典："
                        prop="params">
            <el-select v-model="modalForm.params"
                       placeholder="请选择关联字典">
              <el-option v-for="item in paramsList"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="默认值："
                        prop="defaultValue">
            <diy-input v-model.trim="modalForm.defaultValue"
                       placeholder="请输入默认值"></diy-input>
          </el-form-item>
        </template>
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
        typeId: '',
        required: '',
        editShow: '',
        tableShow: '',
        rules: '',
        defaultValue: '',
        showUnit: 1,
        unitId: '',
        option: [],
        switch: '',
        params: ''
      },
      rules: {
        name: [{ required: true, message: '请输入属性名称' }],
        typeId: [{ required: true, message: '请选择控件类型' }],
        params: [{ required: true, message: '请选择关联字典' }]
      },
      typeList: [
        { name: '单行文本', value: 'text' },
        { name: '多行文本', value: 'textarea' },
        { name: '密码', value: 'password' },
        { name: '数值', value: 'number' },
        { name: '日期', value: 'date' },
        { name: '开关', value: 'switch' },
        { name: '单选', value: 'radio' },
        { name: '复选', value: 'checkbox' },
        { name: '下拉', value: 'select' }
      ],
      rulesList: [
        {
          name: 'IP地址',
          value: '1',
          reg: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        },
        {
          name: '邮箱',
          value: '2',
          reg: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/
        },
        {
          name: '电话',
          value: '3',
          reg: /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2,5,6,7]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
        },
        {
          name: 'URL',
          value: '4',
          reg: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'*+,;=.]+$/
        },
        { name: '自定义', value: 'auto', reg: '' }
      ],
      paramsList: []
    }
  },
  computed: {
    getTitle() {
      return this.data.type === 'add' ? '新增模型' : '编辑模型'
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
