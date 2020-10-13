<template>
  <div class='layout-container'>
    <!-- 子路由出口 -->
    <router-view />

    <!-- 底部导航栏 -->
    <van-tabbar v-model="active"
                route>
      <van-tabbar-item icon="home-o"
                       to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search"
                       to="nine">9.9</van-tabbar-item>
      <van-tabbar-item icon="friends-o"
                       to="category">分类</van-tabbar-item>
      <van-tabbar-item icon="setting-o"
                       to="collection">收藏</van-tabbar-item>
      <van-tabbar-item icon="setting-o"
                       to="my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'Layout',
  props: {},
  components: {},
  data () {
    return {
      active: 0
    }
  },

  computed: {},

  created () { },

  mounted () { },

  methods: {
  },

  watch: {}

}

</script>
<style lang='less' scoped>
</style>
