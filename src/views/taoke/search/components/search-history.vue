<template>
  <div class='search-history-container'>
    <van-cell title="搜索历史">
      <div>
        <span>全部删除&nbsp;&nbsp;</span>
        <span>完成</span>
      </div>
      <van-icon name="delete"></van-icon>
    </van-cell>
    <van-cell title="hello">
      <van-icon name="close"></van-icon>
    </van-cell>
  </div>
</template>

<script>

export default {
  name: 'search-history',
  props: {},
  components: {},
  data () {
    return {

    }
  },

  computed: {},

  created () { },

  mounted () { },

  methods: {},

  watch: {}

}

</script>
<style lang='less' scoped>
.search-history-container {
}
</style>
