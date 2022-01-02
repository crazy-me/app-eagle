<template>
  <el-dialog :title="getTitle"
             :visible="showModal"
             :close-on-click-modal="false"
             @close="handleCancel"
             width="40%">
    <el-form :model="modalInfo"
             :rules="modalRules"
             ref="modalForm"
             label-width="100px"
             class="modal-form">
      <el-form-item label="用户名："
                    prop="username">
        <diy-input v-model.trim="modalInfo.username"
                   placeholder="请输入用户名"></diy-input>
      </el-form-item>
      <el-form-item label="姓名："
                    prop="nickname">
        <diy-input v-model.trim="modalInfo.nickname"
                   placeholder="请输入姓名"></diy-input>
      </el-form-item>
      <el-form-item label="密码："
                    prop="password">
        <diy-input type="password"
                   autocomplete="new-password"
                   v-model="modalInfo.password"
                   placeholder="请输入登录密码"></diy-input>
        <p class="tips">需同时含有大小写字母和数字，长度在8-20之间</p>
      </el-form-item>
      <el-form-item label="手机号："
                    prop="mobile">
        <diy-input v-model.trim="modalInfo.mobile"
                   placeholder="请输入手机号"></diy-input>
      </el-form-item>
      <el-form-item label="微信号："
                    prop="meta.weChatId">
        <diy-input v-model.trim="modalInfo.meta.weChatId"
                   placeholder="请输入微信号"></diy-input>
      </el-form-item>
      <el-form-item label="邮箱："
                    prop="email">
        <diy-input v-model.trim="modalInfo.email"
                   placeholder="请输入邮箱"></diy-input>
      </el-form-item>
      <el-form-item label="角色："
                    prop="roleIdList">
        <el-checkbox-group v-model="modalInfo.roleIdList">
          <el-checkbox v-for="(item, index) in roleList"
                       :key="index"
                       class="mb-10"
                       :label="item.id">{{ item.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
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
import validate from '@/common/validate'
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
      modalInfo: {
        username: '',
        mobile: '',
        nickname: '',
        password: '',
        email: '',
        meta: { weChatId: '' },
        roleIdList: []
      },
      modalRules: {
        username: [{ required: true, message: '请输入用户名' }],
        mobile: [{ required: false, message: '请输入手机号' }, { validator: validate.tel }],
        // nickname: [{ required: true, message: '请输入姓名' }],
        roleIdList: [{ required: true, message: '请选择角色' }],
        password: [
          { required: this.data.type === 'add', message: '请输入密码' },
          { validator: validate.validPassword }
        ]
      },
      roleList: [],
      tmpArr: []
    }
  },
  computed: {
    getTitle() {
      return this.data.type === 'add' ? '新增用户' : '编辑用户'
    }
  },
  created() {
    this.getAllRoleList()
    if (this.data.type === 'edit') {
      this.getInfo()
    }
  },
  methods: {
    // 获取信息
    getInfo() {
      fetch.getUserInfo({ id: this.data.data.id }).then((data) => {
        data.procData(
          data.res,
          (data) => {
            this.modalInfo = {
              id: data.id,
              username: data.username,
              nickname: data.nickname,
              mobile: data.mobile,
              password: '',
              meta: data.meta ? data.meta : { weChatId: '' },
              email: data.email,
              roleIdList: data.roleIdList
            }
          },
          (err) => {
            this.$message.error(err)
          }
        )
      })
    },
    // 获取角色列表
    getAllRoleList() {
      fetch.getAllRoleList({ code: 'sys' }).then((data) => {
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
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.data.type === 'add') {
            this.dealUser('addUser')
          } else {
            this.dealUser('editUser')
          }
        } else {
          return false
        }
      })
    },
    handleCancel(type) {
      this.$emit('handleClose', type)
    },
    dealUser(url) {
      fetch[url]({ ...this.modalInfo }).then((data) => {
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
  }
}
</script>

<style></style>
