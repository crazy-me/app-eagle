<template>
  <div class="curmb-container pb-15 mb-15">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item,index) in breadList"
                          :key="index">{{item.meta.title}}</el-breadcrumb-item>
      <!-- :replace="true" :to="{ path: item.path }" -->
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data () {
    return {
      breadList: [] // 路由集合
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    isHome (route) {
      return route.path === '/home'
    },
    getBreadcrumb () {
      let matched = this.$route.matched
      // 如果不是首页
      // if (!this.isHome(matched[1])) {
      //   matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched[1])
      // }
      this.breadList = matched
    }
  },
  created () {
    this.getBreadcrumb()
  }
}
</script>
<style lang="less" scoped>
.curmb-container {
  border-bottom: 1px solid #ebeef5;
}
</style>
