<template>
  <div class="menutree">
    <template v-for="(item, index) in data">
      <el-menu-item v-if="!item.children"
                    :key="item.url"
                    :index="item.url"
                    @click="handleJump(item.url)">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.text }}</span>
      </el-menu-item>
      <el-submenu v-else
                  :key="index"
                  :index="String(index)">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.text }}</span>
        </template>
        <menutree :data="item.children"></menutree>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: 'menutree',
  data() {
    return {
      menu_data: {}
    }
  },
  props: ['data']
}
</script>