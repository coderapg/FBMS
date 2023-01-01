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
    url: '/app/v1_0/user/profile',
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzI1NzQzMzAsInVzZXJfaWQiOjE2MDk0NDM2Njc4NTUwMTU5MzYsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.DUGi239PilXyCd0nrF_v8n2blXUwB9JAPRwcqpL4b1E'
    }
  })
}
