<template>
  <el-card class="box-card">
    <!-- 面包屑导航 -->
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- /面包屑导航 -->
    <fans-apache />
    <fans-clock />
    <fans-round />
  </el-card>
</template>

<script>
import FansApache from './components/FansApache'
import FansClock from './components/FansClock'
import FansRound from './components/FansRound'

export default {
  name: 'FansIndex',
  components: {
    FansApache,
    FansClock,
    FansRound
  }
}
</script>

<style lang="less" scoped>
  .fans-children {
    width: 100%;
    height: 600px;
  }
</style>
