<template>
  <div class='search-container'>
    <!-- 搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search v-model="searchText"
                  show-action
                  placeholder="请输入搜索关键词"
                  @search="onSearch"
                  @cancel="$router.back()"
                  @focus="isResultShow=false" />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow"
                   :search-text="searchText"></search-result>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText"
                       :search-text="searchText"
                       @search='onSearch'></search-suggestion>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <search-history v-else
                    :searchHistorys='searchHistorys'
                    @search='onSearch'
                    @update-histories='searchHistorys=$event'></search-history>
    <!-- /历史记录 -->

  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
import { getSearchHistories } from '@/api/search'
import { mapGetters } from 'vuex'
export default {
  name: 'Search',
  props: {},
  components: { SearchSuggestion, SearchHistory, SearchResult },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的显示状态
      searchHistorys: []
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  created () {
    this.loadSearchHistories()
  },

  mounted () { },

  methods: {
    onSearch (searchText) {
      this.$toast(searchText)
      // 把输入框中的内容设置为搜索的文本
      this.searchText = searchText
      const index = this.searchHistorys.indexOf(searchText)
      if (index !== -1) {
        // 如果找到搜索词 便从历史记录中将其移除
        this.searchHistorys.splice(index, 1)
      }
      // 把最新的搜索记录放到顶部
      this.searchHistorys.unshift(searchText)
      // 如果用户已经登录，就把搜索的历史记录保存到线上
      // 如果用户没有登录，就把搜索的历史记录保存到本地
      // setItem('search-histories', this.searchHistorys)
      // 展示搜索结果
      this.isResultShow = true
    },
    async loadSearchHistories () {
      // 如果用户已经登录
      const searchHistorys = getItem('search-histories') || []
      // console.log(searchHistorys)
      // 合并线上和本地的历史记录
      // if (this.user) {
      //   const { data } = await getSearchHistories()
      //   searchHistorys = [...new Set([...searchHistorys, ...data.data.keywords])]
      // }
      this.searchHistorys = searchHistorys
    }
  },

  watch: {
    // 监视历史搜索记录的变化，存储到本地
    searchHistorys () {
      setItem('search-histories', this.searchHistorys)
    }
  }

}

</script>
<style lang='less' scoped>
.search-container {
}
</style>
