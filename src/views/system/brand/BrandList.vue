<template>
  <el-row>
    <el-row>
      <el-button class="mb-15"
                 type="primary"
                 @click="handleAdd">新 增</el-button>
      <!-- <el-upload class="c-import-btn"
                 :show-file-list="false"
                 :headers="{ token: authId, system: 'sys', userId: userId }"
                 ref="upload"
                 :action="url"
                 accept=".xlsx,.xls"
                 :on-success="handleUploadSuccess">
        <el-button slot="trigger"
                   type="primary">导 入</el-button>
      </el-upload>
      <el-button class="mb-15"
                 type="primary"
                 @click="handleExport">导 出</el-button> -->
      <el-button class="mb-15"
                 type="primary"
                 @click="multiDelete">删 除</el-button>
    </el-row>
    <el-card shadow="none"
             class="search-card mb-15">
      <el-form :inline="true"
               ref="search_form"
               :model="searchForm"
               class="search-form">
        <el-form-item label="品牌:"
                      prop="brandName">
          <diy-input v-model="searchForm.brandName"
                     placeholder="品牌"></diy-input>
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
            <template v-if="item.prop === 'icon'">
              <el-image style="width: 40px; height: 40px"
                        :src="scope.row.iconUrl"
                        fit="fill"
                        :preview-src-list="[scope.row.iconUrl]">
              </el-image>
            </template>
            <span v-else>{{ scope.row[item.prop] }}</span>
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
    <add-brand v-if="showAddModal"
               :isShow="showAddModal"
               :data="addData"
               @handleClose="closeAddModal"></add-brand>
  </el-row>
</template>

<script>
import fetch from '@/common/apis/system'
import AddBrand from '@/views/system/brand/AddBrand'
import Pagination from '@/components/pagination/Pagination'
import DiyInput from '@/components/public/DiyInput'
import { BrandIcon } from '@/common/publicConstant'
export default {
  components: { Pagination, DiyInput, AddBrand },
  data() {
    return {
      BrandIcon: BrandIcon,
      url: fetch.importBrand,
      userId: localStorage.getItem('userIdB'),
      authId: localStorage.getItem('tokenB'),
      searchForm: {
        brandName: ''
      },
      tableTitle: [
        {
          prop: 'brandName',
          name: '品牌名称',
          width: '100'
        },
        {
          prop: 'brandEn',
          name: '产品型号',
          width: '100'
        },
        {
          prop: 'icon',
          name: '图标',
          width: '80'
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
        .getBrandList({
          page: {
            current: currentPage,
            size: perPage
          },
          ...this.searchForm
        })
        .then((data) => {
          data.procData(
            data.res,
            (data) => {
              this.tableData = data.records.map((item) => {
                item.iconUrl = BrandIcon[item.icon] ? BrandIcon[item.icon].icon : ''
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
    // 删除
    handleDelete(data) {
      this.$confirm('是否确定删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delBrand([data.id])
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
            this.delBrand(selectIds)
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
    delBrand(ids) {
      fetch.delBrand({ idList: ids }).then((data) => {
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
    },
    // 导入
    handleUploadSuccess(res) {
      if (0 === Number(res.code)) {
        this.$message.success('导入成功')
        this.getList()
      } else {
        this.$message.error(res.msg)
      }
    },
    // 导出
    handleExport() {
      fetch.exportPartyDues({ ...this.searchForm }, { responseType: 'blob' }).then((data) => {
        var blob = new Blob([data.res])
        let filename = 'party-dues.xlsx'
        var aEle = document.createElement('a')
        let url = URL.createObjectURL(blob)
        aEle.href = url
        aEle.download = filename
        aEle.click()
        window.URL.revokeObjectURL(url)
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
