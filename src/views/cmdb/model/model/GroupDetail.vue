<template>
  <el-dialog :title="data.name+'详情'"
             :visible.sync="showModal"
             @close="handleCancel"
             :close-on-click-modal="false"
             append-to-body
             width="70%">
    <div>
      <el-tooltip class="item"
                  effect="dark"
                  content="添加"
                  placement="top">
        <el-button class="mb-15"
                   type="primary"
                   icon="el-icon-plus"
                   size="small"
                   plain
                   @click="handleAdd"></el-button>
      </el-tooltip>
      <el-card shadow="never">
        <el-table :data="tableData"
                  tooltip-effect="dark">
          <el-table-column type="index"
                           label="#"
                           width="55">
          </el-table-column>
          <el-table-column v-for="(item, index) in tableTitle"
                           :key="index"
                           :label="item.name"
                           :prop="item.prop"
                           :min-width="item.width"
                           :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="操作"
                           width="120">
            <template slot-scope="scope">
              <el-button type="primary"
                         icon="el-icon-edit-outline"
                         size="mini"
                         plain
                         @click="handleEdit(scope.row)"></el-button>
              <el-button type="danger"
                         icon="el-icon-delete"
                         plain
                         size="mini"
                         @click="deleteParams(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary"
                 @click="handleConfirm">
        确 定
      </el-button>
    </span>
    <!-- 添加模型 -->
    <add-params v-if="showAddModal"
                :isShow="showAddModal"
                :data="addData"
                @handleClose="closeAddModal"></add-params>
  </el-dialog>
</template>

<script>
import fetch from '@/common/apis/system'
import AddParams from '@/views/cmdb/model/model/AddParams'
export default {
  components: { AddParams },
  props: {
    isShow: {
      type: Boolean
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      showModal: this.isShow,
      tableTitle: [
        {
          prop: 'createUserName',
          name: '属性名称',
          width: '100'
        },
        {
          prop: 'createUserPhone',
          name: '控件类型',
          width: '100'
        },
        {
          prop: 'createUserCompanyName',
          name: '必填项',
          width: '100'
        },
        {
          prop: 'createUserDeptName',
          name: '编辑显示',
          width: '100'
        },
        {
          prop: 'id',
          name: '列表显示',
          width: '100'
        },
        {
          prop: 'payState',
          name: '主键',
          width: '80'
        }
      ],
      tableData: [{}],
      // 添加
      showAddModal: false,
      addData: {}
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    // 获取编辑信息
    getInfo() {
      fetch.getUserTypeInfo({ id: this.data.id }).then((data) => {
        data.procData(
          data.res,
          (data) => {
            this.modalForm = data
          },
          (err) => {
            this.$message.error(err)
          }
        )
      })
    },
    handleAdd() {
      this.showAddModal = true
      this.addData = {
        type: 'add'
      }
    },
    // 关闭添加弹窗
    closeAddModal() {
      this.showAddModal = false
    },
    handleEdit() {
      this.showAddModal = true
      this.addData = {
        type: 'edit'
      }
    },
    deleteParams(data) {
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
    },
    handleConfirm() {
      if (this.data.type === 'add') {
        fetch.addUserType({ ...this.modalForm }).then((data) => {
          data.procData(
            data.res,
            () => {
              this.$message.success('操作成功')
              this.handleCancel('refresh')
            },
            (err) => {
              this.$message.error(err)
            }
          )
        })
      } else {
        fetch.editUserType({ ...this.modalForm }).then((data) => {
          data.procData(
            data.res,
            () => {
              this.$message.success('操作成功')
              this.handleCancel('refresh')
            },
            (err) => {
              this.$message.error(err)
            }
          )
        })
      }
    },
    handleCancel(type) {
      this.$emit('handleClose', type)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
