<template>
  <div class="recommend">
    <div class="slider-wrapper" v-if="recommend.length">
      <slider>
        <li v-for="(item, index) in recommend" :key="index">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" alt="slider">
          </a>
        </li>
      </slider>
    </div>
    <div v-if="songList.length" class="song-list">
      <h1 class="list-title">热门歌单推荐</h1>
      <ul class="list-content">
        <li v-for="(item, index) in  songList" :key="index"  class="item">
          <div class="icon">
            <img width="60" height="60" :src="item.imgurl">
          </div>
          <div class="text">
            <h2 class="name" v-html="item.creator.name"></h2>
            <p class="desc" v-html="item.dissname">item.dissname</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend, getSongList} from 'api/recommend'
import Slider from 'base/slider/slider'

const ERR_OK = 0
export default {
  name: '',
  data() {
    return {
      recommend: [],
      loop: true,
      songList: []
    }
  },
  created() {
    this._getRecommend()
    this._getSongList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommend = res.data.slider
        }
      })
    },
    _getSongList() {
      getSongList().then((res) => {
        if (res.code === ERR_OK) {
          this.songList = res.data.list
          console.log(this.songList)
          //   this.recommend = res.data.slider
        }
      })
    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl";
  @import "~common/stylus/variable.styl";
  .recommend
    .song-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .list-content
        padding: 0
        .item
          display: flex
          box-sizing: border-box
          padding: 0 20px 20px 20px
          align-items: center
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
           //   color: $color-text
       //     .desc
           //   color: $color-text-d
  ///*.recommend*/
  /*.slider-wrapper*/
  /*position relative*/
  /*width: 100%*/
  /*height: 0*/
  /*padding-top: 40%*/
  /*overflow: hidden*/
  /*.slider-content*/
  /*position: absolute*/
  /*top: 0*/
  /*left: 0*/
  /*width: 100%*/
  /*height: 100%*/
  /*.slider-item*/
  /*width: 100%*/
  /*height: 100%*/
  /*float: left*/
  /*a*/
  /*width: 100%*/
  /*display: block*/
  /*img*/
  /*width: 100%*/
</style>
