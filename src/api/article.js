/* 文章相关请求模块 */
import request from '@/utils/request2'
/* 在非组件模块中获取store必须通过这种方式 */
// import store from '@/store'

/* 获取文章列表 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
/* 获取文章详情 */
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}
