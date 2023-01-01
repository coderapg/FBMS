/**
 * 文章相关模块请求封装
 */
import { request } from './request'

// 获取当前用户文章列表
export function getArticles (params) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
