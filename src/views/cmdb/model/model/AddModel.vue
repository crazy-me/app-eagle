<template>
  <el-dialog :title="getTitle"
             :visible.sync="showModal"
             @close="handleCancel"
             :close-on-click-modal="false"
             append-to-body
             width="50%">
    <el-steps class="mb-20"
              :active="activeStep"
              finish-status="success"
              simple>
      <el-step title="1 基础信息"></el-step>
      <el-step title="2 新建模型"></el-step>
    </el-steps>
    <el-form v-if="activeStep === 1"
             :model="modalForm"
             :rules="rules"
             ref="modalForm"
             label-width="100px"
             label-position="top"
             class="modal-form">
      <el-form-item label="模型名称："
                    prop="name">
        <diy-input v-model.trim="modalForm.name"
                   placeholder="请输入模型名称"></diy-input>
      </el-form-item>
      <el-form-item label="选择模型图标："
                    prop="icon">
        <el-radio-group v-model="modalForm.icon">
          <el-radio :label="item.id"
                    v-for="(item, index) in iconList"
                    :key="index">
            <el-image style="width: 72px; height: 50px"
                      :src="item.icon"
                      fit="contain"></el-image>
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div v-if="activeStep === 2">
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
      <el-button v-if="activeStep === 1"
                 type="primary"
                 @click="handleNext('modalForm')">下一步</el-button>
      <el-button v-if="activeStep === 2"
                 type="primary"
                 plain
                 @click="handlePrev">上一步</el-button>
      <el-button v-if="activeStep === 2"
                 type="primary"
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
import DiyInput from '@/components/public/DiyInput'
export default {
  components: { DiyInput, AddParams },
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
      activeStep: 1,
      modalForm: {
        name: '',
        icon: ''
      },
      rules: {
        name: [{ required: true, message: '请输入模型名称' }],
        icon: [{ required: true, message: '请选择模型图标' }]
      },
      iconList: [
        { id: 1, icon: require('@/assets/img/cmdb/model/windows.png') },
        { id: 2, icon: require('@/assets/img/cmdb/model/linux.png') },
        { id: 3, icon: require('@/assets/img/cmdb/model/change.png') },
        { id: 4, icon: require('@/assets/img/cmdb/model/router.png') },
        { id: 5, icon: require('@/assets/img/cmdb/model/fire.png') },
        { id: 6, icon: require('@/assets/img/cmdb/model/server.png') },
        { id: 7, icon: require('@/assets/img/cmdb/model/mysql.png') },
        { id: 8, icon: require('@/assets/img/cmdb/model/oracle.png') },
        { id: 9, icon: require('@/assets/img/cmdb/model/dameng.png') },
        { id: 10, icon: require('@/assets/img/cmdb/model/tomcat.png') },
        { id: 11, icon: require('@/assets/img/cmdb/model/weblogic.png') },
        { id: 12, icon: require('@/assets/img/cmdb/model/nginx.png') },
        { id: 13, icon: require('@/assets/img/cmdb/model/websphere.png') },
        { id: 14, icon: require('@/assets/img/cmdb/model/kingbase.png') },
        { id: 15, icon: require('@/assets/img/cmdb/model/http.png') },
        { id: 16, icon: require('@/assets/img/cmdb/model/room.png') },
        { id: 17, icon: require('@/assets/img/cmdb/model/cabinet.png') },
        { id: 18, icon: require('@/assets/img/cmdb/model/parts.png') }
      ],
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
  computed: {
    getTitle() {
      return this.data.type === 'add'
        ? '新增' + this.data.name + '模型'
        : '编辑' + this.data.name + '模型'
    }
  },
  created() {
    if (this.data.type === 'edit') {
      this.getInfo()
    }
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
    // 下一步
    handleNext() {
      this.activeStep = 2
    },
    handlePrev() {
      this.activeStep = 1
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
