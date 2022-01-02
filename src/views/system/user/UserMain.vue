<template>
  <el-row class="user-main ">
    <el-tabs v-model="activeName"
             type="card">
      <el-tab-pane label="用户管理"
                   name="1">
        <user-list v-if="activeName === '1'"></user-list>
      </el-tab-pane>
      <el-tab-pane label="角色管理"
                   name="2">
        <role-list v-if="activeName === '2'"></role-list>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script>
import UserList from '@/views/system/user/UserList'
import RoleList from '@/views/system/role/RoleList'
export default {
  components: { UserList, RoleList },
  data() {
    return { activeName: '1' }
  },
  methods: {}
}
</script>
<style lang="less">
.user-main {
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background: #fff;
    border-bottom-color: #3367d6;
  }
}
</style>
