<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
      return{
      }
  },

  methods: {

  }
}
</script>

<style lang="scss" >

</style>
