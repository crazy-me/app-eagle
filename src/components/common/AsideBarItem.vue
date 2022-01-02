<template>
  <div class="asideBarItem-contant">
    <el-submenu v-if="router.children && router.children.length"
                :index="cIndex+''">
      <template slot="title">
        <i v-if="!router.menuPath"
           :class="router.icon"></i>
        <span>{{ router.menuName }}</span>
      </template>
      <!-- 递归有子孙导航组件 -->
      <aside-bar-item v-for="(child, keys) in router.children"
                      :key="child.menuPath"
                      :cIndex="cIndex + '_' + keys"
                      :router="child"
                      @handleJump="handleJump(child.menuPath)">
      </aside-bar-item>
    </el-submenu>
    <!-- 无子孙导航 -->
    <el-menu-item v-if="!(router.children && router.children.length)"
                  :key="router.menuPath"
                  :index="router.menuPath"
                  @click="handlePathJump">
      <i v-if="!router.menuPath"
         :class="router.icon"></i>
      <span slot="title">{{ router.menuName }}</span>
    </el-menu-item>
  </div>
</template>

<script>
import AsideBarItem from '@/components/common/AsideBarItem'
export default {
  name: 'AsideBarItem',
  components: { AsideBarItem },
  props: {
    router: {
      type: Object,
      required: true
    },
    cIndex: {
      required: true
    }
  },
  methods: {
    handlePathJump() {
      this.$emit('handleJump')
    },
    handleJump(path) {
      this.$router.push({
        path: path
      })
    }
  }
}
</script>

<style lang="scss" scope>
</style>