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

// 获取当前登录人信息
export function getUserInfo () {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}
