<template>
  <div class='container'>
    <van-pull-refresh v-model="isRefreshLoading"
                      :success-text="refreshSuccessText"
                      success-duration="1500"
                      @refresh="onRefresh">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                class="goods-list">
        <good-item v-for="item in goods"
                   :goods='item'
                   :key="item.id"
                   class="goods-item"></good-item>
        <!-- <van-cell v-for="item in goods"
                  :key="item.cid"
                  :title="item.dtitle" /> -->
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getGoodsList } from '@/api/goods'
import GoodItem from '@/components/good-item/good-item'
export default {
  name: 'goodList',
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  components: { GoodItem },
  data () {
    return {
      goods: [],
      loading: false,
      finished: false,
      pageId: null,
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
      const params = {
        cids: this.category.cid,
        pageId: this.pageId,
        pageSize: 10
      }
      try {
        console.log(params)
        const { data } = await getGoodsList(params)
        console.log(this.category)
        console.log(data)
        const { list, pageId } = data.data
        console.log(data)
        this.goods.push(...list)
        this.loading = false
        /* 如果还有下一页获取更新下一页的页码 */
        if (list.length > 0) {
          console.log(pageId)
          this.pageId = pageId
        } else {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
      }
    },
    async onRefresh () {
      console.log('下拉刷新')
      const params = {
        cids: this.category.cid,
        pageId: this.pageId || 1,
        pageSize: 10
      }
      const { data } = await getGoodsList(params)
      const { list, pageId } = data.data
      this.goods.push(...list)
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新了${list.length}条数据`
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.container {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
  .goods-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    // background: #c000e8;
    padding: 10px 10px;
    .goods-item {
      width: 49%;
    }
  }
}
</style>
