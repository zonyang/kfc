<template>
  <div class="mHeader">
    <div class="icon"></div>
    <div class="text">Music</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'mHeader'
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl";
  @import "~common/stylus/variable.styl";
  .mHeader
    height: 44px;
    text-align center;
    color: $color-theme
    font-size: 0
    .icon
      bg-image("logo")
      margin-top: 6px
      margin-right: 9px
      background-size: 30px 32px
      width: 30px
      height: 32px
      display: inline-block
      vertical-align: top
    .text
      display: inline-block
      line-height: 44px
      font-size: $font-size-large
      vertical-align: top
      margin: 0

</style>
