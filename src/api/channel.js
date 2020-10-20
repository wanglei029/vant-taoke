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
/* 添加频道 */
export const addUserChannel = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}
/* 删除指定频道 */
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
