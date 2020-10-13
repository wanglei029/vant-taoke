<template>
  <div class='container'>
    Home
    <van-button type="primary">按钮</van-button>
  </div>
</template>

<script>
import { getGoodsList, getExplosiveGoodsList } from '@/api/goods'
export default {
  name: 'Home',
  props: {},
  components: {},
  data () {
    return {

    }
  },

  computed: {},

  created () {
    this.loadGoodsList()
    this.loadExplosiveGoodsList()
  },

  mounted () { },

  methods: {
    async loadGoodsList (pageId = '1') {
      const res = await getGoodsList(pageId)
      console.log(res)
    },
    async loadExplosiveGoodsList (pageId = '1') {
      const pageSize = 10
      const params = { pageId, pageSize }
      const res = await getExplosiveGoodsList(params)
      console.log(res)
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
</style>
