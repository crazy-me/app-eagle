<template>
  <div class="home-main">
    <el-row :gutter="20">
      <draggable v-model="menuList"
                 group="site"
                 animation="100"
                 @end="onEnd">
        <transition-group>
          <el-col :span="4"
                  :xs="12"
                  v-for="(item) in menuList"
                  :key="item.id">
            <div class="home-item"
                 @click="itemClick(item)">
              <div class="home-icon">
                <i :class="item.icon || 'el-icon-discount'"></i>
              </div>
              <div class="bubble-main">
                <div class="bubble bubble-one"></div>
                <div class="bubble bubble-two"></div>
                <div class="bubble bubble-three"></div>
              </div>
              <div>
                <span class="delete-main"
                      @click.stop="deleteMenu"><i class="el-icon-delete delete-icon"></i></span>
              </div>
            </div>
            <div class="home-text mb-20 mt-20">
              <h4 class="home-title">{{ item.menuName }}</h4>
            </div>
          </el-col>
        </transition-group>
      </draggable>
    </el-row>
  </div>
</template>

<script>
import fetch from '@/common/apis/other'
import { mapMutations } from 'vuex'
import draggable from 'vuedraggable'
export default {
  components: { draggable },
  data() {
    return {
      drag: false,
      //定义要被拖拽对象的数组
      menuList: [
        { id: '1-1', center: 'cmdb', path: 'model/1', menuName: '智能巡检' },
        { id: '1-2', center: 'cmdb', path: 'model/1', menuName: '模型管理' },
        { id: '1-3', center: 'cmdb', path: 'model/1', menuName: '机房管理' },
        { id: '1-4', center: 'cmdb', path: 'model/1', menuName: '智能预警' },
        { id: '1-5', center: 'cmdb', path: 'model/1', menuName: '告警策略' },
        { id: '1-6', center: 'cmdb', path: 'model/1', menuName: '自愈分析' },
        { id: '1-7', center: 'cmdb', path: 'model/1', menuName: '网络拓扑图' },
        { id: '1-8', center: 'cmdb', path: 'model/1', menuName: '主机管理' },
        { id: '1-9', center: 'cmdb', path: 'model/1', menuName: '报表中心' },
        { id: '1-10', center: 'system', path: 'user', menuName: '通知设置' },
        { id: '1-11', center: 'cmdb', path: 'model/1', menuName: '品牌管理' },
        { id: '1-12', center: 'cmdb', path: 'model/1', menuName: '运维助手' }
      ],
      // 添加
      showAddModal: false,
      addData: {}
    }
  },
  created() {
    // 当取到本地有菜单列表正常显示
    if (localStorage.getItem('currentCenter')) {
      let tmpCenter = localStorage.getItem('currentCenter')
      this.CHANGE_CENTER(tmpCenter)
    } else {
      this.CHANGE_CENTER('cmdb')
    }
    // this.getList()
  },
  methods: {
    ...mapMutations(['EXPAND_MANU', 'CHANGE_CENTER']),
    getList() {
      fetch.getSysHomeMenuList({}).then((data) => {
        data.procData(
          data.res,
          (data) => {
            this.menuList = data
            // console.log(data)
          },
          (err) => {
            this.$message.error(err)
          }
        )
      })
    },
    onEnd() {
      let menuIds = this.menuList.map((item) => {
        return item.id
      })
      console.log(menuIds)
    },
    // 跳转
    itemClick(item) {
      this.CHANGE_CENTER(item.center)
      localStorage.setItem('currentCenter', item.center)
      this.$router.push({
        path: item.path
      })
    },
    // 删除菜单
    deleteMenu(data, index) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let menuIds = this.menuList.map((item) => {
            return item.id
          })
          menuIds.splice(index, 1)
          fetch.delSysHomeMenu({ ids: [data.id], sortIds: menuIds }).then((data) => {
            data.procData(
              data.res,
              () => {
                this.$message.success('操作成功')
                this.getList()
              },
              (err) => {
                this.$message.error(err)
              }
            )
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.home-main {
  width: 100%;
  padding: 20px;
  background: #f0f4f5;
  overflow-y: auto;
  .home-item {
    border: 1px dashed #d3d6d8;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 180px;
    background: #fff;
    padding: 30px 0px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    .home-icon {
      width: 80px;
      height: 80px;
      border-radius: 10px;
      font-size: 48px;
      color: #fff;
      background: #3367d6;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px dashed transparent;
    }
    .bubble {
      visibility: hidden;
      background: #fff;
      height: 10px;
      width: 10px;
      border-radius: 50%;
      left: 4.5em;
      bottom: 2em;
      position: absolute;
      opacity: 1;
    }
    .bubble-one {
      animation: bubble 0.8s ease infinite;
      animation-delay: 0.2s;
      height: 5px;
      width: 5px;
    }
    .bubble-two {
      animation: bubble 1.5s ease infinite;
      animation-delay: 0.5s;
      height: 8px;
      width: 8px;
    }
    .bubble-three {
      animation: bubble 1.8s ease infinite;
      animation-delay: 0.7s;
    }
    .delete-main {
      position: absolute;
      top: 10px;
      right: 10px;
      visibility: hidden;
      display: inline-block;
      padding: 3px 6px;
      background: #e4e6ef;
      border-radius: 4px;
      .delete-icon {
        color: #ee3158;
      }
      &:hover {
        background: #ee3158;
        .delete-icon {
          color: #fff;
        }
      }
    }
    &:hover {
      background: #3367d6;
      .home-icon {
        background: #e8eefc;
        color: #3367d6;
        border: 1px dashed #d3d6d8;
      }
      .bubble {
        visibility: inherit;
      }
      .delete-main {
        visibility: inherit;
      }
    }
  }
  .home-text {
    flex: 1;
    text-align: center;
    .home-title {
      font-size: 16px;
      color: #555;
      margin-top: 20px;
    }
  }
  @keyframes bubble {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      bottom: 9em;
    }
  }
}
</style>