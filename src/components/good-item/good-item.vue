<template>
  <div class='good-item-container'>
    <van-cell class="product-card"
              :to="{
         name:'goods',
         params:{id:goods.id,goodsId:goods.goodsId}
       }">
      <div @click="selectItem(goods)">
        <div class="img-wrap">
          <img :src="goods.mainPic" />
        </div>
        <div class="product-des">
          <h3 class="product-title">
            <span v-if="goods.shopType===0"
                  class="icon icon-taobao"
                  style="color:#ff4200"></span>
            <span else="item.shopType===1"
                  class="icon icon-tianmao"
                  style="color:#ff104d"></span>
            {{goods.title}}
          </h3>
          <p class="price">
            <span>券后&nbsp;</span>
            <span class="RMB">￥</span>
            <span class="price-num">{{goods.actualPrice}}</span>
          </p>
          <p class="label-box">
            <span class="label label1"
                  v-if="goods.labelTwo">{{goods.labelTwo}}</span>
            <span class="label label2"
                  v-if="goods.labelOne">{{goods.labelOne}}</span>
            <span class="juan">
              <span>劵</span>
              {{goods.couponPrice}}元
            </span>
          </p>
          <p class="salse">
            <span>30天销量{{goods.monthSales | digitalConversion}}</span>
            <!-- <span>{{goods.desc}}</span> -->
          </p>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>

export default {
  name: 'good-item',
  props: {
    goods: {
      type: Object,
      required: true
    }
  },
  components: {},
  data () {
    return {

    }
  },
  filters: {
    digitalConversion: function (num) {
      if (num > 999) {
        let value = num / 10000
        value = value.toFixed(1)
        return `${value}万`
      } else {
        return num
      }
    }
  },
  computed: {},

  created () {
    console.log(this.goods)
  },

  mounted () { },

  methods: {
    selectItem (item) {
      console.log(item)
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.good-item-container {
  .product-card {
    width: 100%;
    overflow: hidden;
    margin-top: 10px;
    background: #fff;
    border-radius: 5px;
    padding: 0;
    .img-wrap {
      img {
        width: 100%;
        border-radius: 5px;
      }
    }
    .product-des {
      padding: 6px 9px 9px 10px;
      box-sizing: border-box;
      margin: 0 !important;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .icon {
        padding-right: 3px;
      }
      .product-title {
        font-size: 14px;
        font-weight: 400;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 26px;
        padding-right: 7px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin-top: 1px;
        /**
        限制在一个块元素显示的文本的行数。
        -webkit-line-clamp 是一个 不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。
        为了实现该效果，它需要组合其他外来的WebKit属性。常见结合属性：
        display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
        -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
        text-overflow，可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。
        **/
        margin-bottom: 1px;
      }
      .price {
        font-size: 10px;
        font-weight: 400;
        color: #666;
        margin-top: 1px;
        margin-bottom: -1px;
        display: flex;
        align-items: baseline;
        vertical-align: text-bottom;
        .RMB {
          font-size: 12px;
          font-weight: 500;
          color: #ff2b22;
          margin-left: 1px;
        }
        .price-num {
          font-size: 19px;
          font-weight: 500;
          color: #ff2b22;
        }
      }
      .label-box {
        margin: 1px 0;
        .label {
          height: 15px;
          border-radius: 3px;
          border: 1px solid;
          font-size: 18px;
          font-weight: 400;
          color: #ff0137;
          padding: 0 3px;
          margin-right: 3px;
          display: inline-block;
          vertical-align: middle;
        }
        .label.label1 {
          border-color: rgba(255, 1, 55, 0.55);
          color: #ff0137;
        }
        .label.label2 {
          border-color: rgba(245, 114, 36, 0.7);
          color: #f57223;
        }
        .juan {
          height: 14px;
          background: linear-gradient(90deg, #ff8873 0, #ff4f4f 100%);
          border-radius: 2px;
          padding: 0 5px 0 1px;
          font-size: 9.5px;
          font-weight: 400;
          color: #fff;
          line-height: 14px;
          display: inline-block;
          position: relative;
          z-index: 1;
          zoom: 1;
          top: 0;
          vertical-align: middle;
          span {
            background: #fff;
            border-radius: 1px 0 0 1px;
            font-size: 10px;
            color: #fe3a33;
            margin: auto 5px auto 0;
            min-width: 12px;
            max-width: 12px;
            min-height: 12px;
            max-height: 12px;
            display: inline-block;
            line-height: 12px;
            text-align: center;
            vertical-align: middle;
          }
        }
      }
      .salse {
        margin: 0;
        span {
          font-size: 14px;
          font-weight: 400;
          color: #888;
        }
        span:nth-child(2)::before {
          content: "";
          width: 2px;
          background: #888;
          margin: 0 1px;
          display: inline-block;
          height: 16px;
          position: relative;
          z-index: 1;
          zoom: 1;
          top: 2px;
        }
      }
    }
  }
}
</style>
