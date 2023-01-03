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

// 收藏 / 取消收藏
export function toggleItemCollect (itemId, collect) {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${itemId}`,
    data: {
      collect
    }
  })
}

// 删除
export function deleteItemImage (itemId) {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${itemId}`
  })
}
