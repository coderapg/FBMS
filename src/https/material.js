/**
 * material模块相关请求封装
 */
import { request } from 'https/request'

// 获取素材管理列表数据
export function getMaterialList (params) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
