<template>
  <section class="appmain">
    <!-- 面包屑 -->
      <levelbar></levelbar>
      <transition name="fade" mode="out-in">
        <router-view :key="key"></router-view>
      </transition>
  </section>
</template>

<script>
    import Levelbar from './levelbar.vue';
    export default {
        name: 'AppMain',
        components: {
            Levelbar,

        },
        mounted() {
        },
        methods:{

        },
        computed: {
            key() {
                return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
            }
        }
    }
</script>
<style lang="scss">
  .appmain{
      flex:1;
    width:100%;
    min-width: 900px;
      overflow: hidden;
    display: flex;
    flex-flow: column;
  }
</style>