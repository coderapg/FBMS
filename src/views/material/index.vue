<template>
  <el-card class="box-card">
  <!-- 面包屑导航 -->
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="material-collect">
      <el-radio-group v-model="radio" size="medium">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button size="medium" type="primary" icon="el-icon-upload">上传</el-button>
    </div>
    <el-row :gutter="10">
      <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
        <el-image
          style="height: 100px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="cover" />
      </el-col>
    </el-row>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000" />
    </div>
  </el-card>
</template>

<script>

export default {
  name: 'MaterialIndex',
  data () {
    return {
      radio: false
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
</style>
