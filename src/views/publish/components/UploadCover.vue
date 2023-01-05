<template>
  <div class="upload-cover" @click="handleCoverSelect">
    <div class="cover-wrap">
      <!-- <img
        class="cover-image"
        ref="coverImage"
        :src="currentCover" /> -->
      <img
        class="cover-image"
        ref="coverImage"
        :src="value" />
      <el-dialog
        append-to-body
        width="80%"
        :visible.sync="dialogVisible">
        <el-tabs type="card" v-model="activeName">
          <el-tab-pane label="素材库" name="first">
            <image-list ref="imageList" :update-btn-show="false" :icon-show="false" is-show-bg />
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="second">
            <input ref="file" type="file" name="" id="" @change="handleFileChange">
            <img :src="previewImg" alt="">
          </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleUploadImage">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { uploadRichImage } from 'https/images'

import ImageList from 'components/ImageList/'

export default {
  name: 'UploadCover',
  data () {
    return {
      dialogVisible: false,
      activeName: 'first',
      previewImg: '' // 预览图片地址
    }
  },
  components: {
    ImageList
  },
  props: {
    // currentCover: {
    //   type: String,
    //   default: ''
    // }
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleCoverSelect () {
      this.dialogVisible = true
    },
    // 图片预览
    handleFileChange () {
      // 1、获取文件对象
      const file = this.$refs.file.files[0]
      // 2、预览
      const blob = window.URL.createObjectURL(file)
      this.previewImg = blob
    },
    // 上传图片
    handleUploadImage () {
      // 如果tab是上传图片，并且this.$refs.file.files[0]有值说明已经选择了图片了，才允许进行图片上传操作
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        // 没有图片
        if (!file) {
          this.$message({
            message: '请选择图片',
            type: 'error'
          })
          return
        }
        // 有图片，允许上传
        const fd = new FormData()
        fd.append('image', file)
        uploadRichImage(fd).then(res => {
          const { data: { data: { url } }, status } = res
          if (status === 201) {
            this.$refs.coverImage.src = url
            this.dialogVisible = false
            // 通知父组件接受返回的图片路径参数
            this.$emit('handleEmitUrl', url)
          }
        })
      } else if (this.activeName === 'first') {
        const imgRef = this.$refs.imageList
        const activeIndex = imgRef.activeIndex
        if (activeIndex === null) {
          this.$message({
            type: 'error',
            message: '请选择封面'
          })
          return
        }
        const materialList = imgRef.materialList
        const materialListImgUrl = materialList[activeIndex].url
        this.dialogVisible = false
        this.$emit('input', materialListImgUrl)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .cover-wrap {
    width: 150px;
    height: 120px;
    border: 1px solid #000;
    .cover-image {
      max-width: 100%;
      height: 120px;
    }
  }
</style>
