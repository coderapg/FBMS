<template>
  <div class="image-list">
    <div class="material-collect">
      <el-radio-group v-model="collect" size="medium" @input="handleRadioChange">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button size="medium" type="primary" icon="el-icon-upload" @click="handleDialog" v-if="updateBtnShow">上传</el-button>
    </div>
    <el-row :gutter="10">
      <el-col class="item-image" :xs="12" :sm="8" :md="8" :lg="6" :xl="4" v-for="(item, index) in materialList" :key="item.id" @click.native="handleColItemClick(index)">
        <el-image
          :src="item.url"
          fit="cover" />
        <div class="bg-img" v-show="isShowBg && activeIndex === index"></div>
        <template v-if="iconShow">
          <div class="item-wrap" v-show="!collect">
            <el-button :class="{ 'icon-cur': item.is_collected }" icon="el-icon-star-off" circle size="mini" :loading="item.isLoading" @click="handleItemCollect(item)" />
            <el-button type="danger" icon="el-icon-delete" circle size="mini" :loading="item.isLoading" @click="handleItemDelete(item)" />
          </div>
        </template>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="totalCount"
      :current-page.sync="page"
      @current-change="handleCurrentChange" />
    <!-- /分页 -->
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
import { getMaterialList, toggleItemCollect, deleteItemImage } from 'https/material'
import { uploadRichImage } from 'https/images'

export default {
  name: 'ImageList',
  data () {
    return {
      collect: false,
      materialList: [],
      dialogVisible: false,
      fileList: [], // 图片上传的数组
      totalCount: 0, // 总条数
      pageSize: 10, // 每页请求条数
      page: 1, // 当前高亮的代码页
      activeIndex: null // 被点击时的子项
    }
  },
  props: {
    updateBtnShow: {
      type: Boolean,
      default: true
    },
    iconShow: {
      type: Boolean,
      default: true
    },
    isShowBg: {
      type: Boolean,
      default: false
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
          results.map(item => {
            item.isLoading = false
          })
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
          this.loadMaterialData(this.page)
          return url
        }
      })
    },
    // 分页
    handleCurrentChange (page) {
      this.loadMaterialData(page)
    },
    // 收藏 / 取消收藏
    handleItemCollect (item) {
      item.isLoading = true
      item.is_collected = !item.is_collected
      toggleItemCollect(item.id, item.is_collected).then(res => {
        const { status } = res
        if (status === 201) {
          item.isLoading = false
          this.$message({
            message: item.is_collected ? '收藏成功' : '取消成功',
            type: 'success',
            center: true
          })
        } else {
          this.$message({
            message: '操作失败',
            type: 'error',
            center: true
          })
        }
      })
    },
    // 删除
    handleItemDelete (item) {
      item.isLoading = true
      const { id } = item
      deleteItemImage(id).then(res => {
        const { status } = res
        if (status === 204) {
          item.isLoading = false
          this.$message({
            message: '删除成功',
            type: 'success',
            center: true
          })
          this.loadMaterialData(this.page)
        }
      })
    },
    // 被点击的子项
    handleColItemClick (index) {
      this.activeIndex = index
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
  .item-image {
    position: relative;
    .el-image {
      width: 200px;
      height: 200px;
      margin-bottom: 20px;
    }
    .bg-img {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: url('./selected.png') no-repeat center center;
      background-size: 40%;
      z-index: 9;
    }
    .item-wrap {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      position: absolute;
      left: 5px;
      right: 67px;
      bottom: 24px;
      height: 40px;
      background: rgba(0, 0, 0, 0.5);
      button {
        background: transparent;
        border: none;
        color: #fff;
        /deep/ i {
          font-size: 20px;
        }
      }
      .icon-cur {
        color: #ff6700;
      }
    }
  }
  .dialog-wrap {
    /deep/ .el-dialog__body {
      .el-upload-list {
        display: none;
      }
    }
  }
</style>
