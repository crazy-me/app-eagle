<template>
  <el-row :gutter="15"
          class="sys-config">
    <el-col :span="6"
            :xs="24"
            class="mb-15">
      <el-card shadow="never">
        <p class="fontbold pb-20">编辑头像</p>
        <div class="alignCenter">
          <el-upload class="single-uploader avatar"
                     :action="url"
                     :headers="{ token: authId, system: 'sys', userId: userId }"
                     :show-file-list="false"
                     accept=".jpg, .jpeg, .png"
                     :on-success="uploadSuccess">
            <img v-if="cover"
                 :src="cover"
                 class="single-img" />
            <i v-else
               class="el-icon-plus single-uploader-icon"></i>
          </el-upload>
        </div>
        <p class="alignCenter mt-10 mb-10">{{userData.username}}</p>
        <p class="alignCenter">{{userData.mobile}}</p>
      </el-card>
    </el-col>
    <el-col :span="18"
            :xs="24">
      <el-card shadow="never">
        <el-tabs v-model="activeName">
          <el-tab-pane label="个人资料"
                       name="1">
            <el-col :span="12"
                    :xs="24">
              <el-card shadow="never">
                <el-form :model="userForm"
                         :rules="userRules"
                         ref="userForm"
                         label-width="80px"
                         class="user-form">
                  <el-form-item label="用户名："
                                prop="username">
                    <diy-input v-model.trim="userForm.username"
                               placeholder="用户名"></diy-input>
                  </el-form-item>
                  <el-form-item label="姓名："
                                prop="nickname">
                    <diy-input v-model.trim="userForm.nickname"
                               placeholder="姓名"></diy-input>
                  </el-form-item>
                  <el-form-item label="密码："
                                prop="password">
                    <diy-input v-model.trim="userForm.password"
                               type="password"
                               placeholder="密码"></diy-input>
                  </el-form-item>
                  <el-form-item label="手机号："
                                prop="mobile">
                    <diy-input v-model.trim="userForm.mobile"
                               placeholder="手机号"></diy-input>
                  </el-form-item>
                  <el-form-item label="微信号："
                                prop="meta.weChatId">
                    <diy-input v-model.trim="userForm.meta.weChatId"
                               placeholder="微信号"></diy-input>
                  </el-form-item>
                  <el-form-item label="邮箱："
                                prop="email">
                    <diy-input v-model.trim="userForm.email"
                               placeholder="邮箱"></diy-input>
                  </el-form-item>
                </el-form>
                <div>
                  <el-button type="primary"
                             @click="handleConfirm('editUser','userForm')">
                    更新个人资料
                  </el-button>
                </div>
              </el-card>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="系统信息"
                       name="2">
            <el-col :span="12"
                    :xs="24">
              <el-card shadow="never">
                <div>
                  <p class="fontbold mb-15">登录页面 LOGO</p>
                  <el-image v-if="sysForm.login_photo"
                            style="width:140px;height: 30px"
                            :src="sysForm.login_photo"
                            fit="fill"></el-image>
                  <el-upload class="single-uploader logo ml-20 mb-10"
                             :action="url"
                             :headers="{ token: authId, system: 'sys', userId: userId }"
                             :show-file-list="false"
                             accept=".jpg, .jpeg, .png"
                             :on-success="uploadSuccess">
                    <i class="el-icon-plus single-uploader-icon"></i>
                  </el-upload>
                  <p>
                    <el-tag type="warning"
                            size="mini">上传jpg、png格式的图片，大小不超过3M</el-tag>
                  </p>
                </div>
                <div>
                  <p class="fontbold mt-15 mb-15">内容描述</p>
                  <diy-input class="mb-15"
                             v-model.trim="sysForm.configMap.describe_title"
                             maxlength="20"
                             show-word-limit
                             placeholder="内容描述"></diy-input>
                  <diy-input v-model.trim="sysForm.configMap.describe_content"
                             type="textarea"
                             maxlength="50"
                             show-word-limit
                             placeholder="详细描述"></diy-input>
                </div>
                <div>
                  <p class="fontbold mt-15 mb-15">系统标题名称</p>
                  <diy-input class="mb-15"
                             v-model.trim="sysForm.configMap.system_title_name"
                             placeholder="系统标题名称"></diy-input>
                </div>
                <div>
                  <p class="fontbold mt-15 mb-15">版权信息</p>
                  <diy-input class="mb-15"
                             v-model.trim="sysForm.configMap.copyright"
                             placeholder="版权信息"></diy-input>
                </div>
                <div>
                  <p class="fontbold mt-15 mb-15">会话超时设置
                    <el-switch v-model="sysForm.configMap.timeSet"
                               active-color="#3367D6"></el-switch>
                  </p>
                  <el-input :disabled="!sysForm.configMap.timeSet"
                            class="mb-15"
                            v-model.trim="sysForm.configMap.token"
                            placeholder="会话超时时间">
                    <template slot="append">分钟</template>
                  </el-input>
                </div>
                <div>
                  <p class="fontbold m-15 mb-15">主页面 LOGO</p>
                  <el-image v-if="sysForm.configMap.home_logo"
                            style="width:30px;height: 30px;"
                            :src="sysForm.configMap.home_logo"
                            fit="fill"></el-image>
                  <el-upload class="single-uploader logo ml-20 mb-10"
                             :action="url"
                             :headers="{ token: authId, system: 'sys', userId: userId }"
                             :show-file-list="false"
                             accept=".jpg, .jpeg, .png"
                             :on-success="uploadSuccess">
                    <i class="el-icon-plus single-uploader-icon"></i>
                  </el-upload>
                  <p>
                    <el-tag type="warning"
                            size="mini">上传jpg、png格式的图片，大小不超过3M</el-tag>
                  </p>
                </div>
                <div>
                  <p class="fontbold mt-15 mb-15">浏览器 ICO 图标</p>
                  <el-image v-if="sysForm.configMap.browser_icon"
                            style="width:30px;height: 30px;"
                            :src="sysForm.configMap.browser_icon"
                            fit="fill"></el-image>
                  <el-upload class="single-uploader logo ml-20 mb-10"
                             :action="url"
                             :headers="{ token: authId, system: 'sys', userId: userId }"
                             :show-file-list="false"
                             accept=".jpg, .jpeg, .png"
                             :on-success="uploadSuccess">
                    <i class="el-icon-plus single-uploader-icon"></i>
                  </el-upload>
                  <p>
                    <el-tag type="warning"
                            size="mini">上传jpg、png格式的图片，大小不超过3M</el-tag>
                  </p>
                </div>
                <div class="mt-15">
                  <el-button type="primary"
                             @click="handleConfirm('editSysInfo', 'sysForm')">
                    更新系统信息
                  </el-button>
                </div>
              </el-card>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="授权信息"
                       name="3">
            <el-card shadow="never">
              <div>
                <p class="fontbold mt-15 mb-15">授权单位</p>
                <el-col :span="12"
                        class="pl-0">
                  <diy-input class="mb-15"
                             v-model.trim="sysForm.desc"
                             placeholder="授权单位"></diy-input>
                </el-col>
                <el-col :span="12">
                  <el-button type="primary"
                             plain
                             icon="el-icon-plus"></el-button>
                </el-col>
                <el-table :data="tableData">
                  <el-table-column type="index"
                                   label="序号"></el-table-column>
                  <el-table-column v-for="(item, index) in tableTitle"
                                   :key="index"
                                   :label="item.name"
                                   :prop="item.prop"
                                   :min-width="item.width"
                                   :show-overflow-tooltip="true">
                  </el-table-column>
                </el-table>
              </div>
              <div class="mt-15">
                <el-button type="primary"
                           @click="handleConfirm">
                  更新授权信息
                </el-button>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import fetch from '@/common/apis/system'
