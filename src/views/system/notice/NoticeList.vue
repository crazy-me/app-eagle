<template>
  <el-row>
    <el-card shadow="never">
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="邮件通知"
                     name="1">
          <el-col :span="12"
                  :xs="24">
            <el-form :model="emailForm"
                     :rules="emailRules"
                     ref="emailForm"
                     label-position="left"
                     label-width="140px"
                     class="email-form">
              <el-form-item label="邮件服务器地址："
                            prop="address">
                <diy-input v-model.trim="emailForm.address"
                           placeholder="请输入邮件服务器地址"></diy-input>
              </el-form-item>
              <el-form-item label="端口："
                            prop="port">
                <diy-input v-model.trim="emailForm.port"
                           placeholder="请输入端口"></diy-input>
              </el-form-item>
              <el-form-item label="验证用户名："
                            prop="username">
                <diy-input v-model.trim="emailForm.username"
                           placeholder="请输入验证用户名"></diy-input>
              </el-form-item>
              <el-form-item label="验证密码："
                            prop="password">
                <diy-input v-model.trim="emailForm.password"
                           type="password"
                           placeholder="请输入验证密码"></diy-input>
              </el-form-item>
              <el-form-item label="状态："
                            prop="status">
                <el-switch v-model="emailForm.status"
                           active-color="#3367D6"></el-switch>
              </el-form-item>
              <el-form-item class="test-main"
                            label="接收人邮箱："
                            prop="email">
                <diy-input v-model.trim="emailForm.email"
                           placeholder="请输入接收人邮箱"></diy-input>
                <el-tooltip content="测试"
                            placement="top">
                  <el-button class="test-btn"
                             type="primary"
                             plain><i class="icon iconfont icon-a-124"></i></el-button>
                </el-tooltip>
                <el-tag type="warning"
                        size="mini">提示：发送失败请检查用户名密码，端口是否被禁用，邮箱已开启POP3功能</el-tag>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="saveConfig('emailForm', 'email')">保存配置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="短信通知"
                     name="2">
          <el-col :span="12"
                  :xs="24">
            <el-form :model="msgForm"
                     :rules="msgRules"
                     ref="msgForm"
                     label-position="left"
                     label-width="125px"
                     class="msg-form">
              <el-form-item label="SIM手机号："
                            prop="mobile">
                <diy-input v-model.trim="msgForm.mobile"
                           placeholder="请输入SIM手机号"></diy-input>
              </el-form-item>
              <el-form-item label="状态："
                            prop="status">
                <el-switch v-model="msgForm.status"
                           active-color="#3367D6"></el-switch>
              </el-form-item>
              <el-form-item class="test-main"
                            label="接收人手机号："
                            prop="userPhone">
                <el-input v-model.trim="msgForm.userPhone"
                          placeholder="请输入接收人手机号">
                </el-input>
                <el-tooltip content="测试"
                            placement="top">
                  <el-button class="test-btn"
                             type="primary"
                             plain><i class="icon iconfont icon-a-124"></i></el-button>
                </el-tooltip>
                <el-tag type="warning"
                        size="mini">提示：点击测试发送，测试当前手机号码是否可以正常接收短信</el-tag>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="saveConfig('msgForm', 'msg')">保存配置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="微信通知"
                     name="3">
          <el-col :span="12"
                  :xs="24">
            <el-form :model="wxForm"
                     :rules="wxRules"
                     ref="wxForm"
                     label-position="left"
                     label-width="125px"
                     class="wx-form">
              <el-form-item label="企业ID："
                            prop="id">
                <diy-input v-model.trim="wxForm.id"
                           placeholder="请输入企业ID"></diy-input>
              </el-form-item>
              <el-form-item label="企业密钥："
                            prop="pubkey">
                <diy-input v-model.trim="wxForm.pubkey"
                           type="password"
                           placeholder="请输入企业密钥"></diy-input>
              </el-form-item>
              <el-form-item label="应用ID："
                            prop="applyId">
                <diy-input v-model.trim="wxForm.applyId"
                           placeholder="请输入应用ID"></diy-input>
              </el-form-item>
              <el-form-item class="test-main"
                            label="接收人邮箱："
                            prop="username">
                <el-input v-model.trim="wxForm.username"
                          placeholder="请输入接收人邮箱">
                </el-input>
                <el-tooltip content="测试"
                            placement="top">
                  <el-button class="test-btn"
                             type="primary"
                             plain><i class="icon iconfont icon-a-124"></i></el-button>
                </el-tooltip>
                <el-tag type="warning"
                        size="mini">提示：初次使用，点击测试绑定，测试是否已成功绑定</el-tag>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="saveConfig('wxForm', 'wx')">保存配置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-row>
</template>

<script>
import DiyInput from '@/components/public/DiyInput'
export default {
  components: { DiyInput },
  data() {
    return {
      activeName: '1',
      // 邮箱
      emailForm: {
        address: '',
        port: '',
        username: '',
        password: '',
        status: '',
        email: ''
      },
      emailRules: {
        address: [{ required: true, message: '请输入邮件服务器地址' }],
        port: [{ required: true, message: '请输入端口' }],
        username: [{ required: true, message: '请输入验证用户名' }],
        password: [{ required: true, message: '请输入验证密码' }],
        status: [{ required: true, message: '请选择状态' }]
      },
      // 短信
      msgForm: {
        mobile: '',
        status: '',
        userPhone: ''
      },
      msgRules: {
        mobile: [{ required: true, message: '请输入SIM手机号' }],
        status: [{ required: true, message: '请选择状态' }]
      },
      // 微信
      wxForm: {
        id: '',
        pubkey: '',
        applyId: '',
        email: ''
      },
      wxRules: {
        id: [{ required: true, message: '请输入企业ID' }],
        pubkey: [{ required: true, message: '请输入企业密钥' }],
        applyId: [{ required: true, message: '请输入接收人邮箱' }]
      },
      questType: { email: 'emailForm', msg: 'msgForm', wx: 'wxForm' }
    }
  },
  methods: {
    handleClick() {},
    saveConfig(formName, type) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dealUser('addUser', this.questType[type])
        } else {
          return false
        }
      })
    },
    dealUser(url, datas) {
      fetch[url](datas).then((data) => {
        data.procData(
          data.res,
          () => {
            this.$message.success('操作成功')
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

<style lang="less" scoped>
.test-main {
  position: relative;
  .test-btn {
    position: absolute;
    right: -70px;
    top: 0;
  }
}
</style>