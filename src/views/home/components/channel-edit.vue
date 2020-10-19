<template>
  <div class='channel-edit-container'>
    <van-cell center
              :border='false'>
      <div slot="title"
           class="channel-title">我的频道</div>
      <van-button type="danger"
                  plain
                  round
                  size="mini"
                  @click="isEdit= !isEdit">{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="grid-item"
                     :class="{active:index===active}"
                     :icon="(isEdit && index!==0)?'clear':''"
                     v-for="(channel,index) in userChannels"
                     :key="channel.id"
                     :text="channel.name"
                     @click="onUserChannelClick(index)" />
    </van-grid>
    <van-cell center
              :border='false'>
      <div slot="title"
           class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="grid-item"
                     v-for="channel in recommendChannels"
                     :key="channel.id"
                     :text="channel.name"
                     @click="onAdd(channel)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  components: {},
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },

  computed: {
    // 推荐的所有频道
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  },

  created () {
    this.loadAllChannels()
  },

  mounted () { },

  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      console.log(data)
      this.allChannels = data.data.channels
    },
    onAdd (channel) {
      this.userChannels.push(channel)
    },
    onUserChannelClick (index) {
      // 编辑状态，删除频道
      if (this.isEdit && index !== 0) {
        this.deleteChannel(index)
      } else {
        // 非编辑状态
        this.switchChannel(index)
      }
    },
    deleteChannel (index) {
      console.log('删除频道')
      // 如果删除当前频道之前的频道
      if (index <= this.active) {
        // 更新激活频道的索引
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
    },
    switchChannel (index) {
      console.log('切换频道')
      this.$emit('update-active', index)
      this.$emit('close')
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.channel-edit-container {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333333;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
