import request from '@/utils/request'

/**
 * 获取商品列表
 */
export function getGoodsList (params) {
  return request({
    method: 'GET',
    url: '/api/goods/get-goods-list',
    params
  })
}
/**
 * 获取爆款商品
 */
export function getExplosiveGoodsList (params) {
  return request({
    method: 'GET',
    url: 'api/goods/explosive-goods-list',
    params
  })
}
/**
 * 获取单品详情
 */
export const getGoodsDetails = (params) => {
  return request({
    method: 'GET',
    url: 'api/goods/get-goods-details',
    params
  })
}
/**
 * 获取单品详情
 */
export const getSimilerGoods = (params) => {
  return request({
    method: 'GET',
    url: '/api/goods/list-similer-goods-by-open',
    params
  })
}
/**
 * 获取我的收藏列表
 */
export function getCollectionList (params) {
  return request({
    method: 'GET',
    url: '/api/goods/get-collection-list',
    params
  })
}
/**
 * 获取超级分类
 */
export function getSuperCategory (params) {
  return request({
    method: 'GET',
    url: '/api/category/get-super-category',
    params
  })
}
/**
 * 获取搜索联想词
 */
export function getSearchSuggestions (params) {
  return request({
    method: 'GET',
    url: '/api/goods/search-suggestion',
    params
  })
}
/* 获取搜索结果 */
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/api/goods/get-dtk-search-goods',
    params
  })
}
/* 获取热搜记录 */
export const getHotSearch = () => {
  return request({
    method: 'GET',
    url: '/api/category/get-top100'
  })
}
