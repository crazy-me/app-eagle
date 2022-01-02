<template>
  <el-row>
    <el-row>
      <el-button class="mb-15"
                 type="primary"
                 @click="addType">新增</el-button>
    </el-row>
    <el-card shadow="never">
      <el-table :data="tableData">
        <el-table-column type="index"
                         label="序号"
                         width="80"></el-table-column>
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
            <el-tooltip content="编辑"
                        placement="top">
              <el-button size="mini"
                         type="primary"
                         plain
                         icon="el-icon-edit-outline"
                         @click="editType(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除"
                        placement="top">
              <el-button size="mini"
                         plain
                         type="danger"
                         icon="el-icon-delete"
                         @click="removeType(scope.row)"></el-button>
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
    <add-type v-if="showTypeModal"
              :isShow="showTypeModal"
              :data="typeData"
              @handleClose="closeTypeModal"></add-type>
  </el-row>
</template>
<script>
import fetch from '@/common/apis/cmdb'
import AddType from '@/views/cmdb/type/AddType'
import Pagination from '@/components/pagination/Pagination'
export default {
  components: { Pagination, AddType },
  data() {
    return {
      tableTitle: [
        {
          prop: 'name',
          name: '字典名称',
          width: '100'
        },
        {
          prop: 'createTime',
          name: '创建时间',
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
      // 添加字典类型相关
      showTypeModal: false,
      typeData: {
        type: 'add'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const { currentPage, perPage } = this.pagination
      fetch
        .getTypeList({
          page: {
            current: currentPage,
            size: perPage
          }
        })
        .then((data) => {
          data.procData(
            data.res,
            (data) => {
              this.pagination.total = Number(data.total)
              this.tableData = data.records
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
    // 添加字典类型
    addType() {
      this.showTypeModal = true
      this.typeData = {
        type: 'add'
      }
    },
    // 编辑字典类型
    editType(data) {
      this.showTypeModal = true
      this.typeData = {
        type: 'edit',
        id: data.id
      }
    },
    // 关闭添加字典类型弹窗
    closeTypeModal(params) {
      if (params === 'refresh') {
        this.getList()
      }
      this.showTypeModal = false
    },
    // 删除字典类型
    removeType(data) {
      this.$confirm('是否确定删除该数据类型?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          fetch.delType({ id: data.id }).then((data) => {
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
    }
  }
}
</script>
<style lang="less">
.type-tree.el-tree {
  .el-tree-node__content {
    height: 40px;
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
