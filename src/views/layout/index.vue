<template>
  <el-container class="layout">
    <el-aside width="200px" class="aside">
      <layout-nav-menu />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="header-title">
          <i class="el-icon-s-fold"></i>
          <span>FBMS后台管理系统</span>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="el-dropdown-link avatar-wrap">
              <img :src="user.phote" alt="">
              <span>{{ user.name }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i class="el-icon-setting"></i>
                设置
              </el-dropdown-item>
              <el-dropdown-item>
                <i class="el-icon-switch-button"></i>
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo } from 'https/user'

import LayoutNavMenu from './components/LayoutNavMenu'

export default {
  name: 'LayoutIndex',
  data () {
    return {
      user: {}
    }
  },
  components: {
    LayoutNavMenu
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    loadUserInfo () {
      getUserInfo().then(res => {
        const { data: { data: { name, photo } }, status } = res
        if (status === 200) {
          this.user = Object.assign({}, { name, photo })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .layout {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .aside {
      background-color: #d3dce6;
      height: 100%;
      .el-menu {
        height: 100%;
      }
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .header-title {
        font-size: 20px;
        color: #000;
        .el-icon-s-fold {
          font-size: 24px;
        }
        span {
          margin-left: 10px;
        }
      }
      .header-right {
        .el-dropdown {
          .avatar-wrap {
            display: flex;
            align-items: center;
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              overflow: hidden;
            }
            span {
              color: #333;
              font-size: 14px;
              font-weight: 500;
            }
          }
        }
      }
    }
    .main {
    }
  }
</style>
