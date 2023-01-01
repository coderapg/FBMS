<template>
  <el-container class="layout">
    <el-aside width="200px" class="aside">
      <layout-nav-menu />
    </el-aside>
    <el-container>
      <el-header class="header">Header</el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutNavMenu from './components/LayoutNavMenu'

export default {
  name: 'LayoutIndex',
  components: {
    LayoutNavMenu
  }
}
</script>

<style lang="less" scoped>
  .layout {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .aside {
      background-color: #d3dce6;
      height: 100%;
      .el-menu {
        height: 100%;
      }
    }
    .header {
      background-color: #b3c0d1;
    }
    .main {
      background-color: #e9eef3;
    }
  }
</style>
