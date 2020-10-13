<template>
  <div class='container'>
    <van-nav-bar title="demo"
                 left-text="返回"
                 right-text="按钮"
                 left-arrow
                 @click-left="$router.push('/')" />
    <div class="test">
      <div class="left">左</div>
      <div class="main">中</div>
      <diav class="right">右</diav>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Demo',
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
.test {
  border: 1px solid #f74555;
  .left,
  .main,
  .right {
    display: inline-block;
    border: 1px solid #d8f820;
    box-sizing: border-box;
  }
  .left {
    width: 20%;
  }
  .main {
    width: 60%;
  }
  .right {
    width: 20%;
  }
}
</style>
