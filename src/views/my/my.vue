<template>
  <div class='container'>
    <van-cell-group class="my-info"
                    v-if="user">
      <van-cell class="base-info"
                center
                :border="false">
        <van-image round
                   class="avatar"
                   slot="icon"
                   fit="cover"
                   :src="currentUser.photo" />
        <div slot="title"
             class="name">{{currentUser.name}}</div>
        <van-button size="small"
                    class="update-btn"
                    round>编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info"
                :border="false">
        <van-grid-item class="data-info-item">
          <div class="text-wrap"
               slot="text">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap"
               slot="text">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap"
               slot="text">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap"
               slot="text">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else
         class="not-login">
      <div @click="$router.push('/login')">
        <img class="mobile"
             src="./shouji.png">
      </div>
      <div class="text">登录/注册</div>
    </div>
    <van-grid :column-num="2"
              class="nav-grid mb-4">
      <van-grid-item icon="shoucang2"
                     class="nav-grid-item"
                     icon-prefix='icon'
                     text="收藏" />
      <van-grid-item icon="zuji"
                     class="nav-grid-item"
                     icon-prefix='icon'
                     text="足迹" />
    </van-grid>
    <van-cell title="URL 跳转"
              is-link
              to="/" />
    <van-cell title="路由跳转"
              class="mb-4"
              is-link
              to="/" />
    <van-cell class="logout-cell"
              v-if="user"
              @click="onLogout"
              title="退出登录" />

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getCurrentUser } from '@/api/user'
import { getCollectionList } from '@/api/goods'
export default {
  name: 'My',
  props: {},
  components: {},
  data () {
    return {
      currentUser: {}
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  created () {
    this.loadCurrentUser()
    this.loadCollectionList()
  },

  mounted () { },

  methods: {
    /* 加载收藏信息 */
    async loadCollectionList () {
      const params = {
        pageId: '1',
        cid: '1,2,3,4,5,6,7,8'
      }
      const { data } = await getCollectionList(params)
      console.log(data.data)
    },
    /* 加载当前用户信息 */
    async loadCurrentUser () {
      try {
        const { data } = await getCurrentUser()
        this.currentUser = data.data
      } catch (error) {

      }
    },
    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗?'
      })
        .then(() => {
          // on confirm
          // 清除用户登录状态
          this.setUser(null)
          // this.$store.commit('SET_USER', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    ...mapMutations({
      setUser: 'SET_USER'
    })
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.container {
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      padding-top: 38px;
      padding-bottom: 11px;
      height: 115px;
      background-color: unset;
      .avatar {
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        box-sizing: border-box;
        margin-right: 11px;
      }
      .name {
        color: #fff;
        font-size: 15px;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }

    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
  .not-login {
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .icon {
        font-size: 22px;
      }
      .icon-shoucang2 {
        color: #eb5253;
      }
      .icon-zuji {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
