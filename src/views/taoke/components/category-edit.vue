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
                     :icon="(isEdit && index!==0)?'clear':''"
                     v-for="(channel,index) in category"
                     :key="channel.cid"
                     :text="channel.cname"
                     @click="onUserChannelClick(index)" />
    </van-grid>
    <div v-for="channel in category"
         :key="channel.cid">
      <van-cell center
                :border='false'>
        <div slot="title"
             class="channel-title">{{channel.cname}}</div>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item class="grid-item"
                       v-for="subChannel in channel.subcategories"
                       :key="subChannel.subcid"
                       :text="subChannel.subcname"
                       @click="onAdd(subChannel)" />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'CategoryEdit',
  props: {
    category: {
      type: Array,
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
        return !this.category.find(cate => {
          return cate.id === channel.id
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
      this.userChannels.splice(index, 1)
    },
    switchChannel (index) {
      console.log('切换频道')
      this.$emit('click')
      this.$emit('update-active', index)
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
}
</style>
