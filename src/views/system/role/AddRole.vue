<template>
  <el-dialog :title="getTitle"
             :visible.sync="showModal"
             :close-on-click-modal="false"
             @close="handleCancel"
             width="40%">
    <el-col :span="24">
      <el-form :model="modalInfo"
               :rules="modalRules"
               ref="modalForm"
               label-width="100px"
               class="modal-form">
        <el-form-item label="角色名称："
                      prop="roleName">
          <diy-input v-model.trim="modalInfo.roleName"
                     placeholder="请输入角色名称"></diy-input>
        </el-form-item>
        <el-form-item label="备注："
                      prop="remark">
          <diy-input type="textarea"
                     v-model.trim="modalInfo.remark"
                     placeholder="请输入备注"></diy-input>
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
  components: {
    DiyInput
  },
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
      modalInfo: {
        roleName: '',
        remark: ''
      },
      modalRules: {
        roleName: [{ required: true, message: '请输入角色名称' }]
      }
    }
  },
  computed: {
    getTitle() {
      return this.data.type === 'add' ? '新增角色' : '编辑角色'
    }
  },
  created() {
    if (this.data.type === 'edit') {
      this.modalInfo = JSON.parse(JSON.stringify(this.data.data))
    }
  },
  methods: {
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.data.type === 'add') {
            fetch.addRole({ ...this.modalInfo, code: 'sys' }).then((data) => {
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
            fetch.editRole({ ...this.modalInfo, code: 'sys' }).then((data) => {
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
