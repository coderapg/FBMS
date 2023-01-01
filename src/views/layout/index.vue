<template>
  <el-container class="layout">
    <el-aside width="200px" class="aside">Aside</el-aside>
    <el-container>
      <el-header class="header">Header</el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'LayoutIndex'
}
</script>

<style lang="less" scoped>
  .layout {
    .aside {
      background-color: #d3dce6;
    }
    .header {
      background-color: #b3c0d1;
    }
    .main {
      background-color: #e9eef3;
    }
  }
</style>
