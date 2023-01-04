/**
 * 个人设置模块相关请求封装
 */
import { request } from './request'

// 上传头像
export function updatePhote (blob) {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data: blob
  })
}

// 更新用户资料
export function updateUserInfo (info) {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data: info
  })
}
