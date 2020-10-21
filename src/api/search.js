/* 搜索请求相关模块 */
import request from '@/utils/request2'
/* 在非组件模块中获取store必须通过这种方式 */
// import store from '@/store'

/* 获取搜索联想词 */
export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q // 搜索联想建议关键词
    }
  })
}
/* 获取搜索结果 */
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
/* 获取用户搜索历史 */
export const getSearchHistories = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}
