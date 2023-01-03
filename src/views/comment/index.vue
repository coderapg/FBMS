<template>
  <el-card class="box-card">
    <!-- 面包屑导航 -->
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- /面包屑导航 -->
    <!-- 表格 -->
    <el-table
      :data="articles"
      border
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      style="width: 100%">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="total_comment_count" label="总评论数" />
      <el-table-column prop="fans_comment_count" label="粉丝评论数" />
      <el-table-column label="状态">
        <template slot-scope="scope">{{ scope.row.comment_status ? '开启' : '关闭' }}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            active-text="开启"
            inactive-text="关闭"
            active-color="#13ce66"
            inactive-color="#ff4949" />
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400" />
    <!-- /分页 -->
  </el-card>
</template>

<script>
import { getArticles } from 'https/article'

export default {
  name: 'CommentIndex',
  data () {
    return {
      currentPage4: 4,
      articles: [] // 评论数据
    }
  },
  created () {
    this.loadArticles(1)
  },
  methods: {
    // 加载数据列表
    loadArticles (page = 1) {
      getArticles({
        response_type: 'comment'
      }).then(res => {
        console.log('加载', res)
        const { data: { data: { results } }, status } = res
        if (status === 200) {
          this.articles = results
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less" scoped></style>
