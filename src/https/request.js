// 二次封装axios
import axios from 'axios'

// 加载json-bigint插件
import JSONbig from 'json-bigint'

export function request (config) {
  const instance = axios.create({
    // baseURL: 'http://ttapi.research.itcast.cn/', // 请求的基础路径
    baseURL: 'http://api-toutiao-web.itheima.net', // 最新接口地址
    timeout: 5000,
    // 定义后端返回的原始数据的处理  - 参数data就是后端返回的原始数据(未经处理的JSON格式数据)
    transformResponse: [function (data) {
      // 后端返回的数据可能不是JSON格式字符串，如果不是JSON格式的字符串的话，那么JSONbig.parse调用就会报错，所以这里需要使用try...catch来捕获异常处理
      try {
        // 转换成功，则直接把结果返回
        return JSONbig.parse(data)
      } catch (err) {
        // 如果使用JSONbig转换失败，则使用axios中的JSON.parse原封不动的直接返回给请求数据
        return data
      }
    }]
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
