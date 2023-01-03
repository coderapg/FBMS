<template>
  <el-card class="screen">
    <!-- 面包屑导航 -->
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ articleId ? '编辑' : '发布' }}文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- /面包屑导航 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="60px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="频道" prop="channel_id">
            <el-select v-model="form.channel_id" placeholder="请选择频道">
              <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="内容" prop="content">
            <el-tiptap placeholder="请输入内容" :width="1400" :height="400" lang="zh" v-model="form.content" :extensions="extensions" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="封面">
            <el-radio-group v-model="form.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="handleOnPublish(false)">{{ articleId ? '编辑' : '发布' }}</el-button>
            <el-button @click="handleOnPublish(true)" v-if="!articleId">存入草稿</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Image,
  CodeBlock,
  Blockquote,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  TextAlign,
  Indent,
  LineHeight,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TextColor,
  Preview,
  Fullscreen,
  FontSize
} from 'element-tiptap'
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'

import { getChannels, addArticle, getArticle, updateArticle, uploadRichImage } from 'https/article'

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
      // 添加表单验证规则
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择频道', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }, // 防止在第一次未输入时直接提交
          // 输入内容后再次清空时content内容会变成'<p></p>'
          {
            validator: (rule, value, callback) => {
              if (value === '<p></p>') {
                callback(new Error('请输入内容'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      channels: [],
      articleId: '', // 编辑时存储当前文章的id
      // 编辑器的 extensions(它们将会按照你声明的顺序被添加到菜单栏和气泡菜单中)
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }), // 标题
        new Bold({ bubble: true }), // 粗体
        new Italic(), // 斜体
        new Strike(), // 删除线
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Image({
          uploadRequest (file) {
            /**
             * 一般文件上传的接口都要求把请求头中的 Content-Type 设置为 multipart/form-data，但是我们使用 axios 上传文件的话不需要手动设置，你只要给 data 一个 new FormData() 对象即可。
             */
            const fd = new FormData()
            fd.append('image', file)
            return uploadRichImage(fd).then(res => {
              const { data: { data: { url } }, status } = res
              if (status === 201) {
                return url
              }
            })
          }
        }), // 插入图片
        new CodeBlock(), // 代码块
        new Blockquote(), // 引用
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(), // 类似TodoList
        new TextAlign(),
        new Indent(),
        new LineHeight(),
        new Table(),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new TextColor(), // 字体颜色
        new FontSize(), // 字号
        new Preview(), // 预览
        new Fullscreen() // 全屏
      ]
    }
  },
  components: {
    'el-tiptap': ElementTiptap
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
      this.$refs.form.validate(valid => {
        if (!valid) {
          // 表单验证未通过
          return
        }
        // 表单验证通过
        if (this.articleId) {
          // 编辑/更新文章
          updateArticle(this.articleId, this.form, draft).then(res => {
            const { status } = res
            if (status === 201) {
              this.baseMethod()
            }
          })
        } else {
          // 新增文章
          addArticle(this.form, draft).then(res => {
            const { status } = res
            if (status === 201) {
              this.baseMethod()
            }
          })
        }
      })
    },
    // 编辑文章-对文章进行赋值
    editData () {
      getArticle(this.articleId).then(res => {
        const { data: { data: { channel_id: channelId, content, cover, id, title } }, status } = res
        if (status === 200) {
          this.form = Object.assign({}, { channel_id: channelId, content, cover, id: id.toString(), title })
        }
      })
    },
    // 抽取公共提示和跳转代码
    baseMethod () {
      this.$message({
        message: this.articleId ? '编辑成功' : '发布成功',
        type: 'success',
        center: true
      })
      // 添加完成后跳转到文章页面
      this.$router.push('/article')
    }
  }
}
</script>

<style lang="less" scoped>
  // .el-form {
  //   /deep/ .el-form-item__content {
  //     width: 400px;
  //   }
  // }
</style>
