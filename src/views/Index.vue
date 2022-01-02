<template>
  <el-container direction="vertical">
    <Top></Top>
    <el-container direction="horizontal"
                  class="main-content">
      <!-- 首页看板不展示左侧菜单栏 用单独的页面显示 -->
      <router-view v-if="$route.path === '/home'"></router-view>
      <!-- 内部页面展示 -->
      <template v-else>
        <SliderBar></SliderBar>
        <el-main>
          <Crumb />
          <router-view />
          <el-footer>版权所有&copy;北京豪越伟业科技有限公司</el-footer>
        </el-main>
      </template>
    </el-container>
  </el-container>
</template>

<script>
import Top from '@/components/common/Top'
import SliderBar from '@/components/common/SliderBar'
import Crumb from '@/components/common/Crumb'
export default {
  components: { Top, SliderBar, Crumb }
}
</script>

<style lang="less">
.main-content {
  height: calc(100vh - 60px);
  max-height: calc(100vh - 60px);
  overflow: hidden;
  background: #f7f8fa;
  font-size: 14px;
  .el-main {
    padding-bottom: 0px;
  }
  .el-footer {
    height: 30px !important;
    line-height: 30px;
    font-size: 12px;
  }
}
</style>
