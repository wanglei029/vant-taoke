<template>
  <div class='container'>
    <van-nav-bar class="app-nav-bar">
      <van-button class="search-btn"
                  slot="title"
                  icon="search"
                  round>搜索</van-button>
    </van-nav-bar>
  </div>
</template>

<script>
import { getGoodsList, getExplosiveGoodsList } from '@/api/goods'
export default {
  name: 'Home',
  props: {},
  components: {},
  data () {
    return {

    }
  },

  computed: {},

  created () {
    this.loadGoodsList()
    this.loadExplosiveGoodsList()
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
    background-color: #f75462;
    color: #fff;
    border: none;

    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}
</style>
