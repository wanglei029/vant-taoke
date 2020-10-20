<template>
  <div class='container'>
    <van-nav-bar class="app-nav-bar">
      <van-button class="search-btn"
                  slot="title"
                  icon="search"
                  round
                  to="search">搜索</van-button>
    </van-nav-bar>
    <van-tabs v-model="active"
              class="channel-tabs">
      <van-tab v-for="channel in channels"
               :key="channel.id"
               :title="channel.name">
        <article-list :channel='channel'></article-list>
      </van-tab>
      <!-- tab右侧插槽 汉堡图标 -->
      <!-- 汉堡图标会遮挡列表最后的位置 添加占位元素 -->
      <div slot="nav-right"
           class="wap-nav-placeholder"></div>
      <div slot="nav-right"
           class="wap-nav-wrap"
           @click="isChannelEditShow=true">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <van-popup v-model="isChannelEditShow"
               position="top"
               closeable
               close-icon-position="top-left"
               get-container="body"
               style="height:100%"
               class="channel-edit-popup">
      <channel-edit :user-channels="channels"
                    :active='active'
                    @close='isChannelEditShow=false'
                    @update-active="onUpdateActive"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapGetters } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'Home',
  props: {},
  components: { ArticleList, ChannelEdit },
  data () {
    return {
      active: 0,
      channels: [], // 商品分类列表
      isChannelEditShow: true // 控制编辑频道的显示
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  created () {
    /* 加载文章频道数据 */
    this.loadUserChannels()
  },

  mounted () { },

  methods: {
    /* 加载用户频道列表 */
    async loadUserChannels () {
      let channels = []
      if (this.user) {
        // 用户已登录
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 没有登录 判断是否有本地存储的数据
        const localChannels = getItem('user-channels')
        if (localChannels) {
          // 有本地存储的数据
          channels = localChannels
        } else {
          // 没有本地存储的数据 请求获取默认频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      // 处理好的数据放到data中
      this.channels = channels
      // const { data } = await getUserChannels()
      // this.channels = data.data.channels
    },
    onUpdateActive (index) {
      this.active = index
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    // background-color: #f75462;
    background-color: #fff;
    color: #666;
    border: none;

    .van-icon {
      font-size: 16px;
      color: #333;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  .channel-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tabs__line {
      width: 15px !important;
      height: 3px;
      background: #ee0a24;
      bottom: 20px;
    }
    .wap-nav-placeholder {
      width: 33px;
      flex-shrink: 0;
    }
    .wap-nav-wrap {
      position: fixed;
      right: 0;
      width: 33px;
      height: 42px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.9;
      .van-icon {
        font-size: 24px;
      }
      &::before {
        content: "";
        width: 1px;
        height: 43px;
        background: url("./line.png") no-repeat;
        background-size: contain;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}
</style>
