<template>
  <div class='article-list-container'>
    <van-pull-refresh v-model="isRefreshLoading"
                      :success-duration="1500"
                      :success-text="refreshSuccessText"
                      @refresh="onRefresh">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <article-item v-for="(item,index) in articles"
                      :key="index"
                      :article="item"></article-item>
        <!-- <van-cell v-for="(item,index) in articles"
                  :key="index"
                  :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/article-item'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: { ArticleItem },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      isRefreshLoading: false, // 下拉刷新的loading状态
      refreshSuccessText: ''
    }
  },

  computed: {},

  created () { },

  mounted () { },

  methods: {
    async onLoad () {
      // 异步更新数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.articles.push(...results)
      this.loading = false
      /* 如果还有下一页获取更新下一页的页码 */
      if (results.length > 0) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
      console.log(data)
    },
    async onRefresh () {
      console.log('下拉刷信')
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.articles.push(...results)
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.article-list-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
