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
              <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202103%2F09%2F20210309094501_jfyix.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1675155531&t=8eda01a565dd12e9f0536efcb42f3e86" alt="">
              <span>黑塔布拉考密</span>
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
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutNavMenu from './components/LayoutNavMenu'

export default {
  name: 'LayoutIndex',
  components: {
    LayoutNavMenu
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
