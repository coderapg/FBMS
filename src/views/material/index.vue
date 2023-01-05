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
      <!-- /面包屑导航 -->
      <!-- 图片列表 -->
      <image-list />
      <!-- /图片列表 -->
    </el-card>
  </div>
</template>

<script>
import ImageList from 'components/ImageList/'

export default {
  name: 'MaterialIndex',
  components: {
    ImageList
  }
}
</script>
