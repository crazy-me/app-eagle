<template>
  <el-aside class="slide-bar"
            :width="isCollapse ? '65px' : '226px'">
    <el-menu class="slide-menu"
             :default-active="activeMenu"
             :unique-opened="true"
             :collapse="isCollapse">
      <template v-for="(item, index) in menuList">
        <el-menu-item v-if="!(item.children && item.children.length)"
                      :key="item.menuPath"
                      :index="item.menuPath"
                      @click="handleJump(item.menuPath)">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.menuName }}</span>
        </el-menu-item>
        <el-submenu v-if="item.children && item.children.length"
                    :key="index"
                    :index="String(index)">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.menuName }}</span>
          </template>
          <aside-bar-item v-for="(child, keys) in item.children"
                          :key="child.menuPath"
                          :cIndex="index + '_' + keys"
                          :router="child"
                          @handleJump="handleJump(child.menuPath)">
          </aside-bar-item>
        </el-submenu>
      </template>
    </el-menu>
    <span class="expand-container"
          :class="[isCollapse ? 'active' : '']"
          @click="handleExpand"><i :class="[isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']"></i></span>
  </el-aside>
</template>

<script>
import AsideBarItem from '@/components/common/AsideBarItem'
import { menuList } from '@/common/menuList'
import { mapState } from 'vuex'
export default {
  components: { AsideBarItem },
  data() {
    return {
      menuList: [],
      isCollapse: false,
      expandIcon: 'el-icon-d-arrow-left'
    }
  },
  computed: {
    ...mapState(['isExpand', 'currentCenter']),
    activeMenu() {
      return this.$route.path
    }
  },
  watch: {
    // isExpand(val) {
    //   this.isCollapse = val
    // }
    currentCenter() {
      this.getList()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.menuList = menuList[this.currentCenter]
      // this.$router.push({
      //   path: this.menuList[0].children
      //     ? this.menuList[0].children[0].menuPath
      //     : this.menuList[0].menuPath
      // })
    },
    // 控制展开收缩
    handleExpand() {
      this.isCollapse = !this.isCollapse
    },
    handleJump(path) {
      this.$router.push({
        path: path
      })
    }
  }
}
</script>

<style lang="less" scoped>
.slide-bar {
  background: #fff;
  transition: all, 0.3s;
  border-right: 1px solid #e6e6e6;
  overflow-x: hidden;
  overflow-y: auto;
  .slide-menu:not(.el-menu--collapse) {
    width: 225px;
  }
  .expand-container {
    background: #fff;
    position: absolute;
    top: 50%;
    left: 225px;
    display: inline-block;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    border: 1px solid #e6e6e6;
    border-left: none;
    border-radius: 0 5px 5px 0;
    transition: left, 0.3s;
    &.active {
      left: 64px;
    }
  }
}
</style>
