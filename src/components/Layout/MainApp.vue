<template>
  <section class="appmain">
    <!-- 面包屑 -->
      <router-view :key="key"></router-view>
  </section>
</template>

<script>

    export default {
        name: 'AppMain',
      data(){
        return{
          dialogVisible:false
        }
      },

        components: {


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
    width:100%;
    height:100%;
    min-width: 900px;
    overflow: hidden;
  }
</style>
