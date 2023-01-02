<template>
  <el-card class="screen">
    <!-- 面包屑导航 -->
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>发布文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- /面包屑导航 -->
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="form.channel_id" placeholder="请选择频道">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="form.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleOnPublish(false)">发布</el-button>
        <el-button @click="handleOnPublish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getChannels, addArticle, getArticle } from 'https/article'

export default {
  name: 'PublishIndex',
  data () {
    return {
      form: {
        channel_id: null,
        content: '',
        cover: {
          images: [],
          type: 1
        },
        title: ''
      },
      channels: [],
      articleId: '' // 编辑时存储当前文章的id
    }
  },
  created () {
    this.loadChannels()
    const { articleId } = this.$route.query
    if (articleId) {
      this.articleId = articleId
      // 获取编辑的数据
      this.editData()
    }
  },
  methods: {
    // 获取频道列表
    loadChannels () {
      getChannels().then(res => {
        const { data: { data: { channels } }, status } = res
        if (status === 200) {
          this.channels = channels
        }
      })
    },
    // 发布文章
    handleOnPublish (draft) {
      addArticle(this.form, draft).then(res => {
        const { status } = res
        if (status === 201) {
          this.$message({
            message: '发布成功',
            type: 'success',
            center: true
          })
        }
      })
    },
    // 跟新文章
    editData () {
      getArticle(this.articleId).then(res => {
        const { data: { data: { channel_id: channelId, content, cover, id, title } }, status } = res
        if (status === 200) {
          this.form = Object.assign({}, { channel_id: channelId, content, cover, id: id.toString(), title })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-form {
    /deep/ .el-form-item__content {
      width: 400px;
    }
  }
</style>
