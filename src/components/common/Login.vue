<template>
  <div class="login-container">
    <el-row class="login-main">
      <el-row class="view-main">
        <el-col class="left-grid-content"
                :span="12">
          <div class="left-main">
            <p>
              <!-- <img class="login-logo" src="../../assets/img/login/logo.png" alt=""> -->
            </p>
            <!-- <h3 class="welcome">欢迎使用HYDO智维管理平台</h3> -->
            <!-- <p class="welcome-tip">简单轻松，职责分明、安全高效、稳定可靠、智能管控</p> -->
            <!-- <p class="copyright">版权所有&copy;北京豪越伟业科技有限公司</p> -->
          </div>
        </el-col>
        <el-col class="right-grid-content"
                :span="12">
          <p class="sys-name">登陆</p>
          <el-col :span="24">
            <el-form :model="loginForm"
                     @keyup.enter.native="submitForm('loginForm')"
                     :rules="rules"
                     ref="loginForm"
                     class="demo-loginForm">
              <el-form-item label=""
                            prop="username">
                <el-input v-model.trim="loginForm.username"
                          prefix-icon="el-icon-user"
                          placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item class="eye-main"
                            label=""
                            prop="password">
                <el-input :type="passwordType"
                          v-model="loginForm.password"
                          prefix-icon="el-icon-lock"
                          placeholder="密码"></el-input>
                <span class="show-pwd"
                      :class="!passwordType ? 'eye' : 'no'"
                      @click="showPwd"></span>
              </el-form-item>
              <el-form-item label=""
                            prop="checked">
                <el-checkbox v-model="loginForm.checked">记住账号</el-checkbox>
              </el-form-item>
              <el-form-item class="alignCenter">
                <el-button style="width:100%;"
                           type="primary"
                           @click="submitForm('loginForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import fetch from '../../common/apis/other'
export default {
  data() {
    return {
      passwordType: 'password',
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  created() {},
  methods: {
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          localStorage.setItem('tokenB', '13')
          localStorage.setItem('usernameB', '123123')
          localStorage.setItem('userIdB', '123123')
          this.$router.push({
            path: '/'
          })
          fetch.login({ ...this.loginForm }).then((data) => {
            data.procData(
              data.res,
              (data) => {
                localStorage.setItem('tokenB', data.token)
                localStorage.setItem('usernameB', data.username)
                localStorage.setItem('userIdB', data.id)
                this.$router.push({
                  path: '/'
                })
                // Promise.all([this.getList(), this.getBtnList()])
                //   .then((res) => {
                //     let data0 = res[0]
                //     let data1 = res[1]
                //     if (!data0.length) {
                //       this.$message.warning('未拥有菜单权限，请联系管理员分配权限后重试')
                //       localStorage.clear()
                //       return
                //     }
                //     this.$router.push({
                //       path: '/'
                //     })
                //     localStorage.setItem('buttonListB', JSON.stringify(data1))
                //   })
                //   .catch((e) => console.log(e))
                this.$message.success('登录成功')
              },
              (err) => {
                this.$message.error(err)
              }
            )
          })
        }
      })
    },
    // 获取列表
    getList() {
      const promise = new Promise((resolve) => {
        fetch.getMenu({}).then((data) => {
          data.procData(
            data.res,
            (data) => {
              resolve(data)
            },
            (err) => {
              localStorage.clear()
              this.$message.error(err)
            }
          )
        })
      })
      return promise
    },
    getBtnList() {
      const promise = new Promise((resolve) => {
        fetch.getBtnList({}).then((data) => {
          data.procData(
            data.res,
            (data) => {
              resolve(data)
            },
            (err) => {
              localStorage.clear()
              this.$message.error(err)
            }
          )
        })
      })
      return promise
    }
  }
}
</script>

<style lang="less">
.login-container {
  background: url(../../assets/img/login/bg-01.png);
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 100% 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  font-family: 'PingFang SC';
  .login-main {
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    vertical-align: middle;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    .view-main {
      height: 556px;
    }
  }
  .left-grid-content {
    height: 556px;
    position: relative;
    background: url(../../assets/img/login/left.png) no-repeat center;
    background-size: auto 100%;
    border-radius: 5px 0px 0px 5px;
    &:before {
      content: '';
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      position: absolute;
      z-index: 0;
      border-radius: 5px 0px 0px 5px;
      background: linear-gradient(
        to right,
        rgba(94, 114, 228, 0.9) 0%,
        rgba(94, 114, 228, 0.9) 100%
      );
    }
    .left-main {
      color: #fff;
      text-align: center;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      top: 0;
      border-radius: 5px 0px 0px 5px;
      .login-logo {
        display: block;
        width: 140px;
        height: 28px;
        margin: 90px auto;
      }
      .welcome {
        font-weight: bold;
        font-size: 20px;
      }
      .welcome-tip {
        font-size: 12px;
        line-height: 60px;
      }
      .copyright {
        width: 100%;
        font-size: 12px;
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .right-grid-content {
    color: #333;
    background: #fff;
    height: 100%;
    padding: 30px;
    border-radius: 0px 5px 5px 0px;
    .sys-name {
      text-align: center;
      font-size: 24px;
      line-height: 180px;
    }
    .eye-main {
      position: relative;
      .show-pwd {
        width: 18px;
        height: 12px;
        position: absolute;
        right: 10px;
        top: 18px;
        cursor: pointer;
        &.eye {
          background: url('../../assets/img/login/eye.png') no-repeat;
          background-size: 100% 100%;
        }
        &.no {
          background: url('../../assets/img/login/eyeno.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .el-input__inner {
    background-color: transparent;
    height: 50px;
    line-height: 50px;
  }
  .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner:focus,
  .el-form-item.is-error .el-textarea__inner,
  .el-form-item.is-error .el-textarea__inner:focus,
  .el-message-box__input input.invalid,
  .el-message-box__input input.invalid:focus {
    border-color: #f00;
  }
  .el-button--primary {
    border: none;
    height: 46px;
    color: #fff;
    background: linear-gradient(to right, rgba(148, 68, 231) 30%, rgba(53, 150, 247) 100%);
    font-weight: 600;
  }
  input:focus {
    outline: none;
    border: #87c6f9 1px solid;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 5px rgba(102, 175, 233, 1);
  }
}
@-webkit-keyframes iconAnimate {
  0%,
  100% {
    -webkit-transform: translateY(80%);
    transform: translateY(80%);
  }
  50% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
  }
}
@keyframes iconAnimate {
  0%,
  100% {
    -webkit-transform: translateY(80%);
    transform: translateY(80%);
  }
  50% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
  }
}
@media (min-width: 576px) {
  .login-main {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .login-main {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .login-main {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .login-main {
    max-width: 960px;
  }
}
</style>
