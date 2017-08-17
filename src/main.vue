<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
      return{
        screenHeight: document.body.clientHeight
      }
  },
  mounted(){
    let that = this;
    that.$store.state.screenHeight=$(window).height();
    window.onresize = () => {
      return (() => {
        window.screenHeight = $(window).height();
        that.screenHeight = window.screenHeight
      })()
    }
  },
  watch: {
    screenHeight (val) {
      if (!this.timer) {
        this.screenHeight = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
            //获取窗口自适应
            that.$store.state.screenHeight=that.screenHeight;
          that.timer = false
        }, 100)
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" >

</style>
