// 二次封装axios
import axios from 'axios'

export function request (config) {
  const instance = axios.create({
    // baseURL: 'http://ttapi.research.itcast.cn/', // 请求的基础路径
    baseURL: 'http://api-toutiao-web.itheima.net', // 最新接口地址
    timeout: 5000
  })

  // 添加请求拦截器
  instance.interceptors.request.use(req => {
    // 获取本地存储中当前登录人相关信息
    const userInfo = JSON.parse(window.localStorage.getItem('FBMS_User_Info'))
    if (userInfo) {
      // 请求发送时，设置统一携带token
      req.headers.Authorization = `Bearer ${userInfo.token}`
    }
    return req
  }, err => {
    return Promise.reject(err)
  })

  // 添加响应拦截器
  instance.interceptors.response.use(res => {
    return res
  }, err => {
    return Promise.reject(err)
  })

  return instance(config)
}
