<template>
  <el-row>
    <el-row>
      <el-button class="mb-15"
                 type="primary"
                 @click="handleAdd">新增</el-button>
      <el-upload class="c-import-btn"
                 :show-file-list="false"
                 :headers="{ token: authId, system: 'sys', userId: userId }"
                 ref="upload"
                 :action="url"
                 accept=".xlsx,.xls"
                 :on-success="handleUploadSuccess">
        <el-button slot="trigger"
                   type="primary">导入</el-button>
      </el-upload>
      <el-button class="mb-15"
                 type="primary"
                 @click="handleExport">导出</el-button>
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
        <el-form-item label="IP:"
                      prop="userName">
          <diy-input v-model="searchForm.userName"
                     placeholder="IP"></diy-input>
        </el-form-item>
        <el-form-item label="资产状态:"
                      prop="ipassCategory">
          <el-select v-model="searchForm.ipassCategory"
                     placeholder="资产状态">
            <el-option label="全部"
                       value=""></el-option>
            <el-option v-for="item in typeList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型:"
                      prop="orgName">
          <el-select v-model="searchForm.orgName"
                     placeholder="设备类型">
            <el-option v-for="item in orgList"
                       :key="item.id"
                       :label="item.roleName"
                       :value="item.roleName">
            </el-option>
          </el-select>
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
        </el-table-column>
      </el-table>
      <Pagination :total="pagination.total"
                  :current="pagination.currentPage"
                  :pageSize="pagination.perPage"
                  @handleSizeChange="handleSizeChange"
                  @handleCurrent="handleCurrentChange"></Pagination>
    </el-card>
  </el-row>
</template>

<script>
import fetch from '@/common/apis/hardware'
import utils from '@/common/utils'
import Pagination from '@/components/pagination/Pagination'
import DiyInput from '@/components/public/DiyInput'
export default {
  components: { Pagination, DiyInput },
  data() {
    return {
      url: fetch.importContent,
      userId: localStorage.getItem('userIdB'),
      authId: localStorage.getItem('tokenB'),
      utils: utils,
      unitList: [],
      orgList: [],
      departmentList: [],
      typeList: [],
      searchForm: {
        ipassCategory: '',
        orgName: '',
        userName: ''
      },
      tableTitle: [
        {
          prop: 'customerName',
          name: '姓名',
          width: '100'
        },
        {
          prop: 'customerPhone',
          name: '电话',
          width: '120'
        },
        {
          prop: 'customerImageurl',
          name: '用户头像',
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
      multipleSelection: []
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
            fetch.delAppeal({ ids: selectIds.join(',') }).then((data) => {
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
        data: data,
        typeList: this.typeList
      }
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
