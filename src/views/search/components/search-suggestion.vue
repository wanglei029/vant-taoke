<template>
  <div class='search-suggestion-container'>
    <van-cell icon="search"
              v-for="(str,index) in suggestions"
              :key="index"
              @click="$emit('search',str)">
      <div slot="title"
           v-html="heightlight (str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
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
      suggestions: [] // 联想建议数据列表
    }
  },

  computed: {},

  created () { },

  mounted () { },

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
        const { data } = await getSearchSuggestions(val)
        console.log(data)
        this.suggestions = data.data.options
      }, 200),
      // async handler (val) {
      //   console.log(val)
      //   const { data } = await getSearchSuggestions(val)
      //   console.log(data)
      //   this.suggestions = data.data.options
      // },
      immediate: true // 该回调函数监听开始之后立即调用
    }
  }

}

</script>
<style lang='less' scoped>
.search-suggestion-container {
}
</style>
