<template>
  <div>
    <el-card shadow="never">
      <el-row>
        <el-button class="mb-15"
                   type="primary"
                   plain
                   @click="handleSet('testForm')">网络设置</el-button>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-col :span="4"
                :xs="24"
                class="mb-20">
          <div class="svgbox">
            <div class="circle-bg">
              <span class="circle big"></span>
              <span class="circle small"></span>
              <div class="line hor"></div>
              <div class="line ver"></div>
              <div class="indexvalue-sector"></div>
              <div class="indexvalue"><span>98</span>%</div>
              <div class="bubble-main">
                <div class="bubble bubble-one"></div>
                <div class="bubble bubble-two"></div>
                <div class="bubble bubble-three"></div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="16"
                :xs="24"
                class="mb-20">
          <el-progress :percentage="90"
                       :stroke-width="34"
                       :text-inside="true"></el-progress>
        </el-col>
        <el-col :span="4"
                :xs="24"
                class="alignCenter mb-20">
          <el-button type="primary"
                     plain
                     @click="handleScan('testForm')">开始扫描</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-button class="mb-15"
                   type="primary"
                   plain
                   @click="multiInside('testForm')">批量入库</el-button>
        <el-button class="mb-15"
                   type="primary"
                   @click="handleSet('testForm')">导 出</el-button>
      </el-row>
      <el-card shadow="never">
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
                           width="150">
            <template slot-scope="scope">
              <el-tooltip content="入库"
                          placement="top">
                <el-button size="mini"
                           type="primary"
                           plain
                           icon="el-icon-sell"
                           @click="inside(scope.row)"></el-button>
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
    </el-card>
    <!-- 设置 -->
    <auto-config v-if="showConfigModal"
                 :isShow="showConfigModal"
                 @handleClose="closeConfigModal"></auto-config>
  </div>
</template>

<script>
import fetch from '@/common/apis/hardware'
import AutoConfig from '@/views/cmdb/auto/AutoConfig'
import Pagination from '@/components/pagination/Pagination'
export default {
  components: { Pagination, AutoConfig },
  data() {
    return {
      tableTitle: [
        {
          prop: 'customerName',
          name: 'IP',
          width: '100'
        },
        {
          prop: 'customerPhone',
          name: '状态',
          width: '100'
        },
        {
          prop: 'customerPhone',
          name: '类型',
          width: '100'
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
      // 设置
      showConfigModal: false
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
    // 设置
    handleSet() {
      this.showConfigModal = true
    },
    closeConfigModal() {
      this.showConfigModal = false
    },
    // 开始扫描
    handleScan() {},
    // 入库
    inside(data) {
      this.$confirm('是否确定入库该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.insideFun(data.id)
        })
        .catch(() => {})
    },
    // 批量入库
    multiInside() {
      this.$confirm('是否确定批量入库?', '提示', {
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
    },
    insideFun(ids) {
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
.svgbox {
  height: 150px;
  width: 150px;
  margin: 0 auto;
  overflow: hidden;
  .circle-bg {
    width: 100%;
    height: 100%;
    background: #3367d6;
    border-radius: 50%;
    position: relative;
    .circle {
      position: absolute;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      &.big {
        width: 80%;
        height: 80%;
        left: 10%;
        top: 10%;
      }
      &.small {
        width: 50%;
        height: 50%;
        left: 25%;
        top: 25%;
      }
    }
    .line {
      width: 100%;
      height: 100%;
      position: absolute;
      &.hor {
        top: -50%;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }
      &.ver {
        left: -50%;
        border-right: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
    .indexvalue-sector {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -75px;
      margin-top: -75px;
    }
    .indexvalue-sector:after {
      animation: radar-beam 5s infinite;
      animation-timing-function: linear;
      content: ' ';
      display: block;
      background-image: linear-gradient(
        45deg,
        rgba(51, 103, 214, 0.3) 50%,
        rgba(255, 255, 255, 0.3) 100%
      );
      width: 50%;
      height: 50%;
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: bottom right;
      border-radius: 100% 0 0 0;
    }
    .indexvalue {
      width: 50px;
      height: 50px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -25px;
      margin-top: -25px;
      text-align: center;
      line-height: 50px;
      font-weight: 500;
      font-family: 'Dosis';
      color: #eaeaea;
      span {
        color: #fff;
        font-size: 26px;
      }
    }
    .bubble {
      background: #fff;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      position: absolute;
      opacity: 1;
      bottom: 1em;
    }
    .bubble-one {
      animation: bubble 0.8s ease infinite;
      animation-delay: 0.2s;
      left: 2.5em;
    }
    .bubble-two {
      animation: bubble 1.5s ease infinite;
      animation-delay: 0.5s;
      left: 4.5em;
    }
    .bubble-three {
      animation: bubble 1.8s ease infinite;
      animation-delay: 0.7s;
      left: 6.5em;
    }
  }
}
@keyframes bubble {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    bottom: 9em;
  }
}
@keyframes radar-beam {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>