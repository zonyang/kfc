<template>
  <div class="list-view" ref="wrapper">
    <ul ref="group" class="group" @touchstart="groupStart" @touchmove="groupMove">
      <li class="list-group" v-for="(group,index) in data" :key="index" ref="listGroup">
        <h2 class="list-group-title">
          {{group.title}}
        </h2>
        <ul>
          <li class="list-group-item" v-for="(item,index) in group.list" :key="index" @click="selectItem(item)">
            <img :src="item.avater" class="avatar"/>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="touchStart" @touchmove="touchMove">
      <ul>
        <li v-for="(item,index) in shortcutList" :key="index" class="item"
            :class="{'active': currentIndex === index}"
            :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {handleData} from 'common/js/dom'

const ANCHOR_HEIGHT = 18
export default {
  data() {
    return {
      // shortcutList: [],
      currentIndex: 0
    }
  },
  name: 'ListView',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.caculateHeight()
      }, 20)
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    caculateHeight() {
      this.height = []
      let height = 0
      this.height.push(height)
      const group = this.$refs.listGroup
      for (let i = 0; i < group.length; i++) {
        height += group[i].clientHeight
        this.height.push(height)
      }
      // console.log(this.height)
    },
    groupStart(e) {
      this.groupFirst = e.touches[0].pageY
      this.groupTop = this.$refs.group.offsetTop
    },
    groupMove(e) {
      this.groupSecond = e.touches[0].pageY
      var bottom = this.height[this.height.length - 1] - this.$refs.wrapper.clientHeight
      var move = this.groupTop + this.groupSecond - this.groupFirst
      if (move > 0) {
        move = 0
      } else if (-move > bottom) {
        move = -bottom
      }
      this.$refs.group.style.top = move + 'px'
      for (let i = 0; i < this.height.length; i++) {
        if (-this.$refs.group.offsetTop > this.height[i] && -this.$refs.group.offsetTop < this.height[i + 1]) {
          this.currentIndex = i
        }
      }
    },
    touchStart(e) {
      this.firstIndex = handleData(e.target, 'index')
      this.firstTop = e.touches[0].pageY
      this._scroll(parseInt(this.firstIndex))
    },
    touchMove(e) {
      this.sencondTop = e.touches[0].pageY
      let moveIndex = -((this.firstTop - this.sencondTop) / ANCHOR_HEIGHT) | 0
      let index = moveIndex + parseInt(this.firstIndex)
      this._scroll(index)
    },
    _scroll(index) {
      if (index <= 0) {
        index = 0
      } else if (index > this.height.length - 2) {
        index = this.height.length - 2
      }
      this.currentIndex = index
      let top = this.height[index]
      this.$refs.group.style.top = -top + 'px'
    }
    // touchEnd(e) {
    //   this.endTop = e.touches[0].pageY
    //   let moveTop = this.firstTop - this.endTop
    //   console.log(moveTop)
    // }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl";
  @import "~common/stylus/variable.styl";
  .list-view
    position: relative
    width: 100%
    height: 100%
    background: $color-background
    overflow: hidden
    .group
      position: absolute
      width: 100%
      /*height: 100%*/
      .list-group
        padding-bottom: 30px
        .list-group-title
          height: 30px
          line-height: 30px
          padding-left: 20px
          font-size: $font-size-small
          color: $color-theme
          background: $color-dialog-background
        .list-group-item
          display: flex
          align-items: center
          padding: 20px 0 0 30px
          .avatar
            /*vertical-align: middle*/
            width: 50px
            height: 50px
            border-radius: 50%
          .name
            margin-left: 20px
            color: $color-text-l
            font-size: $font-size-medium
    .list-shortcut
      position: absolute
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.active
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background

    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
