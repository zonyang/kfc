<template>
  <div id="app">
    <mHeader></mHeader>
    <Tab></Tab>
    <!--<keep-alive>-->
      <router-view/>
    <!--</keep-alive>-->
  </div>
</template>

<script type="text/ecmascript-6">
import mHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'

export default {
  name: 'App',
  components: {
    mHeader, Tab
  }
}
</script>

<style>
  /*#app {*/
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  /*}*/
</style>
