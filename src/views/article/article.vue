<template>
  <div class='article-container'>
    <van-nav-bar title="文章详情"
                 class="app-nav-bar"
                 @click-left="$router.back()"
                 left-arrow />
    <h1 class="title">{{article.title}}</h1>
    <van-cell center
              class="user-info">
      <div slot="title"
           class="name">{{article.aut_name}}</div>
      <van-image slot="icon"
                 class="avatar"
                 round
                 width="35"
                 height="35"
                 :src="article.aut_photo" />
      <div slot="label"
           class="pubdate">{{article.pubdate | relativeTime}}</div>
      <van-button :type="article.is_followed?'default':'danger'"
                  class="follow-btn"
                  round
                  :icon="article.is_followed?'':'plus'"
                  size="small"
                  :loading="isFollowLoading"
                  @click="onFollow">{{article.is_followed?'已关注':'关注'}}</van-button>
    </van-cell>
    <div class="markdown-body"
         v-html="article.content"
         ref="article-conten">
    </div>
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'Article',
  props: {
    // 路由传递过来的参数
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  },
  components: {},
  data () {
    return {
      article: {},
      isFollowLoading: false
    }
  },

  computed: {},

  created () {
    this.loadArticleDetail()
  },

  mounted () { },

  methods: {
    async loadArticleDetail () {
      const { data } = await getArticleById(this.articleId)
      console.log(data)
      this.article = data.data
      // 获取文章DOM容器

      // 数据改变影响视图更新（操作dom）不是立即的
      // 所以如果需要在修改数据之后马上操作该数据影响的视图dom，
      // 需要把代码放到$nextTick中
      // 得到所有img标签
      this.$nextTick(() => {
        this.handlePreviewImage()
      })

      // 循环img列表，给img注册点击事件
      // 在事件处理函数中调用 ImagePreview()
    },
    handlePreviewImage () {
      const articleContent = this.$refs['article-conten']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    },
    async onFollow () {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        // 已经关注就取消关注
        await deleteFollow(this.article.aut_id)
        // this.article.is_followed = false
      } else {
        // 未关注就添加关注
        await addFollow(this.article.aut_id)
        // this.article.is_followed = true
      }
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.article-container {
  .title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    margin: 0;
    background-color: #fff;
  }
  .user-info {
    .avatar {
      width: 35px;
      height: 35px;
      margin-right: 8px;
      border: 1px solid #fff;
    }
    .name {
      font-size: 12px;
      color: #333;
    }
    .pubdata {
      font-size: 11px;
      color: #b4b4b4;
    }
    .follow-btn {
      width: 85px;
      height: 29px;
    }
  }
  .markdown-body {
    padding: 14px;
    background-color: #fff;
  }
}
</style>
