<template>
    <section class="page">
       <div v-if="loadding">
            <el-button @click="test">测试</el-button>
       </div>
        <loadding v-else/>
    </section>
</template>

<script>
  import loadding from './../../components/loadding/loadding.vue'
  //import test_npm_package_wang from 'test_npm_package_wang'
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
      test(){
        //var a= test_npm_package_wang({percent:50,amount:300});
       // alert(a);
      }
  }
}
</script>

<!--使用sass语法进行编译样式-->
<style lang="scss" scoped>
  @import "./../../assets/css/style";
  .mainContainer{
    line-height:0;
    background-color: $color1;

  }
</style>
