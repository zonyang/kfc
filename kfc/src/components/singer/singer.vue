<template>
  <div class="singer">
    <list-view :data="singers" @select="selectSinger"></list-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {getSingers} from 'api/singer'
import Singer from 'common/js/singer'
import ListView from 'base/listView/listView'
import {mapMutations} from 'vuex'
const ERR_OK = 0

export default {
  name: 'singer',
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingers()
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSingers(singer)
    },
    _getSingers() {
      getSingers().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._initSingers(res.data.list)
        }
      })
    },
    _initSingers(singers) {
      let map = {
        hot: {
          title: '热门',
          list: []
        }
      }
      singers.forEach(function (item, index) {
        if (index < 20) {
          map.hot.list.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        let key = item.Findex
        if (/[a-zA-Z]/.test(key)) {
          if (!map[key]) {
            map[key] = {
              title: key,
              list: []
            }
          }
          map[key].list.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
      })
      let hots = []
      let ret = []
      for (let k in map) {
        if (/[a-zA-Z]/.test(map[k].title)) {
          ret.push(map[k])
        } else {
          hots.push(map[k])
        }
      }
      ret.sort(function (x, y) {
        return x.title.charCodeAt(0) - y.title.charCodeAt(0)
      })
      return hots.concat(ret)
    },
    ...mapMutations({
      setSingers: 'SET_SINGERS'
    })
  },
  components: {
    ListView
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl";
  @import "~common/stylus/variable.styl";
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
