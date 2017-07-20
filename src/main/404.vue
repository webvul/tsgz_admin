<template>
  <div id="app">

    <h1>{{ msg }}</h1>
    <el-button @click.native="startHacking">Let's do it</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Use Vue 2.0 Today!'
    }
  },

  methods: {
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    $color: blue;
    $color2:pink;
    $nomalWidth:100px;
    $nomalHeight:100px;
    body{
      background:$color;
      img{
        width:$nomalWidth;
        height:$nomalHeight;
      }
      h1{
        background:$color2;
      }
    }
</style>
