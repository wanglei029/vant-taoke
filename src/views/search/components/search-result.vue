<template>
  <div class='search-result-container'>
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <van-cell v-for="(article,index) in list"
                :key="index"
                :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'search-result',
  props: {
    searchText: {
      type: String,
      retuired: true
    }
  },
  components: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },

  computed: {},

  created () { },

  mounted () { },

  methods: {
    async onLoad () {
      // 1.请求获取数据
      const params = {
        page: this.page,
        per_page: this.perPage,
        q: this.searchText
      }
      try {
        const { data } = await getSearchResult(params)
        // 2.将数据放到数据列表中
        const { results } = data.data
        this.list.push(...results)
        // 3.关闭本次的loading
        this.loading = false
        // 4.判断是否还有数据
        if (results.length > 0) {
          //  如果有，则更新下一页数据
          this.page++
        } else {
          //  如果没有，则把finished设置为true关闭加载更多
          this.finished = true
        }
      } catch (error) {

      }
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.search-result-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
