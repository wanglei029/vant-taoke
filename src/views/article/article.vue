<template>
  <div class='article-container'>
    article
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    // 路由传递过来的参数
    articleId: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
    }
  },

  computed: {},

  created () {
    this.loadArticleDetail()
  },

  mounted () { },

  methods: {
    loadArticleDetail () {
      console.log(this.articleId)
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.article-container {
}
</style>
