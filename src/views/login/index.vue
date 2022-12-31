<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="loginForm" :model="user" :rules="rules" class="login-form">
        <el-form-item class="logo">
          <el-image :src="logoUrl" fit="content"></el-image>
          <div class="logo-title">后台新闻发布系统</div>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from 'https/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      logoUrl: require('../../assets/image/logo.png'),
      user: {
        mobile: '13521016268',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '验证码个数不符', trigger: 'blur' }
        ]
      },
      checked: true,
      isLoading: false
    }
  },
  methods: {
    handleLogin () {
      this.isLoading = true
      // const use = Object.assign({}, this.user, { xieyi: true })
      login(this.user).then(res => {
        this.isLoading = false
        this.$message({
          message: '登录成功',
          type: 'success'
        })
      }).catch(err => {
        this.$message.error('登录失败，手机号或验证码错误')
        this.isLoading = false
        console.log('错误', err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: grey;
    background-image: url(./login_bg.jpg);
    background-size: cover;
    .login-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 400px;
      height: 360px;
      text-align: center;
      background-color: #fff;
      .login-form {
        width: 75%;
        margin: 10px;
        box-sizing: border-box;
        .logo {
          position: relative;
          margin-top: 10px;
          width: 100%;
          height: 85px;
          /deep/ .el-form-item__content {
            position: absolute;
            transform: translateX(-50%);
            left: 50%;
            margin: 1px auto;
            .el-image {
              width: 100px;
            }
            .logo-title {
              margin-top: -20px;
              font-size: 16px;
              color: #000;
            }
          }
        }
        /deep/ .el-form-item {
          .el-form-item__content {
            .el-button {
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>
