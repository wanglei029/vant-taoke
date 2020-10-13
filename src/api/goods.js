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
export function getGoodsDetails (params) {
  return request({
    method: 'GET',
    url: 'api/goods/get-goods-details',
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