import fetchOther from '@/common/apis/other'
import validate from '@/common/validate'
import DiyInput from '@/components/public/DiyInput'
export default {
  components: { DiyInput },
  data() {
    return {
      url: fetchOther.uploadUrl,
      userId: localStorage.getItem('userIdB'),
      authId: localStorage.getItem('tokenB'),
      cover: '',
      userData: {
        username: '',
        mobile: ''
      },
      activeName: '1',
      userForm: {
        username: '',
        mobile: '',
        nickname: '',
        password: '',
        email: '',
        meta: { weChatId: '' }
      },
      userRules: { password: { validator: validate.validPassword } },
      sysForm: {
        configMap: {
          login_photo: '',
          describe_title: '',
          describe_content: '',
          system_title_name: '',
          home_logo: '',
          copyright: '',
          browser_icon: '',
          timeSet: true,
          token: ''
        }
      },
      tableTitle: [
        {
          prop: 'customerName',
          name: '授权模块',
          width: '100'
        },
        {
          prop: 'customerPhone',
          name: '授权数量',
          width: '100'
        }
      ],
      tableData: [{}]
    }
  },
  created() {
    this.getInfo()
    this.getSysInfo()
  },
  methods: {
    getInfo() {
      fetch.getUserInfo({ id: this.userId }).then((data) => {
        data.procData(
          data.res,
          (data) => {
            this.userForm = {
              id: data.id,
              username: data.username,
              nickname: data.nickname,
              mobile: data.mobile,
              password: '',
              meta: data.meta ? data.meta : { weChatId: '' },
              email: data.email
            }
            this.userData = {
              username: data.username,
              mobile: data.mobile
            }
          },
          (err) => {
            this.$message.error(err)
          }
        )
      })
    },
    // 获取系统配置信息
    getSysInfo() {
      fetch.getSysInfo({ sysType: '0' }).then((data) => {
        data.procData(
          data.res,
          (data) => {
            this.sysForm = data
            this.sysForm.sysType = '0'
          },
          (err) => {
            this.$message.error(err)
          }
        )
      })
    },
    // 上传成功
    uploadSuccess(res) {
      if (res.code === 0) {
        this.$message.success('上传成功')
        this.cover = res.data.filePath
      } else {
        this.$message.error('上传失败,请重新尝试')
      }
    },
    handleConfirm(url, name) {
      fetch[url](this[name]).then((data) => {
        data.procData(
          data.res,
          (data) => {
            this.$message.success(data.msg)
            if (name === 'userForm') {
              this.getInfo()
            } else if (name === 'sysForm') {
              this.getSysInfo()
            }
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
.sys-config {
  .single-uploader {
    display: inline-block;
    .el-upload {
      .single-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        text-align: center;
      }
      .single-img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    &.avatar {
      width: 148px;
      .el-upload {
        .single-uploader-icon {
          width: 148px;
          height: 148px;
          line-height: 148px;
        }
      }
    }
    &.logo {
      width: 130px;
      .el-upload {
        .single-uploader-icon {
          font-size: 14px;
          width: 130px;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
<style lang="less">
// 覆盖上传原样式
.single-uploader {
  .el-upload {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
</style>