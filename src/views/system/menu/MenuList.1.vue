<template>
  <div class="tree-drag">
    <el-card shadow="never">
      <tree-transfer :title="title"
                     :from_data='fromData'
                     :to_data='toData'
                     :defaultProps="{label:'label'}"
                     @addBtn='add'
                     @removeBtn='remove'
                     :mode='mode'
                     :renderContentRight="renderContentRight"
                     height='540px'
                     filter
                     draggable
                     openAll>
      </tree-transfer>
    </el-card>
  </div>
</template>
<script>
import treeTransfer from 'el-tree-transfer' // 引入
export default {
  components: { treeTransfer },
  data() {
    return {
      title: ['原菜单', '自定义菜单'],
      mode: 'transfer',
      fromData: [
        {
          id: '1',
          pid: 0,
          label: '一级 1',
          children: [
            {
              id: '1-1',
              pid: '1',
              label: '二级 1-1',
              children: []
            },
            {
              id: '1-2',
              pid: '1',
              label: '二级 1-2',
              children: [
                {
                  id: '1-2-1',
                  pid: '1-2',
                  children: [],
                  label: '二级 1-2-1'
                },
                {
                  id: '1-2-2',
                  pid: '1-2',
                  children: [],
                  label: '二级 1-2-2'
                }
              ]
            }
          ]
        }
      ],
      toData: []
    }
  },
  methods: {
    renderContentRight(h, { node, data }) {
      return (
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <i class={data.icon} class="mr-10"></i>
            {node.label}
          </span>
          <el-dropdown on-command={(val) => this.handleCommand(val, data)}>
            <span class="el-dropdown-link">
              <el-button slot="reference" type="text" icon="el-icon-more"></el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="editIcon">
                <i class="el-icon-picture-outline mr-10"></i>编辑图标
              </el-dropdown-item>
              <el-dropdown-item divided command="addGroup">
                <i class="el-icon-folder-add mr-10"></i>新建子分组
              </el-dropdown-item>
              <el-dropdown-item divided command="rename">
                <i class="el-icon-edit-outline mr-10"></i>重命名
              </el-dropdown-item>
              <el-dropdown-item divided command="removeMenu">
                <i class="el-icon-delete mr-10"></i>删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      )
    },
    // 点击下拉
    handleCommand(val, data) {
      this[val](data)
    },
    // 重命名
    rename() {
      console.log('rename')
    },
    // 删除
    removeMenu(node) {
      console.log(node)
    },
    changeMode() {
      if (this.mode == 'transfer') {
        this.mode = 'addressList'
      } else {
        this.mode = 'transfer'
      }
    },
    // 监听穿梭框组件添加
    add(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的        {keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log('fromData:', fromData)
      console.log('toData:', toData)
      console.log('obj:', obj)
    },
    // 监听穿梭框组件移除
    remove(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log('fromData:', fromData)
      console.log('toData:', toData)
      console.log('obj:', obj)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
