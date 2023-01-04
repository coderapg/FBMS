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
            :active-value="true"
            :inactive-value="false"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleSwitchChange(scope.$index, scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount" />
    <!-- /分页 -->
  </el-card>
</template>

<script>
import { getArticles } from 'https/article'
import { switchComment } from 'https/comment'

export default {
  name: 'CommentIndex',
  data () {
    return {
      articles: [], // 评论数据
      totalCount: 0, // 总条数
      pageSize: 10, // 默认每页加载条数
      page: 1
    }
  },
  created () {
    this.loadArticles(1)
  },
  methods: {
    // 加载数据列表
    loadArticles (page = 1) {
      this.page = page
      getArticles({
        page,
        per_page: this.pageSize,
        response_type: 'comment'
      }).then(res => {
        const { data: { data: { results, total_count: totalCount } }, status } = res
        if (status === 200) {
          this.totalCount = totalCount
          this.articles = results
        }
      })
    },
    // 每页请求条数改变时
    handleSizeChange () {
      this.loadArticles(1)
    },
    // 页码改变时
    handleCurrentChange (val) {
      this.loadArticles(val)
    },
    // 切换滑块
    handleSwitchChange (index, row) {
      // const { id } = row
      const flag = row.comment_status
      const title = flag ? '亲，您是否要打开当前文章评论功能。' : '亲，您是否要关闭当前文章评论功能，如果关闭读者将无法对这篇文章进行评论。'
      row.comment_status = !row.comment_status // 保持switch点击前的状态
      this.$confirm(title, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        flag ? row.comment_status = true : row.comment_status = false // 这一步很重要，row.showState会根据flag的值开启或关闭开关
        this.toggleSwitch(row)
      }).catch(() => {
        this.$message({ type: 'info', showClose: true, message: '已取消修改！', center: true })
      })
    },
    // switch切换成功时-发送请求
    toggleSwitch (row) {
      const { comment_status: commentStatus, id } = row
      switchComment(id.toString(), commentStatus).then(res => {
        const { status } = res
        if (status === 201) {
          const title = commentStatus ? '打开评论成功' : '关闭评论成功'
          this.$message({ type: 'success', message: title, center: true })
        }
      })
    }
  }
}
</script>
