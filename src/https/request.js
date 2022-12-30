// 二次封装axios
import axios from 'axios'

export const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/' // 请求的基础路径
  baseURL: 'http://api-toutiao-web.itheima.net' // 最新接口地址
})

// export function request (config) {
//   const instance = axios.create({
//     baseURL: 'http://api-toutiao-web.itheima.net',
//     timeout: 5000
//   })
// }
