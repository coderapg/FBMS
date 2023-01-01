// 配置路由映射关系表

import Vue from 'vue'
import VueRouter from 'vue-router'

const Article = () => import('views/article/')
const Comment = () => import('views/comment/')
const Fans = () => import('views/fans/')
const Home = () => import('views/home/')
const Layout = () => import('views/layout/')
const Login = () => import('views/login/')
const Material = () => import('views/material/')
const Publish = () => import('views/publish/')
const Setting = () => import('views/setting/')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: Login,
    component: Login
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/article',
        name: Article,
        component: Article
      },
      {
        path: '/comment',
        name: Comment,
        component: Comment
      },
      {
        path: '/fans',
        name: Fans,
        component: Fans
      },
      {
        path: '/',
        name: Home,
        component: Home
      },
      {
        path: '/material',
        name: Material,
        component: Material
      },
      {
        path: '/publish',
        name: Publish,
        component: Publish
      },
      {
        path: '/setting',
        name: Setting,
        component: Setting
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 添加路由导航守卫
router.beforeEach((to, from, next) => {
  const userInfo = JSON.parse(window.localStorage.getItem('FBMS_User_Info'))
  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (userInfo) {
      // 已登录，允许通过
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})

export default router
