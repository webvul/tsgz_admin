<template>
  <el-dialog
    size="middle"
    custom-class="deleteDialog"
    :visible.sync="dialog"
    :show-close="false"
    :close-on-click-modal="false"
    @close="close"

  >
    <div class="header">
    </div>
    <div class="contentBody"><i class="el-icon-warning"></i>{{content}}</div>
    <div class="footer">
       <div class="left" @click="handleSubmit" v-touch-ripple>
         <i class=" icon iconfont icon-gou" style="padding-right:7px;"></i>
         <span>确认</span>
       </div>
      <div class="right" @click="handleCancle" v-touch-ripple>
        <i style="padding-right:7px;" class="icon iconfont icon-guanbi1"></i>
        <span>取消</span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        props:['dialog','title','content'],
      methods:{
        handleCancle(){
            this.$emit('cancle')
        },
        handleSubmit(){
          this.$emit('submit')
        },
        mounted(){
          this.$nextTick(()=>{
            $('.el-dialog__wrapper').click(()=>{
                alert('click');
            })
          })
        },
        close(){
          return this.$emit('cancle')
        }
      }
    }

</script>

<style lang="scss">
  .deleteDialog{
    .el-dialog__header{
      padding:0;
      margin:0;
    }
    .el-dialog__body{
      padding:0
    }
    .header{
      position:relative;
      width:100%;
      height:3px;
      background: #00a9f1;
    }
    .contentBody{
      width:350px;
      height:150px;
      line-height: 150px;
      text-align: center;
    }
    .footer{
      width:100%;
      height:32px;
      cursor: pointer;
      white-space: nowrap;
      .left{
        float:left;
        height:32px;
        line-height: 32px;
        text-align: center;
        width:50%;
        background:#00a9f1;
        color:#fff;
        font-size:12px;
        border:none;
        position:relative;
        bottom:-1px;
    }
      .right{
        float:right;
        height:32px;
        position: relative;
        left:-3px;
        display: inline-block;
        line-height: 32px;
        text-align: center;
        width:50%;
        background:#fff;
        color:#666;
        font-size:12px;
        border:none;
        border-top:1px solid #d9d9d9;
        bottom:-1px;
      }
    }
    .el-icon-warning{
      color:#F7BA2A;
      font-size:30px;
      vertical-align: middle;
      padding-right:10px;
    }
  }
</style>
