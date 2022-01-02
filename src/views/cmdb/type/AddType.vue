<template>
  <el-dialog :title="getTitle"
             :visible.sync="showType"
             :close-on-click-modal="false"
             @close="handleCancel"
             width="40%">
    <el-col :span="24">
      <el-form :model="modalForm"
               :rules="modalRules"
               ref="modalForm"
               label-width="90px"
               class="type-form">
        <el-form-item label="字典名称"
                      prop="name">
          <el-input v-model.trim="modalForm.name"
                    placeholder="请输入字典名称"></el-input>
        </el-form-item>
        <el-form-item label="字典取值:"
                      prop="valueRequestDTOList"
                      style="max-height: 400px; overflow-y:auto">
          <el-button class="mb-15"
                     type="primary"
                     plain
                     icon="el-icon-plus"
                     size="small"
                     @click="addModel">添加取值</el-button>
          <el-form-item v-for="(item, index) in modalForm.valueRequestDTOList"
                        :key="index"
                        class="mb-20"
                        :prop="'valueRequestDTOList.' + index + '.attr'"
                        :rules="[{ required: true, message: '请输入字典取值' }]">
            <diy-input v-model.trim="item.attr"
                       maxlength="100"
                       placeholder="请输入字典取值"
                       style="display: inline-block;width: 90%"></diy-input>
            <el-button v-if="modalForm.valueRequestDTOList.length > 1"
                       class="ml-10"
                       type="danger"
                       plain
                       circle
                       icon="el-icon-delete"
                       size="small"
                       @click="delModel(index)"></el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-col>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary"
                 @click="handleConfirm('modalForm')">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import fetch from '@/common/apis/cmdb'
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
  computed: {
    getTitle() {
      return this.data.type === 'add' ? '新增字典' : '编辑字典'
    }
  },
  data() {
    return {
      showType: this.isShow,
      modalForm: {
        name: '',
        valueRequestDTOList: [{ attr: '' }]
      },
      modalRules: {
        valueRequestDTOList: [{ required: true, message: '请输入字典取值' }],
        name: [{ required: true, message: '请输入字典名称' }]
      }
    }
  },
  created() {
    if (this.data.type === 'edit') {
      this.getInfo()
    }
  },
  methods: {
    // 获取编辑信息
    getInfo() {
      fetch.getTypeInfo({ id: this.data.id }).then((data) => {
        data.procData(
          data.res,
          (data) => {
            this.modalForm = data
          },
          (err) => {
            this.$message.error(err)
          }
        )
      })
    },
    // 添加产品型号
    addModel() {
      this.modalForm.valueRequestDTOList.push({ attr: '' })
    },
    // 删除产品型号
    delModel(index) {
      this.modalForm.valueRequestDTOList.splice(index, 1)
    },
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.data.type === 'add') {
            fetch.addType({ ...this.modalForm }).then((data) => {
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
            fetch.editType({ ...this.modalForm }).then((data) => {
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

<style></style>
