/* 用户相关请求模块 */
import request from '@/utils/request2'
/* 在非组件模块中获取store必须通过这种方式 */
// import store from '@/store'

/* 获取所有频道列表 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
