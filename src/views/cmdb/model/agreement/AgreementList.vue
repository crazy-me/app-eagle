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
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="120">
          <template slot-scope="scope">
            <el-tooltip content="入库"
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
    <!-- 添加 -->
    <add-agreement v-if="showAddModal"
                   :isShow="showAddModal"
                   :data="addData"
                   @handleClose="closeAddModal"></add-agreement>
  </el-row>
</template>

<script>
import fetch from '@/common/apis/hardware'
import AddAgreement from '@/views/cmdb/model/agreement/AddAgreement'
import Pagination from '@/components/pagination/Pagination'
export default {
  components: { Pagination, AddAgreement },
  data() {
    return {
      tableTitle: [
        {
          prop: 'customerName',
          name: '采集协议名称',
          width: '100'
        },
        {
          prop: 'customerPhone',
          name: '协议类型',
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
      addData: {}
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      const { perPage, currentPage } = this.pagination
      fetch
        .getPartyDuesList({
          current: currentPage,
          size: perPage,
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
            this.delAgreement({ ids: selectIds })
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
        type: 'add',
        typeList: this.typeList
      }
    },
    // 编辑
    handleEdit(data) {
      this.showAddModal = true
      this.addData = {
        type: 'edit',
        id: data.id
      }
    },
    closeAddModal(type) {
      if (type === 'refresh') {
        this.getList()
      }
      this.showAddModal = false
    },
    // 删除
    handleDelete(data) {
      this.$confirm('是否确定删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delAgreement(data.id)
        })
        .catch(() => {})
    },
    // 删除
    delAgreement(ids) {
      fetch.delAgreement({ ids: ids }).then((data) => {
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
