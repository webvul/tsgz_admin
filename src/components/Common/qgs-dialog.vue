<template>
  <el-dialog
    size="middle"
    custom-class="dowmDialog"
    :visible.sync="dialog"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <div class="dialog-header">
      <span class="left">{{title}}</span>
      <span class="right">
        <i class=" icon iconfont icon-delete" style="font-size:14px;" @click="handleCancle"></i>
      </span>
    </div>
    <slot></slot>
    <div class="footer" v-if="!hideFooter">
      <div class="left" @click="handleSubmit">
        <i class=" icon iconfont icon-gou" style="padding-right:7px;"></i>
        <span>确认</span>
      </div>
      <div class="right" @click="handleCancle">
        <i style="padding-right:7px;" class="icon iconfont icon-guanbi1"></i>
        <span>取消</span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props:['dialog','title','hideFooter'],
    methods:{
      handleCancle(){
        this.$emit('cancle')
      },
      handleSubmit(){
        this.$emit('submit')
      },
    }
  }

</script>

<style lang="scss">
  .dowmDialog{
    .el-dialog__header{
      padding:0;
    }
    .el-dialog__body{
      padding:0
    }
    .dialog-header{
      width:100%;
      height:30px;
      border-bottom:2px solid #00a9f1;
      .left{
        display: inline-block;
        float:left;
        color:#00a9f1;
        height:30px;
        padding-left:10px;
        line-height: 30px;
        font-size: 14px;
        font-weight: bolder;
      }
      .right{
        display: inline-block;
        float:right;
        font-size: 14px;
        padding-right:10px;
        height:30px;
        padding-left:10px;
        line-height: 30px;
      }
    }
    .footer{
      width:100%;
      height:32px;
      white-space: nowrap;
      cursor: pointer;
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
  }
</style>
