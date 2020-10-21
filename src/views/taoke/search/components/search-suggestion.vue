<template>
  <div class='search-suggestion-container'>
    <van-cell icon="search"
              v-for="(str,index) in suggestions"
              :key="index"
              @click="$emit('search',str.kw)">
      <div slot="title"
           v-html="heightlight(str.kw)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/goods'
import { debounce } from 'lodash'
export default {
  name: 'search-suggestion',
  props: {
    searchText: {
      type: String,
      retuired: true
    }
  },
  components: {},
  data () {
    return {
      suggestions: [], // 联想建议词列表
      htmlStr: 'hello<span style="color:red">world</span>'
    }
  },

  computed: {},

  created () { },

  mounted () {

  },

  methods: {
    /* 高亮显示搜索词 */
    heightlight (str) {
      return str.replace(new RegExp(this.searchText, 'gi'), `<span style='color:red'>${this.searchText}</span>`)
    }
  },

  watch: {
    // searchText (val) {
    //   console.log(val)
    // }
    // 属性监视的完整写法
    searchText: {
      handler: debounce(async function (val) {
        console.log(val)
        const params = {
          keyWords: val,
          type: 2
        }
        const { data } = await getSearchSuggestions(params)
        console.log(data)
        this.suggestions = data.data
      }, 200),
      immediate: true // 该回调函数监听开始之后立即调用
    }
  }

}

</script>
<style lang='less' scoped>
.search-suggestion-container {
}
</style>
