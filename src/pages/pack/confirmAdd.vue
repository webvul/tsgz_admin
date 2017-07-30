

<template>
  <div class="page" ref="el">
    <div></div>
    <div>
      <el-form label-position="right" label-width="90px" class="ServiceTableForm">
        <el-form-item label="任务名称：">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="dabeList">
      <span v-for="item,key in $route.query.choList" :key="key"
            :title="item">
          <img src="./img/download.png" alt="" style="" />
          {{item}}
      </span>
    </div>
    <div class="footer">
      <el-button size="small">上一步</el-button>
      <div>
        <el-button type="primary" size="small">下一步</el-button>

      </div>
    </div>
  </div>
</template>

<script>
    import AJAX from './../../assets/js/ajax';
    export default {
        data() {
            return {
                msg:[],
                height:0,
                value:''
            }
        },
        computed:{

        },
        created(){


        },
        mounted(){

        },
        watch:{
            'value':'abc'
        },
        methods:{
            asdf(){
                alert(111);
            },
            abc(){
                console.log("sss")
            }
        },

    };
</script>

<style lang="scss" scoped>
.ServiceTableForm{
  width:400px;
  position:relative;
}
.dabeList{
  height:450px;
  width:95%;
  overflow-y: auto;
  padding:0 0.2rem;
  .span {
    cursor: pointer;
    border: 1px solid #ddd;
    margin-right: 1.9%;
    margin-top: 5px;
    display: inline-block;
    width: 10.1%;
    padding-right: 0.02rem;
    height: 25px;
    line-height: 25px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &.active {
      color: #fff;
    }
  }
    img {
      width: 16px;
      height: 16px;
      vertical-align: middle;
      margin: 0 4px;
    }
  }
.footer{
  margin-top:0.1rem;
  display: flex;
  justify-content: space-between;
  padding:0 20px 0 10px;
  width:100%;
  position:absolute;
  bottom:45px;
  span{
    color:#666;
  }
}
</style>
