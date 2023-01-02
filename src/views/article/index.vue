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
      <div slot="header" class="clearfix">根据筛选条件共查询到{{ totalCount }}条结果:</div>
      <el-table
        border
        size="small"
        :data="articleData"
        style="width: 100%">
        <el-table-column prop="date" label="封面">
          <template slot-scope="scope">
            <el-image
              class="item-image"
              style="width: 100px;"
              :src="scope.row.cover.images[0]"
              fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="status" label="状态">
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
        <el-table-column label="操作">
          <template>
            <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalCount"
        @current-change="handleCurrentChange" />
      <!-- /分页 -->
    </el-card>
    <!-- /table表格 -->
  </div>
</template>

<script>
import { getArticles } from 'https/article'
import { articleStatus } from 'utils/constant'

export default {
  name: 'ArticleIndex',
  data () {
    return {
      articleStatus,
      form: {
        status: null,
        channel: '',
        date: ''
      },
      articleData: [],
      page: 1, // 当前页码
      pageSize: 20, // 每页请求条数
      totalCount: 0 // 总条数
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    // 获取当前用户文章列表
    loadArticles (page = 1) {
      getArticles({
        page,
        per_page: this.pageSize
      }).then(res => {
        const { data: { data: { results, total_count: totalCount } }, status } = res
        if (status === 200) {
          this.articleData = results
          this.totalCount = totalCount
        }
      })
    },
    // 分页
    handleCurrentChange (page) {
      this.page = page
      this.loadArticles(page)
    },
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
      .el-table__row {
        .item-image {
          width: 100px;
          height: 100PX;
        }
      }
      .pagination {
        text-align: center;
        margin: 30px auto;
      }
    }
  }
</style>
