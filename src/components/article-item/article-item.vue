<template>
  <van-cell class="article-item">
    <div slot="title"
         class="title van-multi-ellipsis--l3">{{article.title}}{{article.title}}{{article.title}}</div>
    <div slot="label">
      <div class="cover-wrap"
           v-if="article.cover.type===3">
        <div class="cover-wrap-item"
             v-for="img in article.cover.images"
             :key="img">
          <van-image class="cover-item"
                     fit="cover"
                     :src="img" />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <!-- <div slot="default">hello</div> -->
    <van-image v-if="article.cover.type===1"
               class="right-cover"
               :src="article.cover.images[0]" />
  </van-cell>
</template>

<script>

export default {
  name: 'articleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
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
.article-item {
  .title {
    font-size: 16px;
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
    fit: cover;
  }
  /*  处理三张封面图*/
  .cover-wrap {
    padding: 15px 0;
    display: flex;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item {
        width: 100%;
        height: 73px;
      }
    }
  }
  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
  }
  .label-wrap span {
    margin-right: 12px;
  }
}
</style>
