<template>
    <section class="page">
       <div v-if="loadding"> 编辑内容 </div>
        <loadding v-else/>
    </section>
</template>

<script>
  import loadding from './components/loadding/loadding.vue'
export default {
  data () {
      return{
          loadding:true, //为true显示加载动画 为false显示页面
      }
  },
  components: {
      loadding
  },
  methods: {

  }
}
</script>

<!--使用sass语法进行编译样式-->
<style lang="scss" scoped>
  @import "./assets/css/style";
  .mainContainer{
    line-height:0;
    background-color: $color1;

  }
</style>
