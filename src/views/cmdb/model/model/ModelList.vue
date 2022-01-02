<template>
  <div class="model-main">
    <el-row>
      <el-button class="mb-15"
                 type="primary"
                 @click="handleAdd">新建分组</el-button>
    </el-row>
    <el-card v-for="(group, keys) in groupList"
             :key="keys"
             shadow="hover"
             class="mb-15">
      <el-row :gutter="10"
              type=“flex”>
        <p class="modal-title mb-10">
          <span @mouseenter="showModelEdit(keys)"
                @mouseleave="hideModelEdit">{{group.name}}
            <el-tooltip class="item"
                        effect="dark"
                        content="重命名"
                        placement="top">
              <i v-show="showTitleEdit && currentKeys === keys"
                 class="edit-model icon iconfont icon-a-17"
                 @click="showTitleInput(keys, group.name)"></i>
            </el-tooltip>
          </span>
          <el-form v-show="showInput && currentInputKeys === keys"
                   class="ml-15"
                   :ref="'titleForm_'+keys"
                   :model="titleForm"
                   :inline="true"
                   size="small"
                   style="display: inline-block">
            <el-form-item label=""
                          prop="name"
                          :rules="[{ required: true, message: '请输入标题' }]">
              <diy-input v-model="titleForm.name"></diy-input>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary"
                         icon="el-icon-check"
                         @click="submitTitle('titleForm_'+keys)"></el-button>
              <el-button icon="el-icon-close"
                         @click="cancelTitle"></el-button>
            </el-form-item>
          </el-form>
        </p>
        <el-col v-for="(item, index) in group.item"
                :key="index"
                :span="4"
                :xs="12">
          <div class="model-item mb-10"
               @click="handleDetail(item)">
            <el-image class="model-item-img"
                      style="width: 72px; height: 50px"
                      :src="item.icon"
                      fit="contain"></el-image>
            <div class="modal-item-right">
              <p class="title">{{item.name}}</p>
              <p class="dec">操作系统资源</p>
            </div>
            <el-tooltip class="item"
                        effect="dark"
                        content="弃用"
                        placement="top">
              <i v-if="item.candel === 1"
                 class="delete icon iconfont icon-a-104"
                 @click="deleteModel(item)"></i>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="4"
                :xs="12">
          <div class="model-item mb-10 add"
               @click="handleAddModel(group.name)">
            <i class="el-icon-plus add-icon"></i>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 添加组 -->
    <add-group v-if="showAddGroup"
               :isShow="showAddGroup"
               @handleClose="closeAddGroup"></add-group>
    <!-- 添加模型 -->
    <add-model v-if="showAddModal"
               :isShow="showAddModal"
               :data="addData"
               @handleClose="closeAddModal"></add-model>
    <!-- 模型详情 -->
    <group-detail v-if="showDetailModal"
                  :isShow="showDetailModal"
                  :data="detailData"
                  @handleClose="closeDetailModal"></group-detail>
  </div>
</template>

<script>
import fetch from '@/common/apis/cmdb'
import AddModel from '@/views/cmdb/model/model/AddModel'
import AddGroup from '@/views/cmdb/model/model/AddGroup'
import GroupDetail from '@/views/cmdb/model/model/GroupDetail'
import DiyInput from '@/components/public/DiyInput'
export default {
  components: { DiyInput, AddModel, AddGroup, GroupDetail },
  data() {
    return {
      currentKeys: '',
      showTitleEdit: false,
      currentInputKeys: '',
      showInput: false,
      titleForm: {
        name: ''
      },
      groupList: [],
      // 添加
      showAddGroup: false,
      // 添加
      showAddModal: false,
      addData: {},
      // 详情
      showDetailModal: false,
      detailData: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetch.getModelList({}).then((data) => {
        data.procData(
          data.res,
          (data) => {
            this.groupList = data
          },
          (err) => {
            this.$message.error(err)
          }
        )
      })
    },
    // 添加
    handleAdd() {
      this.showAddGroup = true
    },
    // 关闭添加弹窗
    closeAddGroup(type) {
      if (type === 'refresh') {
        this.getList()
      }
      this.showAddGroup = false
    },
    // 添加模型
    handleAddModel(name) {
      this.showAddModal = true
      this.addData = {
        type: 'add',
        name: name
      }
    },
    // 关闭添加弹窗
    closeAddModal() {
      this.showAddModal = false
    },
    // 跳转详情
    handleDetail(data) {
      this.showDetailModal = true
      this.detailData = { id: data.id, name: data.name }
    },
    // 关闭详情弹窗
    closeDetailModal() {
      this.showDetailModal = false
    },
    // 显示标题编辑icon
    showModelEdit(index) {
      this.currentKeys = index
      this.showTitleEdit = true
    },
    // 关闭
    hideModelEdit() {
      this.currentKeys = ''
      this.showTitleEdit = false
    },
    // 显示标题input
    showTitleInput(index, name) {
      // 赋值标题
      this.titleForm.name = name
      // 显示表单
      this.currentInputKeys = index
      this.showInput = true
    },
    // 提交标题
    submitTitle(formName) {
      this.$message.success('操作成功')
      this.currentInputKeys = false
      this.$refs[formName][0].validate((valid) => {
        if (valid) {
          fetch.addNotice({ name: this.titleForm.name }).then((data) => {
            data.procData(
              data.res,
              () => {
                this.$message.success('操作成功')
                this.currentInputKeys = false
              },
              (err) => {
                this.$message.error(err)
              }
            )
          })
        } else {
          return false
        }
      })
    },
    cancelTitle() {
      this.titleForm.name = ''
      this.currentInputKeys = false
    },
    // 删除模型
    deleteModel(data) {
      this.$confirm('是否确定删除选中的数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          fetch.delAppeal({ id: data.id }).then((data) => {
            data.procData(
              data.res,
              () => {
                this.$message.success('操作成功')
                this.getList()
              },
              (err) => {
                this.$message.error(err)
              }
            )
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.model-main {
  .modal-title {
    font-size: 14px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    .edit-model {
      display: inline-block;
      background: #c4c8dc;
      width: 24px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      border-radius: 5px;
      font-size: 10px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .model-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #d3d6d8;
    background: #f3f6f9;
    padding: 5px 20px;
    border-radius: 10px;
    cursor: pointer;
    .model-item-img {
      margin-right: 20px;
    }
    .modal-item-right {
      flex: 1;
      .dec {
        font-size: 12px;
        color: #999999;
      }
    }
    .delete {
      visibility: hidden;
      position: absolute;
      right: -8px;
      top: -8px;
      font-size: 10px;
      padding: 3px;
      background: #ee3158;
      color: #fff;
      border-radius: 5px;
    }
    &.add {
      justify-content: center;
      border: 1px dashed #d3d6d8;
      padding: 22px 0px;
    }
    &:hover {
      border-color: #3367d6;
      // background: #3367d6;
      // color: #fff;
      .delete {
        visibility: inherit;
      }
    }
  }
}
</style>