// 配置项目路由表

import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/index')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: Login,
    component: Login
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
