<template>
  <div>
    <el-row>
      <el-button class="mb-15"
                 type="primary"
                 @click="handleAdd">新增</el-button>
      <el-button class="mb-15"
                 type="primary"
                 @click="multiDelete">删除</el-button>
    </el-row>
    <el-card shadow="none">
      <el-table ref="settleTable"
                :data="tableData"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"
                         label="序号"></el-table-column>
        <el-table-column v-for="(item, index) in tableTitle"
                         :key="index"
                         :label="item.name"
                         :prop="item.prop"
                         :min-width="item.width"
                         :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="操作"
                         width="180">
          <template slot-scope="scope">
            <el-tooltip content="设置权限"
                        placement="top">
              <el-button size="mini"
                         type="primary"
                         plain
                         icon="el-icon-user"
                         @click="handleAuth(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="编辑"
                        placement="top">
              <el-button size="mini"
                         type="primary"
                         plain
                         icon="el-icon-edit-outline"
                         @click="handleEdit(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除"
                        placement="top">
              <el-button size="mini"
                         plain
                         type="danger"
                         icon="el-icon-delete"
                         @click="handleDelete(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="pagination.total"
                  :current="pagination.currentPage"
                  :pageSize="pagination.perPage"
                  @handleSizeChange="handleSizeChange"
                  @handleCurrent="handleCurrentChange"></Pagination>
      <add-role v-if="showAddModal"
                :isShow="showAddModal"
                :data="addData"
                @handleClose="closeAddModal"></add-role>
      <assign-auth v-if="showAuthModal"
                   :isShow="showAuthModal"
                   :data="authData"
                   @handleClose="closeAuthModal"></assign-auth>
    </el-card>
  </div>
</template>

<script>
import fetch from '@/common/apis/system'
// import utils from '@/common/utils'
import AddRole from '@/views/system/role/AddRole'
import AssignAuth from '@/views/system/role/AssignAuth'
import Pagination from '@/components/pagination/Pagination'
export default {
  components: { AddRole, AssignAuth, Pagination },
  data() {
    return {
      tableTitle: [
        {
          prop: 'roleName',
          name: '角色名称',
          width: '100'
        },
        {
          prop: 'createTime',
          name: '创建时间',
          width: '120'
        },
        {
          prop: 'remark',
          name: '备注',
          width: '120'
        }
      ],
      tableData: [{}],
      // 分页相关
      pagination: {
        total: 0,
        currentPage: 1,
        perPage: 10
      },
      // 选中数据
      multipleSelection: [],
      // 添加
      showAddModal: false,
      addData: {},
      // 权限
      showAuthModal: false,
      authData: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      const { perPage, currentPage } = this.pagination
      fetch
        .getRolePageList({
          code: 'sys',
          page: { size: perPage, current: currentPage },
          ...this.searchForm
        })
        .then((data) => {
          data.procData(
            data.res,
            (data) => {
              this.tableData = data.records
              this.pagination.total = Number(data.total)
            },
            (err) => {
              this.$message.error(err)
            }
          )
        })
    },
    // 分页
    handleSizeChange(val) {
      this.pagination.perPage = val
      this.pagination.currentPage = 1
      this.getList()
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.getList()
    },
    // 选择变化
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 添加
    handleAdd() {
      this.showAddModal = true
      this.addData = {
        type: 'add'
      }
    },
    // 编辑
    handleEdit(data) {
      this.showAddModal = true
      this.addData = {
        type: 'edit',
        data: data
      }
    },
    // 分配权限
    handleAuth(data) {
      this.showAuthModal = true
      this.authData = {
        id: data.id,
        name: data.roleName
      }
    },
    // 删除
    handleDelete(data) {
      this.$confirm('是否确定删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteRole([data.id])
        })
        .catch(() => {})
    },
    // 批量删除
    multiDelete() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('是否确定删除选中的数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let selectIds = this.multipleSelection.map((item) => {
              return item.id
            })
            this.deleteRole(selectIds)
          })
          .catch(() => {})
      } else {
        this.$message.warning('请至少选择一条数据')
      }
    },
    // 关闭添加弹窗
    closeAddModal(type) {
      if (type === 'refresh') {
        this.getList()
      }
      this.showAddModal = false
    },
    // 关闭权限弹窗
    closeAuthModal() {
      this.showAuthModal = false
    },
    // 删除
    deleteRole(ids) {
      fetch.deleteRole({ code: 'sys', idList: ids }).then((data) => {
        data.procData(
          data.res,
          () => {
            this.getList()
            this.$message.success('操作成功')
          },
          (err) => {
            this.$message.error(err)
          }
        )
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
