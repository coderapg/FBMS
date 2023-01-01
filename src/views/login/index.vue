<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="rulesForm" :model="user" :rules="rules" class="login-form">
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
        <el-form-item prop="checked">
          <el-checkbox v-model="user.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="submitForm">登录</el-button>
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
        code: '246810',
        checked: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          // { min: 6, max: 6, message: '验证码个数不符', trigger: 'blur' }
          { pattern: /^\d{6}$/, message: '验证码个数不符', trigger: 'blur' }
        ],
        checked: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                // 同意协议
                callback()
              } else {
                // 不同意协议时，下面会进行提示需要勾选协议才可以生效
                callback(new Error('请勾选协议'))
              }
            },
            trigger: 'blur'
          }
        ]
      },
      isLoading: false
    }
  },
  methods: {
    submitForm () {
      this.isLoading = true
      this.$refs.rulesForm.validate(valid => {
        if (!valid) {
          // 手动验证失败，阻止后续代码执行
          this.isLoading = false
          return false
        }

        // 手动验证成功
        this.handleLogin()
      })
    },
    handleLogin () {
      login(this.user).then(res => {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.isLoading = false
        // 登录成功后跳转到首页
        this.$router.push('/')
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或验证码错误')
        this.isLoading = false
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
