<template>
  <el-row :gutter="15"
          class="tree-drag">
    <el-col :span="6">
      <el-card shadow="never">
        <div slot="header">
          <span>拖拽到右侧生成自定义菜单</span>
        </div>
        <el-tree :data="treeData1"
                 ref="tree1"
                 class="tree"
                 node-key="id"
                 draggable
                 default-expand-all
                 :allow-drop="returnFalse"
                 @node-drag-start="handleDragstart"
                 @node-drag-end="handleDragend">
        </el-tree>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card shadow="never">
        <div slot="header">
          <span>上下拖拽调整菜单</span>
          <el-tooltip class="item"
                      effect="dark"
                      content="新建分组"
                      placement="top"
                      style="float: right; padding: 3px 8px">
            <el-button plain
                       type="primary"
                       @click="addMenu">+</el-button>
          </el-tooltip>
        </div>
        <el-tree :data="treeData2"
                 ref="tree2"
                 class="tree"
                 node-key="id"
                 draggable
                 default-expand-all
                 :allow-drop="returnTrue">
          <span class="custom-tree-node"
                slot-scope="{ node, data }">
            <span><i :class="data.icon"
                 class="mr-10"></i>{{ node.label }}</span>
            <el-dropdown @command="val => handleCommand(val,data)">
              <span class="el-dropdown-link">
                <el-button slot="reference"
                           type="text"
                           icon="el-icon-more"></el-button>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="editIcon"><i class="el-icon-picture-outline mr-10"></i>编辑图标</el-dropdown-item>
                <el-dropdown-item divided
                                  command="addGroup"><i class="el-icon-folder-add mr-10"></i>新建子分组</el-dropdown-item>
                <el-dropdown-item divided
                                  command="rename"><i class="el-icon-edit-outline mr-10"></i>重命名</el-dropdown-item>
                <el-dropdown-item divided
                                  command="removeMenu"><i class="el-icon-delete mr-10"></i>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </el-tree>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      treeData1: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [{ id: 9, label: '三级 1-1-1', icon: 'el-icon-setting' }]
            }
          ]
        }
      ],
      treeData2: [
        {
          id: 2,
          label: '一级 1',
          children: [
            {
              id: 5,
              label: '二级 1-1',
              children: [{ id: 8, label: '三级 1-1-1', icon: 'el-icon-setting' }]
            }
          ]
        }
      ]
    }
  },
  methods: {
    addMenu() {},
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
    handleDragstart(node, event) {
      this.$refs.tree2.$emit('tree-node-drag-start', event, { node: node })
    },
    handleDragend(draggingNode, endNode, position, event) {
      // 插入一个空节点用于占位
      let emptyData = { id: +new Date(), children: [] }
      this.$refs.tree1.insertBefore(emptyData, draggingNode)

      this.$refs.tree2.$emit('tree-node-drag-end', event)
      this.$nextTick(() => {
        // 如果是移动到了当前树上，需要清掉空节点
        if (this.$refs.tree1.getNode(draggingNode.data)) {
          this.$refs.tree1.remove(emptyData)
        } else {
          // 如果移动到了别的树上，需要恢复该节点，并清掉空节点
          // let data = JSON.parse(JSON.stringify(draggingNode.data))
          // this.$refs.tree1.insertAfter(data, this.$refs.tree1.getNode(emptyData))
          this.$refs.tree1.remove(emptyData)
        }
      })
    },
    returnTrue() {
      return true
    },
    returnFalse() {
      return false
    }
  }
}
</script>

<style scoped lang="less">
.tree-drag {
  .el-card {
    height: 500px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>
