<template>
  <div class="article-container">
    <!-- 筛选区域 -->
    <el-card class="screen">
      <!-- 面包屑导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- /面包屑导航 -->
      <el-form :inline="true" :model="form" size="small" class="demo-form-inline">
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="状态">
            <el-option label="区域一" value="null">全部</el-option>
            <el-option label="区域一" value="0">草稿</el-option>
            <el-option label="区域一" value="1">待审核</el-option>
            <el-option label="区域一" value="2">审核通过</el-option>
            <el-option label="区域一" value="3">审核失败</el-option>
            <el-option label="区域一" value="4">已删除</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.channel" placeholder="频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- /筛选区域 -->
    <!-- table表格 -->
    <el-card class="article-table">
      <el-table
        size="small"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="1000" />
      <!-- /分页 -->
    </el-card>
    <!-- /table表格 -->
  </div>
</template>

<script>

export default {
  name: 'ArticleIndex',
  data () {
    return {
      form: {
        status: null,
        channel: '',
        date: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handleQuery () {
      console.log('handleQuery!')
    }
  }
}
</script>

<style lang="less" scoped>
  .article-container {
    .screen {
      margin-bottom: 30px;
    }
    .article-table {
      .pagination {
        text-align: center;
        margin: 30px auto;
      }
    }
  }
</style>
