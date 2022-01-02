<template>
  <el-row>
    <el-row>
      <el-button class="mb-15"
                 type="primary"
                 @click="handleAdd">新增</el-button>
      <el-button class="mb-15"
                 type="primary"
                 @click="multiDelete">删除</el-button>
    </el-row>
    <el-card shadow="none"
             class="search-card mb-15">
      <el-form :inline="true"
               ref="search_form"
               :model="searchForm"
               class="search-form">
        <el-form-item label="用户名:"
                      prop="username">
          <diy-input v-model="searchForm.username"
                     placeholder="用户名"></diy-input>
        </el-form-item>
        <el-form-item label="手机号:"
                      prop="mobile">
          <diy-input v-model="searchForm.mobile"
                     placeholder="手机号"></diy-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     icon="el-icon-search"
                     @click="handleSearch('search_form')">查询</el-button>
          <el-button icon="el-icon-refresh"
                     @click="handleReset('search_form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="pa-0"
             shadow="none">
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
          <template slot-scope="scope">
            <template v-if="item.prop === 'picUrl'">
              <el-image style="width: 40px; height: 40px"
                        :src="scope.row.picUrl"
                        fit="fill"
                        :preview-src-list="[scope.row[item.prop]]">
              </el-image>
            </template>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态"
                         width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.disableFlag === 0"
                  class="tablestate green"
                  @click="changeStatus(scope.row)"><i class="icon iconfont icon-a-115 mr-5"></i>正常</span>
            <span v-else
                  class="tablestate red"
                  @click="changeStatus(scope.row)"><i class="icon iconfont icon-a-116 mr-5"></i>停用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="120">
          <template slot-scope="scope">
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
    </el-card>
    <add-user v-if="showAddModal"
              :isShow="showAddModal"
              :data="addData"
              @handleClose="closeAddModal"></add-user>
  </el-row>
</template>

<script>
import fetch from '@/common/apis/system'
import AddUser from '@/views/system/user/AddUser'
import Pagination from '@/components/pagination/Pagination'
import DiyInput from '@/components/public/DiyInput'
export default {
  components: { Pagination, DiyInput, AddUser },
  data() {
    return {
      searchForm: {
        mobile: '',
        username: ''
      },
      tableTitle: [
        // {
        //   prop: 'picUrl',
        //   name: '头像',
        //   width: '80'
        // },
        {
          prop: 'username',
          name: '用户名',
          width: '100'
        },
        {
          prop: 'nickname',
          name: '姓名',
          width: '100'
        },
        {
          prop: 'role',
          name: '角色',
          width: '100'
        },
        {
          prop: 'mobile',
          name: '手机号',
          width: '120'
        },
        {
          prop: 'email',
          name: '邮箱',
          width: '100'
        },
        {
          prop: 'weChatId',
          name: '微信号',
          width: '100'
        }
      ],
      tableData: [],
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
      addData: {}
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
        .getUserList({
          page: { current: currentPage, size: perPage },
          ...this.searchForm
        })
        .then((data) => {
          data.procData(
            data.res,
            (data) => {
              this.tableData = data.records.map((item) => {
                item.weChatId = item.meta ? item.meta.weChatId : ''
                item.role = item.roleName && item.roleName.length ? item.roleName.join(',') : ''
                return item
              })
              this.pagination.total = Number(data.total)
            },
            (err) => {
              this.$message.error(err)
            }
          )
        })
    },
    // 搜索提交
    handleSearch() {
      this.pagination.perPage = 10
      this.pagination.currentPage = 1
      this.getList()
    },
    // 重置
    handleReset(formName) {
      this.pagination.perPage = 10
      this.pagination.currentPage = 1
      this.$refs[formName].resetFields()
      this.getList()
    },
    // 选择变化
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    changeStatus(data) {
      this.$confirm(`是否确定${data.disableFlag === 0 ? '停用' : '启用'}该数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          fetch.changeSatus({ id: data.id, disableFlag: data.disableFlag === 0 }).then((data) => {
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
        })
        .catch(() => {})
    },
    // 删除
    handleDelete(data) {
      this.$confirm('是否确定删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deluser([data.id])
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
            this.deluser(selectIds)
          })
          .catch(() => {})
      } else {
        this.$message.warning('请至少选择一条数据')
      }
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
    // 关闭添加弹窗
    closeAddModal(type) {
      if (type === 'refresh') {
        this.getList()
      }
      this.showAddModal = false
    },
    // 删除
    deluser(ids) {
      fetch.deleteUser({ idList: ids }).then((data) => {
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
