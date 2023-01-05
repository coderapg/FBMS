<template>
  <div class="publish-cover" @click="handlePublishCoverClick">
    <div class="image-cover">
      <i class="el-icon-plus"></i>
      <i class="el-icon-picture-outline"></i>
    </div>
    <el-dialog
      class="dialog-wrap"
      :visible.sync="dialogVisible"
      append-to-body
      :before-close="handleClose">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <publish-library />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">上传图片</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PublishLibrary from './PublishLibrary'

export default {
  name: 'PublishCover',
  data () {
    return {
      dialogVisible: false,
      activeName: 'first'
    }
  },
  components: {
    PublishLibrary
  },
  methods: {
    handlePublishCoverClick () {
      this.dialogVisible = true
    },
    handleClose (done) {
      console.log('done===', done)
    }
  }
}
</script>

<style lang="less" scoped>
  .publish-cover {
    width: 180px;
    height: 160px;
    border: 1px dashed #d9d9d9;
    margin: 0 10px;
    border-radius: 10px;
    .image-cover {
      position: relative;
      width: 100%;
      height: 100%;
      i {
        color: #dfdfdf;
      }
      .el-icon-picture-outline {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 40px;
      }
      .el-icon-plus {
        position: absolute;
        left: 53%;
        top: 29%;
        z-index: 99;
        font-size: 40px;
        font-size: 20px;
        border: 1px solid #fff;
        border-radius: 50%;
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .dialog-wrap {
    /deep/ .el-dialog {
      width: 840px;
    }
  }
</style>
