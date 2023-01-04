<template>
  <el-card>
    <!-- 面包屑导航 -->
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- /面包屑导航 -->
    <!-- 表单 -->
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="编号">123</el-form-item>
          <el-form-item label="手机号">17860143911</el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="请输入邮箱地址" v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="媒体名称" prop="name">
            <el-input placeholder="请输入媒体名称" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍" prop="intro">
            <el-input type="textarea" placeholder="请输入媒体介绍" v-model="form.intro" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" :offset="3" class="row-avatar">
        <label for="upload">
          <el-avatar :size="200" :src="circleUrl"></el-avatar>
          <p>修改头像</p>
        </label>
        <input type="file" id="upload" hidden>
      </el-col>
    </el-row>
    <!-- /表单 -->
  </el-card>
</template>

<script>

export default {
  name: 'SettingIndex',
  data () {
    return {
      form: {
        name: '',
        intro: '',
        email: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: '请输入媒体名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入媒体名称', trigger: 'blur' },
          { min: 5, max: 300, message: '长度在 5 到 300 个字符', trigger: 'blur' }
        ]
      },
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        } else {
          console.log('submit!!')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .row-avatar {
    label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        text-align: center;
        font-size: 18px;
        color: #000;
        line-height: 20px;
      }
    }
  }
</style>
