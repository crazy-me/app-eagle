<template>
  <el-dialog :title="getTitle"
             :visible.sync="showModal"
             @close="handleCancel"
             :close-on-click-modal="false"
             width="50%">
    <el-row :gutter="10">
      <el-form :model="modalForm"
               :rules="rules"
               ref="modalForm"
               label-width="100px"
               class="login-form">
        <el-form-item label="品牌名称:"
                      prop="brandName">
          <diy-input v-model.trim="modalForm.brandName"
                     maxlength="100"
                     placeholder="请输入品牌名称"></diy-input>
        </el-form-item>
        <el-form-item label="英文名称:"
                      prop="brandEn">
          <diy-input v-model.trim="modalForm.brandEn"
                     maxlength="100"
                     placeholder="请输入英文名称"></diy-input>
        </el-form-item>
        <!-- <el-form-item ref="imgUpload"
                    class="news-upload-container"
                    label="图标:"
                    prop="icon">
        <el-upload class="license-uploader"
                   :action="url"
                   :headers="{ token: authId, system: 'sys', userId: userId }"
                   :show-file-list="false"
                   accept=".jpg, .jpeg, .png"
                   :on-success="uploadSuccess">
          <img v-if="modalForm.icon"
               :src="modalForm.icon"
               class="license" />
          <i v-else
             class="el-icon-plus license-uploader-icon"></i>
        </el-upload>
      </el-form-item> -->
        <el-form-item label="图标："
                      prop="icon"
                      style="height: 300px;overflow-y: auto;">
          <el-radio-group v-model="modalForm.icon">
            <el-col class="mb-10"
                    :span="6"
                    v-for="(item, index) in BrandIcon"
                    :key="index">
              <el-card shadow="hover">
                <el-radio :label="index+''">
                  <el-image style="width: 72px; height: 50px"
                            :src="item.icon"
                            fit="contain"></el-image>
                  <p class="alignCenter mt-10  mb-10">{{item.name}}</p>
                </el-radio>
              </el-card>
            </el-col>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产品型号:"
                      prop="modelList">
          <el-form-item v-for="(item, index) in modalForm.modelList"
                        :key="index"
                        class="mb-20"
                        :prop="'modelList.' + index + '.modelName'"
                        :rules="[{ required: true, message: '请输入产品型号' }]">
            <diy-input v-model.trim="item.modelName"
                       maxlength="100"
                       placeholder="请输入产品型号"
                       style="display: inline-block;width: 90%"></diy-input>
            <el-button class="ml-10"
                       type="danger"
                       plain
                       circle
                       icon="el-icon-delete"
                       size="small"
                       @click="delModel(index)"></el-button>
          </el-form-item>
          <div class="alignRight">
            <el-tooltip content="添加"
                        placement="top">
              <el-button type="primary"
                         plain
                         icon="el-icon-plus"
                         size="small"
                         @click="addModel"></el-button>
            </el-tooltip>
          </div>
        </el-form-item>
      </el-form>
    </el-row>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary"
                 @click="handleConfirm('modalForm')">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import fetch from '@/common/apis/system'
import DiyInput from '@/components/public/DiyInput'
import { BrandIcon } from '@/common/publicConstant'
import fetchOther from '@/common/apis/other'
export default {
  components: {
    DiyInput
  },
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
      BrandIcon: BrandIcon,
      showModal: this.isShow,
      url: fetchOther.uploadUrl,
      userId: localStorage.getItem('userIdB'),
      authId: localStorage.getItem('tokenB'),
      fileList: [],
      modalForm: {
        brandName: '',
        icon: '',
        brandEn: '',
        modelList: [{ modelName: '' }]
      },
      rules: {
        brandName: [{ required: true, message: '请选择品牌名称' }],
        brandEn: [{ required: true, message: '请选择品牌英文名称' }],
        modelList: [{ required: true, message: '请输入产品型号' }],
        icon: [{ required: true, message: '请上传图标' }]
      }
    }
  },
  computed: {
    getTitle() {
      return this.data.type === 'add' ? '新增品牌' : '编辑品牌'
    }
  },
  created() {
    if (this.data.type === 'edit') {
      this.getInfo()
    }
  },
  methods: {
    // 获取信息
    getInfo() {
      fetch.getBrandInfo({ id: this.data.data.id }).then((data) => {
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
    // 添加产品型号
    addModel() {
      this.modalForm.modelList.push({ modelName: '' })
    },
    // 删除产品型号
    delModel(index) {
      this.modalForm.modelList.splice(index, 1)
    },
    // 上传成功
    uploadSuccess(res) {
      if (res.code === 0) {
        this.$message.success('上传成功')
        this.$refs.imgUpload.clearValidate()
        this.modalForm.icon = res.data.filePath
      } else {
        this.$message.error('上传失败,请重新尝试')
      }
    },
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.data.type === 'add') {
            fetch.addBrand(this.modalForm).then((data) => {
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
            fetch.editBrand(this.modalForm).then((data) => {
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
        } else {
          return false
        }
      })
    },
    handleCancel(type) {
      this.$emit('handleClose', type)
    }
  }
}
</script>

<style lang="less" scoped>
.news-upload-container {
  margin-right: 10px;
  display: inline-block;
  .license-uploader {
    display: inline-block;
    width: 100px;
    .el-upload {
      .license-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .license {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
  }
}
</style>
<style lang="less">
// 覆盖上传原样式
.license-uploader {
  .el-upload {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
</style>
