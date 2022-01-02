<template>
  <div class="base-input-wraper">
    <el-input v-bind="$attrs"
              v-on="$listeners"
              ref="diyInput"
              :style="inputStyle"
              :value="value"
              :size="size"
              :placeholder="placeholder"
              @input.native="inputEmit"></el-input>
  </div>
</template>

<script>
const sizeList = {
  medium: '36px',
  small: '32px',
  mini: '28px'
}
export default {
  name: 'baseInput',
  props: {
    value: {},
    width: {
      type: Number
    },
    size: {
      type: String
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {}
  },
  computed: {
    inputStyle() {
      return {
        width: `${this.width}px`
      }
    },
    wraperStyle() {
      return {
        height: sizeList[this.size]
      }
    }
  },
  methods: {
    inputEmit(e) {
      let reg = /<>/g
      // let reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g
      this.$emit('input', e.target.value.replace(reg, ''))
    }
  }
}
</script>
<style lang="less" scoped>
</style>