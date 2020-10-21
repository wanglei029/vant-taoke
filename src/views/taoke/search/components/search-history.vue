<template>
  <div class='search-history-container'>
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span>全部删除&nbsp;&nbsp;</span>
        <span @click="isDeleteShow=true">完成</span>
      </div>
      <van-icon name="delete"
                v-else
                @click="isDeleteShow=true"></van-icon>
    </van-cell>
    <van-cell :title="item"
              v-for="(item,index) in searchHistorys"
              :key="index"
              @click="$emit('search',item)">
      <van-icon name="close"
                v-show="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>

export default {
  name: 'search-history',
  props: {
    searchHistorys: {
      type: Array,
      required: true
    }
  },
  components: {},
  data () {
    return {
      isDeleteShow: false
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
