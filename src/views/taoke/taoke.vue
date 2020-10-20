<template>
  <div class='container'>
    <van-nav-bar class="app-nav-bar">
      <van-button class="search-btn"
                  slot="title"
                  icon="search"
                  round
                  to="taoke/search">搜索</van-button>
    </van-nav-bar>
    <van-tabs v-model="active"
              class="channel-tabs"
              @click='onClickTab'>
      <van-tab v-for="category in categoryList"
               :key="category.cid"
               :title="category.cname">
        <goods-list :category='category'></goods-list>
      </van-tab>
      <!-- tab右侧插槽 汉堡图标 -->
      <!-- 汉堡图标会遮挡列表最后的位置 添加占位元素 -->
      <div slot="nav-right"
           class="wap-nav-placeholder"></div>
      <div slot="nav-right"
           class="wap-nav-wrap"
           @click="isCategoryEditShow=true">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup v-model="isCategoryEditShow"
               position="top"
               closeable
               close-icon-position="top-left"
               get-container="body"
               style="height:100%"
               class="channel-edit-popup">
      <category-edit :category="categoryList"
                     @click="isCategoryEditShow=false"
                     @update-active='active=$event'></category-edit>
    </van-popup>
  </div>
</template>

<script>
import { getGoodsList, getExplosiveGoodsList, getSuperCategory } from '@/api/goods'
import { getUserChannels } from '@/api/user'
import GoodsList from './components/goods-list'
import CategoryEdit from './components/category-edit'
export default {
  name: 'Taoke',
  props: {},
  components: { GoodsList, CategoryEdit },
  data () {
    return {
      active: 0,
      categoryList: [], // 商品分类列表
      isCategoryEditShow: false // 商品分类编辑
    }
  },

  computed: {},

  created () {
    /* 加载商品列表数据 */
    // this.loadGoodsList()
    // this.loadExplosiveGoodsList()
    /* 加载商品超级分类数据 */
    this.loadSuperCategory()
    /* 加载文章频道数据 */
    this.loadUserChannels()
  },

  mounted () { },

  methods: {
    async loadGoodsList (pageId = '1') {
      const res = await getGoodsList(pageId)
      console.log(res)
    },
    async loadExplosiveGoodsList (pageId = '1') {
      const pageSize = 10
      const params = { pageId, pageSize }
      const res = await getExplosiveGoodsList(params)
      console.log(res)
    },
    async loadSuperCategory () {
      const { data } = await getSuperCategory()
      console.log(data)
      this.categoryList = data.data
    },
    /* 加载用户频道列表 */
    async loadUserChannels () {
      const { data } = await getUserChannels()
      console.log(data)
    },
    onClickTab (event) {
      console.log(event)
      // tabs.addEventListener('click', function (event) {
      //   console.log(event)
      // }, false)
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
      color: #222;
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
      bottom: 22px;
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
