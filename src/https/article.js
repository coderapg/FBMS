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

// 获取全部频道列表
export function getChannels () {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除表单数据
export function delectArticle (articleId) {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 新增文章
export function addArticle (article, draft) {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data: article
  })
}

// 获取编辑的文章
export function getArticle (articleId) {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 更新文章
export function updateArticle (articleId, articleObj, draft = false) {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data: articleObj
  })
}

// 富文本-上传图片
export function uploadRichImage (imgUrl) {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 可配置headers中的 'Content-Type': 'multipart/form-data'，同时也可以不进行配置，axios中将会给我们自动配置 'Content-Type'
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: imgUrl
  })
}
