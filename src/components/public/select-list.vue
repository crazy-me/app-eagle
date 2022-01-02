<template lang="html">
    <div>
        <el-select v-model="value" :placeholder="placeholder" :disabled="disable" @change="change"  :size="size">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        name:"select-list",
        computed: {
            value:{
                get(){
                    return this.$attrs.option || ''
                },
                set(){}
            },
            // 是否禁用
            disable(){
                return this.$attrs.disable || false
            },
            // 下拉选列表
            options(){
                return this.$attrs.optionList;
            },
            // 输入框尺寸
            size() {
                return this.$attrs.size
            },
            // 提示信息
            placeholder(){
                return this.$attrs.placeholder || '请选择'
            },
        },
        methods: {
            change(val) {
                this.$emit('changeOption',val);
            },
        }
    }
</script>
