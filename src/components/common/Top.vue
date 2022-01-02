<template>
  <el-header>
    <el-row>
      <el-col class="top-left"
              :span="12">
        <el-image style="width: 30px; height: 30px; vertical-align: middle;"
                  :src="logoSrc"
                  fit="fill"></el-image>
        <span class="hidden-xs-only ml-10 home-title">{{homeTitle}}</span>
        <el-popover v-if="showConfig"
                    placement="bottom"
                    trigger="hover">
          <el-tree ref="menuTree"
                   :data="menuList"
                   show-checkbox
                   default-expand-all
                   node-key="id"
                   :default-checked-keys="defaultKeys"
                   :props="defaultProps"
                   @check-change="checkChange">
          </el-tree>
          <!-- <el-checkbox :indeterminate="isIndeterminate"
                       v-model="checkAll"
                       @change="handleCheckAllChange">所有系统</el-checkbox>
          <el-divider class="ma-0"></el-divider>
          <el-checkbox-group v-model="menuChecked"
                             @change="handleWeekChange">
            <el-checkbox v-for="(item, index) in menuList"
                         :label="index"
                         :key="index">{{ item }}</el-checkbox>
          </el-checkbox-group> -->
          <el-button class="ml-20"
                     plain
                     size="small"
                     slot="reference">常用配置<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        </el-popover>
        <span v-if="!showConfig"
              class="jump-home ml-20"
              @click="jumpHome">
          <el-tooltip class="item"
                      effect="dark"
                      content="首页"
                      placement="bottom">
            <i class="el-icon-menu"></i>
          </el-tooltip>
        </span>
        <!-- <span v-if="!showConfig" class="jump-home ml-20"
              @click="jumpHome">
          <i :class="isExpand ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </span> -->
        <el-select v-if="!showConfig"
                   class="ml-20"
                   v-model="center"
                   size="small"
                   placeholder="中心选择"
                   style="width: 120px"
                   @change="centerChange">
          <el-option v-for="item in centerList"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col class="top-right"
              :span="12">
        <span class="help mr-20"><i class="icon iconfont icon-a-103"></i></span>
        <el-popover placement="top"
                    width="490">
          <div style="height:350px;overflow-y:auto;">
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
              <el-tab-pane label="告 警"
                           name="1">
                <div>
                  <span><i class="el-icon-chat-dot-square"></i></span>
                </div>
              </el-tab-pane>
              <el-tab-pane label="通 知"
                           name="2">通知</el-tab-pane>
            </el-tabs>
          </div>
          <el-badge slot="reference"
                    class="msg-tip mr-30"
                    type="primary"
                    :max="99"
                    :value="msg">
            <span class="warning mr-20"
                  :class="[msg ? 'active' : '']"><i class="icon iconfont icon-a-6"></i> </span>
          </el-badge>
        </el-popover>
        <el-dropdown @command="handleCommand">
          <div class="el-dropdown-link">
            <el-avatar class="avatar"
                       shape="square"
                       :size="40"
                       :src="avatarSrc"></el-avatar>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="config"
                              command="goManage"><i class="el-icon-setting mr-10"></i>配置管理</el-dropdown-item>
            <el-dropdown-item divided
                              class="theme"
                              command="resetPass"><i class="el-icon-magic-stick mr-10"></i>主题</el-dropdown-item>
            <el-dropdown-item divided
                              command="gologin"><i class="el-icon-right mr-10"></i>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import fetch from '../../common/apis/other'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      currentPath: this.$route.path,
      showConfig: false,
      homeTitle: '',
      avatarSrc: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      username: localStorage.getItem('usernameB'),
      logoSrc: require('../../assets/img/logo.png'),
      msg: '30',
      defaultKeys: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      menuChecked: [],
      menuList: [
        {
          id: 1,
          label: '监控中心',
          children: [
            {
              id: 9,
              label: '三级 1-1-1'
            },
            {
              id: 10,
              label: '三级 1-1-2'
            }
          ]
        },
        {
          id: 2,
          label: '故障中心',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        }
      ],
      checkAll: false,
      isIndeterminate: false,
      centerList: [
        { value: 'cmdb', name: 'CMDB配置中心' },
        { value: 'watch', name: '监控中心' },
        { value: 2, name: '故障中心' },
        { value: 3, name: '自动化' },
        { value: 4, name: '日志管理中心' },
        { value: 5, name: '智能助手' },
        { value: 6, name: '报表中心' },
        { value: 'system', name: '配置中心' }
      ],
      center: 'cmdb',
      activeName: '1'
    }
  },
  watch: {
    $route(to) {
      // 首页展示我的控制台，其他展示运维名称
      if (to.path === '/home') {
        this.homeTitle = '我的控制台'
        this.showConfig = true
      } else {
        this.homeTitle = 'HYDO智能运维大数据管理平台'
        this.showConfig = false
      }
    },
    currentCenter(val) {
      this.center = val
    }
  },
  created() {
    // 当刷新页面时存储到本地存储
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('currentCenter', this.center)
    })
    // 当取到本地有菜单列表正常显示
    if (localStorage.getItem('currentCenter')) {
      let tmpCenter = localStorage.getItem('currentCenter')
      this.CHANGE_CENTER(tmpCenter)
    } else {
      this.CHANGE_CENTER('cmdb')
    }
  },
  mounted() {
    // 首页展示我的控制台，其他展示运维名称
    if (this.currentPath === '/home') {
      this.homeTitle = '我的控制台'
      this.showConfig = true
    } else {
      this.homeTitle = 'HYDO智能运维大数据管理平台'
      this.showConfig = false
    }
  },
  computed: {
    ...mapState(['isExpand', 'currentCenter']),
    activeMenu() {
      return this.$route.path
    }
  },
  methods: {
    ...mapMutations(['EXPAND_MANU', 'CHANGE_CENTER']),
    jumpHome() {
      // this.EXPAND_MANU()
      if (this.$route.path !== '/home') {
        this.$router.push({
          path: '/home'
        })
      }
    },
    checkChange() {
      this.menuChecked = this.$refs.menuTree.getCheckedKeys()
    },
    // //菜单选择
    // handleCheckAllChange(val) {
    //   if (val) {
    //     this.menuChecked = this.menuList.map((item, index) => {
    //       return index
    //     })
    //   } else {
    //     this.menuChecked = []
    //   }
    //   this.isIndeterminate = false
    // },
    // handleWeekChange(value) {
    //   let checkedCount = value.length
    //   this.checkAll = checkedCount === this.menuList.length
    //   this.isIndeterminate = checkedCount > 0 && checkedCount < this.menuList.length
    // },
    centerChange(val) {
      this.CHANGE_CENTER(val)
      localStorage.setItem('currentCenter', val)
    },
    // 告警
    handleClick() {
      console.log(123)
    },
    handleCommand(command) {
      switch (command) {
        case 'gologin':
          fetch.logout({}).then((data) => {
            data.procData(
              data.res,
              () => {
                localStorage.clear()
                this.$router.push({
                  path: '/login'
                })
              },
              (err) => {
                this.$message.error(err)
              }
            )
          })
          break
        case 'config':
          break
        case 'theme':
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  width: 100%;
  background-color: #fff;
  color: #303133;
  border-bottom: 1px solid #efeffd;
  // background-color: #3367d6;
  // color: #fefefe;
  line-height: 60px;
  .home-title {
    font-weight: bold;
  }
  .jump-home {
    font-size: 22px;
    vertical-align: middle;
    cursor: pointer;
    &:hover {
      .home-slide-bar {
        display: block;
      }
    }
  }
  .top-right {
    text-align: right;
    .help {
      display: inline-block;
      cursor: pointer;
      font-size: 20px;
      color: #878787;
      vertical-align: middle;
    }
    .msg-tip {
      cursor: pointer;
      width: 20px;
      height: 30px;
      line-height: 30px;
      vertical-align: middle;
    }
    .warning {
      font-size: 20px;
      color: #878787;
      &.active {
        color: #3367d6;
      }
    }
    .el-dropdown {
      height: 60px;
      line-height: 60px;
      // color: #fefefe;
      color: #303133;
    }
    .avatar {
      vertical-align: middle;
    }
  }
}
</style>
<style lang="less">
.el-checkbox {
  height: 40px;
  line-height: 40px;
}
</style>