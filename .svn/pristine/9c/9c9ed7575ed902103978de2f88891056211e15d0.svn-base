<template>
  <div>
    <el-col :span="24" class="breadcrumb-container">
      <div>
         <span v-for="item,key in $route.matched" :key="item.path">{{ item.name }}
          <i class="el-icon-arrow-right" style="color:#999" v-if="key+1<$route.matched.length"></i>
         </span>
      </div>
    </el-col>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {

  },
    computed: mapState(['sidebar'])
}
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/style.scss";
  .breadcrumb-container{
    font-size: 0.18rem;
    display: flex;
    justify-content: space-between;
    height:5vh;
    align-items: center;
    /*border-bottom:1px solid #ddd;*/
    padding: 0 0.12rem;
    box-shadow: 1px 1px 1px #ddd;
  }
</style>
