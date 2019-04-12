<template>
  <div class="singer-detail"></div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
export default {
  name: 'singerDetail',
  created() {
    console.log(this.getSingers())
  },
  methods: {
    ...mapGetters({
      getSingers: 'singers'
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/mixin.styl";
    @import "~common/stylus/variable.styl";
  .singer-detail
    width: 100%
    height: 100%
    z-index: 100
    background-color: rgba(57,57,57,0.85)
</style>
