/**
 * 评论相关模块请求封装
 */
import { request } from './request'

// 打开 / 关闭评论
export function switchComment (commentId, allowComment) {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/comments/status?article_id=${commentId}`,
    data: {
      allow_comment: allowComment
    }
  })
}
