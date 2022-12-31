/**
 * 用户相关模块请求封装
 */
import { request } from './request'

// 登录 / 注册
export function login (config) {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: config
  })
}
