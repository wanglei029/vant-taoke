<template>
  <div class='search-history-container'>
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('update-histories',[])">全部删除&nbsp;&nbsp;</span>
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon name="delete"
                v-else
                @click="isDeleteShow=true"></van-icon>
    </van-cell>
    <van-cell :title="history"
              v-for="(history,index) in searchHistorys"
              :key="index"
              @click="onDelete(history,index)">
      <van-icon name="close"
                v-show="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
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

  methods: {
    onDelete (history, index) {
      // 如果是删除状态 执行删除操作
      if (this.isDeleteShow) {
        this.searchHistorys.splice(index, 1)
        // 持久化处理
        // 1.修改本地存储的数据
        // setItem('search-histories', this.searchHistorys)
        // 2.请求接口删除线上的数据
        // 无论是否登录都把数据持久化到本地
        // 如果已经登录，则删除线上的历史记录
        return
      }
      // 非删除状态 展示搜索结果
      this.$emit('search', history)
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.search-history-container {
}
</style>
