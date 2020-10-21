<template>
  <div class='search-result-container'>
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <van-cell v-for="item in searchResultList"
                :key="item.id"
                :title="item.dtitle" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/goods'
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
      searchResultList: [],
      loading: false,
      finished: false
    }
  },

  computed: {},

  created () { },

  mounted () { },

  methods: {
    async onLoad () {
      // 1.请求获取数据
      const params = {
        pageSize: 10,
        pageId: this.pageId || 1,
        keyWords: this.searchText
      }
      try {
        const { data } = await getSearchResult(params)
        // 2.将数据放到数据列表中
        const { list, pageId } = data.data
        console.log(data)
        this.searchResultList.push(...list)
        // 3.关闭本次的loading
        this.loading = false
        // 4.判断是否还有数据
        //  如果有，则更新下一页数据
        //  如果没有，则把finished设置为true关闭加载更多
        /* 如果还有下一页获取更新下一页的页码 */
        if (list.length > 0) {
          this.pageId = data.pageId
        } else {
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
