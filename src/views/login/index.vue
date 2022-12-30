<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="form" :model="user" class="login-form">
        <el-form-item class="logo">
          <el-image :src="logoUrl" fit="content"></el-image>
          <div class="logo-title">后台新闻发布系统</div>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoginIndex',
  data () {
    return {
      logoUrl: require('../../assets/image/logo.png'),
      user: {
        mobile: '13611111111',
        code: '246810'
      },
      checked: true
    }
  },
  methods: {
    handleLogin () {
      console.log('submit!')
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
      }
    }
  }
</style>
