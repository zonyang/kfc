<template>
  <div class="slider">
    <ul class="slider-content" ref="sliderContent">
      <slot></slot>
    </ul>
    <ul class="dots">
      <li class="dot" v-for="(item, i) in dots" :key="i" :class="{active: item === index}"></li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import {addClass} from 'common/js/dom'
import throttle from 'common/js/throttle'

export default {
  name: 'slider',
  data() {
    return {
      index: 1,
      dots: []
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    calSliderContent() {
      this.wrapper = this.$refs.sliderContent
      this.wrapper.imgWidth = this.wrapper.offsetWidth
      this.children = this.wrapper.children
      this.length = this.children.length
      let totalWidth = this.wrapper.imgWidth * this.length
      if (this.loop) {
        totalWidth += this.wrapper.imgWidth * 2
        this._setSlide()
        this.length += 2
      }
      this.wrapper.style.width = totalWidth + 'px'
      for (let i = 0; i < this.length; i++) {
        if (i !== 0 && i !== this.length - 1) {
          this.dots.push(i)
        }
        addClass(this.children[i], 'slider-item')
        this.children[i].style.width = this.wrapper.imgWidth + 'px'
      }
      this.wrapper.style.left = -this.wrapper.imgWidth * 1 + 'px'
    },
    _setSlide() {
      const firstChild = this.children[0].children[0]
      const lastChild = this.children[4].children[0]
      let firstEle = this._setImg(firstChild)
      let lastEle = this._setImg(lastChild)
      this.wrapper.insertBefore(lastEle, this.children[0])
      this.wrapper.appendChild(firstEle)
    },
    _setImg(ele) {
      let li = document.createElement('li')
      let a = document.createElement('a')
      let img = document.createElement('img')
      li.classList.add('slider-item')
      a.setAttribute('href', ele.href)
      img.setAttribute('src', ele.children[0].src)
      li.appendChild(a)
      a.appendChild(img)
      return li
    },
    touchEvent() {
      const that = this
      this.wrapper.ontouchstart = function (e) {
        clearTimeout(this.timer)
        let firstX = e.targetTouches[0].pageX
        let firstLeft = parseInt(this.style.left)
        this.ontouchmove = throttle(this, function (e) {
          this.offsetX = e.targetTouches[0].pageX - firstX
          this.style.left = (firstLeft + this.offsetX) + 'px'
          // e.preventDefault()
        }, 50)
        this.ontouchend = function () {
          clearTimeout(this.time)
          this.ontouchmove = null
          if (Math.abs(this.offsetX) >= this.imgWidth / 2) {
            if (this.offsetX > 0) {
              that.index -= 2
            }
            that._slider()
            that.autoPlay()
          } else {
            that.index--
            that._slider()
            that.autoPlay()
          }
          this.ontouchend = null
          this.style.left = -this.imgWidth * that.index + 'px'
        }
      }
    },
    autoPlay() {
      this.wrapper.timer = setInterval(this._slider, 1000)
    },
    _slider() {
      this.index++
      if (this.index > this.length - 2) {
        this.index = 1
      }
      if (this.index < 1) {
        this.index = this.length - 2
      }
      this.wrapper.style.left = -this.wrapper.imgWidth * this.index + 'px'
    }
  },
  mounted() {
    setTimeout(() => {
      this.calSliderContent()
      this.autoPlay()
      this.touchEvent()
    }, 20)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl";
  @import "~common/stylus/variable.styl";
  .slider
    position relative
    width: 100%
    height: 0
    padding-top: 40%
    overflow: hidden
    .slider-content
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      .slider-item
        width: 100%
        height: 100%
        float: left
        a
          width: 100%
          display: block
          img
            width: 100%
    .dots
      position: absolute
      bottom: 12px
      left: 0
      right: 0
      font-size: 0
      transform: translateZ(1px)
      text-align: center
      .dot
        /*float: left*/
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
