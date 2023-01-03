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
          <el-select clearable v-model="form.status" placeholder="状态">
            <el-option label="全部" :value="null" />
            <el-option v-for="item in articleStatus" :key="item.status" :label="item.text" :value="item.status" />
          </el-select>
        </el-form-item>
        <el-form-item label="频道">
          <el-select clearable v-model="form.channel" placeholder="频道">
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期" class="picker-time">
          <el-date-picker
            v-model="form.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="setDisabled" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="isLoading" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- /筛选区域 -->
    <!-- table表格 -->
    <el-card class="article-table">
      <div slot="header" class="clearfix">根据筛选条件共查询到{{ totalCount }}条结果:</div>
      <el-table
        style="width: 100%"
        border
        size="small"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        v-loading="isLoading"
        :data="articleData">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image
              class="item-image"
              style="width: 100px;"
              :src="scope.row.cover.images[0]"
              fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" />
        <el-table-column label="状态">
          <!-- <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag type="success" v-else-if="scope.row.status === 2">审核通过</el-tag>
            <el-tag type="warning" v-else-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status === 4">已删除</el-tag>
          </template> -->
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" />
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row.id)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleItemClick(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :disabled="isLoading"
        :page-size="pageSize"
        :total="totalCount"
        :current-page.sync="page"
        @current-change="handleCurrentChange" />
      <!-- /分页 -->
    </el-card>
    <!-- /table表格 -->
  </div>
</template>

<script>
import { getArticles, getChannels, delectArticle } from 'https/article'
import { articleStatus } from 'utils/constant'

export default {
  name: 'ArticleIndex',
  data () {
    return {
      articleStatus,
      form: {
        status: null,
        channel: null,
        date: null
      },
      setDisabled: {
        disabledDate (time) {
          return time.getTime() > Date.now() // 可选历史天、可选当前天、不可选未来天
        }
      },
      articleData: [],
      page: 1, // 当前页码
      pageSize: 20, // 每页请求条数
      totalCount: 0, // 总条数
      isLoading: false, // 每次请求时loading状态
      channels: [] // 全部频道列表数据
    }
  },
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  methods: {
    // 获取当前用户文章列表
    loadArticles (page = 1) {
      const { channel, date, status } = this.form
      this.isLoading = true
      getArticles({
        begin_pubdate: date ? date[0] : null, // 开始日期筛选
        end_pubdate: date ? date[1] : null, // 结束日期筛选
        channel_id: channel,
        page,
        per_page: this.pageSize,
        status
      }).then(res => {
        const { data: { data: { results, total_count: totalCount } }, status } = res
        if (status === 200) {
          this.articleData = results
          this.totalCount = totalCount
          this.isLoading = false
        }
      })
    },
    // 获取全部频道列表
    loadChannels () {
      getChannels().then(res => {
        const { data: { data: { channels } }, status } = res
        if (status === 200) {
          this.channels = channels
        }
      })
    },
    // 分页
    handleCurrentChange (page) {
      this.loadArticles(page)
    },
    // 查询
    handleQuery () {
      this.loadArticles(1)
    },
    // 编辑文章
    handleEdit (event) {
      this.$router.push('/publish?articleId=' + event.toString())
    },
    // 删除文章
    handleItemClick (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delectArticle(id.toString()).then(res => {
          const { status } = res
          if (status === 204) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 删除成功，更新当前页的文章数据列表
            this.loadArticles(this.page)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
      .el-table__row {
        .item-image {
          width: 100px;
          height: 100PX;
        }
      }
    }
  }
</style>
