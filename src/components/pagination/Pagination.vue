<template>
  <el-pagination class="mt-20"
                 :pager-count="pagerCount"
                 :hide-on-single-page="hideValue"
                 :page-sizes="pageSizes"
                 :page-size="pageSize"
                 :current-page.sync="currentPage"
                 layout="prev, pager, next, sizes, total"
                 :total="total"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 1
    },
    current: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      pageSizes: [10, 20, 30, 50],
      currentPage: 1,
      pagerCount: 9,
      hideValue: false
    }
  },
  created () {
    this.currentPage = this.current
  },
  watch: {
    current (val) {
      this.currentPage = val
    }
  },
  methods: {
    // 每页展示的条数
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val)
    },
    // 当前页
    handleCurrentChange (val) {
      this.$emit('handleCurrent', val)
    }
  }
}
</script>

<style lang="less">
.el-pagination {
  text-align: right;
}
</style>
