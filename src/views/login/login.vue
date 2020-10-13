<template>
  <div class='container'>
    <van-nav-bar title="登录/注册"
                 class="app-nav-bar"
                 @click-left="$router.back()"
                 left-arrow />
    <van-form @submit="onLogin"
              :show-error="false"
              :show-error-message="false"
              validate-first
              ref="login-form"
              @failed="onFailed">
      <van-field v-model="user.mobile"
                 center
                 icon-prefix="icon"
                 left-icon="shouji"
                 right-icon="warning-o"
                 name="mobile"
                 placeholder="请输入手机号"
                 :rules="formRules.mobile" />
      <van-field v-model="user.code"
                 center
                 icon-prefix="icon"
                 left-icon="yanzhengma"
                 name="code"
                 placeholder="请输入验证码"
                 :rules="formRules.code">
        <template #button>
          <van-count-down v-if="isCountDownShow"
                          :time="1000 * 60"
                          format="ss s"
                          @finish="isCountDownShow = false" />
          <!-- prevent阻止默认的表单提交行为 -->
          <van-button v-else
                      class="send-btn"
                      size="mini"
                      round
                      :loading='isSendSmsLoading'
                      @click.prevent="onSendSms"
                      color='linear-gradient(to bottom,#fe204a,#fe3b35)'
                      type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn"
                    @click="onLogin"
                    block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Login',
  props: {},
  components: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      /* 表单验证规则 */
      formRules: {
        mobile: [
          { required: true, message: '请输入正确内容' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入正确验证码' },
          { pattern: /^\d{6}$/, message: '验证码错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false // 发送验证码的loading状态
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  created () { },

  mounted () { },

  methods: {
    onSubmit () { },
    async onLogin () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        this.$toast.success('登录成功')
        /* 将后端返回的用户登录状态放到vuex中 */
        // console.log(data)
        this.setUser(data.data)
        /* 有缺点 */
        this.$router.back()
      } catch (error) {
        Toast.fail('登录失败')
      }
    },
    /* 表单验证失败 */
    onFailed (err) {
      if (err.errors[0]) {
        this.$toast(
          {
            message: err.errors[0].message,
            position: 'top'
          }
        )
      }
      console.log(err)
    },
    async onSendSms () {
      try {
        // 校验手机号码
        await this.$refs['login-form'].validate('mobile')

        // 验证通过，请求发送验证码
        this.isSendSmsLoading = true // 展示按钮的 loading 状态，防止网络慢用户多次点击触发发送行为
        const res = await sendSms(this.user.mobile)
        console.log(res)

        // 短信发出去了,显示倒计时，关闭发送按钮
        this.isCountDownShow = true

        // 倒计时结束 -> 隐藏倒计时，显示发送按钮（监视倒计时的 finish 事件处理）
      } catch (err) {
        // try 里面任何代码的错误都会进入 catch
        // 不同的错误需要有不同的提示，那就需要判断了
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }

        // 提示用户
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
      this.isSendSmsLoading = false

      // 发送失败，显示发送按钮，关闭倒计时
      // this.isCountDownShow = false
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
  .send-btn {
    width: 76px;
    height: 23px;
  }

  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      border-radius: 15px;
      border: none;
      background-image: linear-gradient(to bottom, #fe204a, #fe3b35);
      .van-button__text {
        font-size: 15px;
        color: #fff;
      }
    }
  }
}
</style>
