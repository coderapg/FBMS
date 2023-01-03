<template>
  <div class="material-container">
    <el-card class="box-card">
    <!-- 面包屑导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="material-collect">
        <el-radio-group v-model="collect" size="medium" @input="handleRadioChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button size="medium" type="primary" icon="el-icon-upload" @click="handleDialog">上传</el-button>
      </div>
      <el-row :gutter="10">
        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4" v-for="item in materialList" :key="item.id">
          <el-image
            style="width: 200px; height: 200px; margin-bottom: 20px;"
            :src="item.url"
            fit="cover" />
        </el-col>
      </el-row>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="totalCount"
          :current-page.sync="page"
          @current-change="handleCurrentChange" />
      </div>
    </el-card>
    <!-- 对话提示框 -->
    <el-dialog
      class="dialog-wrap"
      title="上传素材"
      width="400px"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      <el-upload
        drag
        action="#"
        :show-file-lis="false"
        :file-list="fileList"
        :http-request="handleAddImage">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-dialog>
    <!-- /对话提示框 -->
  </div>
</template>

<script>
import { getMaterialList } from 'https/material'
import { uploadRichImage } from 'https/images'

export default {
  name: 'MaterialIndex',
  data () {
    return {
      collect: false,
      materialList: [],
      dialogVisible: false,
      fileList: [], // 图片上传的数组
      totalCount: 0, // 总条数
      pageSize: 10, // 每页请求条数
      page: 1 // 当前高亮的代码页
    }
  },
  created () {
    // 默认加载全部
    this.loadMaterialData()
  },
  methods: {
    // 加载数据列表
    loadMaterialData (page = 1) {
      // 重置高亮页码，防止数据和页码不对应
      this.page = page
      getMaterialList({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        const { data: { data: { results, total_count: totalCount } }, status } = res
        if (status === 200) {
          this.totalCount = totalCount
          this.materialList = results
        }
      })
    },
    // 切换全部 / 收藏
    handleRadioChange () {
      this.loadMaterialData(1)
    },
    // 显示对话框
    handleDialog () {
      this.dialogVisible = true
    },
    // 自定义上传素材
    handleAddImage (file) {
      const fd = new FormData()
      fd.append('image', file.file)
      return uploadRichImage(fd).then(res => {
        const { data: { data: { url } }, status } = res
        if (status === 201) {
          this.dialogVisible = false
          this.fileList = []
          this.$message({
            message: '图片上传成功',
            center: true,
            type: 'success'
          })
          // 图片上传成功后，重新刷新列表数据
          this.loadMaterialData(1)
          return url
        }
      })
    },
    // 分页
    handleCurrentChange (page) {
      this.loadMaterialData(page)
    }
  }
}
</script>

<style lang="less" scoped>
  .material-collect {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .pagination {
    margin-top: 20px;
    width: 100%;
    text-align: center;
  }
  .dialog-wrap {
    /deep/ .el-dialog__body {
      .el-upload-list {
        display: none;
      }
    }
  }
</style>
