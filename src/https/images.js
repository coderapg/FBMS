/**
 * 图片相关模块请求封装
 */
import { request } from './request'

// 上传图片
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
