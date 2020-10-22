<template>
  <div class='goods-container'>
    <transition name="fade">
      <div class="top-nav"
           v-show="showTopNav">
        <div class="back"
             @click="$router.back()">
          <van-icon name="arrow-left" />
        </div>
        <div class="more">
          <van-icon name="ellipsis" />
        </div>
      </div>
    </transition>
    <van-tabs v-model="activeName"
              scrollspy
              sticky
              ref="navTabs">
      <van-tab title="商品"
               name="goods">
        <van-image class="goods-img"
                   fit="cover"
                   :src="goods.mainPic">
          <template v-slot:loading>
            <van-loading type="spinner"
                         size="100" />
          </template>
        </van-image>
        <!-- <van-image class="goods-img"
                   fit="cover"
                   :src="goods.mainPic" /> -->
      </van-tab>
      <van-tab title="评价"
               name="common">
        评价
      </van-tab>
      <van-tab title="详情"
               name="detail">
        详情
      </van-tab>
      <van-tab title="推荐"
               name="recommend">
        推荐
      </van-tab>
      <div slot="nav-left"
           class="wap-nav-placeholder"></div>
      <div slot="nav-left"
           class="wap-nav-wrap"
           @click="$router.back()">
        <van-icon name="arrow-left" />
      </div>
      <div slot="nav-right"
           class="wap-nav-placeholder"></div>
      <div slot="nav-right"
           class="wap-nav-wrap">
        <van-icon name="ellipsis" />
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getGoodsDetails, getSimilerGoods } from '@/api/goods'

export default {
  name: 'Goods',
  props: {},
  components: {},
  data () {
    return {
      activeName: 'goods',
      goods: {},
      showTopNav: true
    }
  },

  computed: {},

  created () {
    window.addEventListener('scroll', this.handleScroll)
    this.loadGoodsDetails()
    console.log(this.buyRecords)
  },

  mounted () { },

  methods: {
    async loadGoodsDetails () {
      // console.log(this.$route)
      const params = this.$route.params
      const { data } = await getGoodsDetails(params)
      this.goods = data.data
      const similer = await getSimilerGoods({ id: this.$route.params.id })
      console.log(data)
      console.log(similer)
    },
    onClickLeft () {
      this.$toast('返回')
    },
    onClickRight () {
      this.$toast('按钮')
    },
    handleScroll () {
      const top = document.documentElement.scrollTop
      if (top > 66) {
        this.showTopNav = false
        // document.getElementsByClassName('van-tabs')[0].firstElementChild.style.display = 'block'
        let opacity = top / 52
        opacity = opacity > 1 ? 1 : opacity
        // document.getElementsByClassName('van-tabs')[0].firstElementChild.style.opacity = opacity
        // document.getElementsByClassName('van-sticky--fixed')[0].style.opacity = opacity
        console.log(document.getElementsByClassName('van-sticky--fixed')[0].style.opacity)
      } else {
        this.showTopNav = true
        const opacity = top / 44
        // opacity = opacity > 1 ? 1 : opacity
        // document.getElementsByClassName('van-tabs')[0].firstElementChild.style.opacity = opacity
        // document.getElementsByClassName('van-tabs')[0].firstElementChild.style.display = 'block'
        document.getElementsByClassName('van-sticky--fixed')[0].style.opacity = opacity
      }
      console.log(document.documentElement.scrollTop)
    }
  },

  watch: {
  }

}

</script>
<style lang='less' scoped>
.goods-container {
  .top-nav {
    width: 100%;
    height: 46px;
    padding: 0 10px;
    box-sizing: border-box;
    position: fixed;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    .back,
    .more {
      width: 30px;
      height: 30px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 50%;
      font-size: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  /deep/ .van-tabs {
    top: -44px;
    & > div:first-child {
      .van-sticky--fixed {
        opacity: 0;
      }
    }
    .wap-nav-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      padding: 0 10px;
    }
  }
  /deep/ .van-tab__pane,
  .van-tab__pane-wrapper {
    height: 600px;
  }
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .goods-img {
    .van-image__img {
      width: 100%;
    }
  }
  // /deep/.van-notice-bar {
  //   width: 60%;
  //   height: 25px;
  //   top: -50px;
  //   background-color: rgba(0, 0, 0, 0.4);
  //   color: #fff;
  //   margin-left: 15px;
  //   border-radius: 10px;
  // }
  // .notice-swipe {
  //   height: 40px;
  //   line-height: 40px;
  // }
}
</style>
