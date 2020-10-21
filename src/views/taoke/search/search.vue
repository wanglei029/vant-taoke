<template>
  <div class='search-container'>
    <!-- 搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search v-model="searchText"
                  show-action
                  placeholder="请输入搜索关键词"
                  @search="onSearch(searchText)"
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
                    @search='onSearch'></search-history>
    <!-- /历史记录 -->

  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
import { getHotSearch } from '@/api/goods'
export default {
  name: 'Search',
  props: {},
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的显示状态
      searchHistorys: getItem('tao-search-history') || []
    }
  },

  computed: {},

  created () { },

  mounted () { },

  methods: {
    onSearch (searchText) {
      // 把输入框设置为你要搜索的文本
      this.searchText = searchText
      // 记录搜索记录
      const index = this.searchHistorys.indexOf(searchText)
      if (index !== -1) {
        // 如果找到搜索词 便从历史记录中将其移除
        this.searchHistorys.splice(index, 1)
      }
      // 把最新的搜索记录放到顶部
      this.searchHistorys.unshift(searchText)
      // 如果用户已经登录，就把搜索的历史记录保存到线上
      // 如果用户没有登录，就把搜索的历史记录保存到本地
      setItem('tao-search-history', this.searchHistorys)
      this.isResultShow = true
    },
    onCancel () {
      this.$toast('取消')
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.search-container {
}
</style>
