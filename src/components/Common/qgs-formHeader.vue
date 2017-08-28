<template>
  <div class="header_form_container">
    <div class="headerButton">
      <el-button type="primary" size="small" @click="addList" v-touch-ripple><i class=" icon iconfont icon-xinzeng"></i>新增</el-button>
      <el-button type="danger" size="small" @click="deleteList" v-touch-ripple><i class=" icon iconfont icon-delete"></i>批量删除</el-button>
      <el-button type="primary" size="small" @click="down" v-touch-ripple><i class=" icon iconfont icon-xiazai"></i>下载导入</el-button>
    </div>
    <div class="headerForm">
      <el-input
        placeholder="请输入名称或者编码"
        v-model="val"
        @keyup.enter.native="handleIconClick"
        >
      </el-input>
      <el-button  @click="handleIconClick" style="position:relative;top:-1px;">
        <i class=" icon iconfont icon-search"></i>
        查询
      </el-button>
    </div>
    <qgsDialog
      :dialog="dialogTableVisible"
      @cancle="dialogTableVisible=false"
      :title="'商品导入'"
      @submit="submit"
    >
    <div class="diaglog_body">
      <p style="text-align: left;text-indent:6%">由于系统上传文件格式需要固定，所以导入前请先下载模版！</p>
      <div class="down" @click="handleDown">
        <i class="icon iconfont icon-EXCEL" style="font-size:28px;color:#22bf98"></i>
        <span><i style="color:#00a9f1">湖北自贸区商品集中审单导入模版</i>
          <span style="color:#a4a4a4">.excell</span></span>
        <i class="icon iconfont icon-xiazai" style="font-size:20px;color:#00a9f1"></i>
      </div>
      <p>请填写好模版
        <!--<el-button>-->
          <!--<i class="icon iconfont icon-export"></i>-->
          <!--导入-->
        <!--</el-button>-->
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="$store.state.prefix+'hb-fta-mgmt/api/website/goods/mgmt/Excel/importFile?token='+token+'&type='+type"
          :show-file-list="false"
          style="display: inline-block"
          :on-success="handleAvatarSuccess"
          :multiple="false"
          :auto-upload="true"
          :before-upload="beforeAvatarUpload"
        >
          <el-button slot="trigger" size="small"><i class="icon iconfont icon-export"></i> 导入</el-button>

        </el-upload>
      </p>
      <div  class="text_danger"><span v-if="isXlsx">请上传正确的文件格式</span></div>
    </div>
    </qgsDialog>
    <qgsDeleteDialog
      :dialog="dialogDeleteVisible"
      :content="'确认删除该商品吗'"
      @cancle="dialogDeleteVisible=false"
      @submit="submitDelete"
    >

    </qgsDeleteDialog>
  </div>
</template>

<script>
  import qgsDialog  from './qgs-dialog.vue'
  import qgsDeleteDialog  from './qgs-delete-dialog'
  import AJAX from '@/assets/js/ajax';
  export default {
    props: ['formValue','type'],
    components:{
      qgsDialog,
      qgsDeleteDialog
    },
    created(){
       this.val=this.formValue
    },
    data(){
      return {
        dialogTableVisible:false,
        dialogDeleteVisible:false,
        token:JSON.parse(sessionStorage.getItem('Token')),
        isXlsx:false,
      }
    },
    methods: {
      handleIconClick(){
        this.$emit('search',this.val)
      },
      addList(){
          this.$emit("add")
      },
      deleteList(){
        this.dialogDeleteVisible=true;
      },
      down(){
          this.isXlsx=false;
         this.dialogTableVisible=true;
//         this.$emit("upload")
      },
      handleDown(){
          window.location.href=this.$store.state.prefix+"hb-fta-mgmt/api/website/goods/mgmt/Excel/downloadTemplate?type="+this.type+"&token="+this.token
      },
      handleAvatarSuccess(res, file){
          if(file){
            this.dialogTableVisible=false;
            this.$emit('refresh');
          }
      },
      beforeAvatarUpload(file){
        const isEXCELL = file.name.split('.')[1] === 'xlsx';
        if(!isEXCELL) this.isXlsx=true;
        else this.isXlsx=false;
        return isEXCELL
      },
      importFile(){

      },
      //提交弹窗
      submit(){
          alert(`tijiao`)
      },
      submitDelete(){
        this.dialogDeleteVisible=false;
        this.$emit("deleted")
      }
    }
  }

</script>

<style lang="scss">
  .header_form_container {
    height: 50px;
    line-height: 50px;
    .headerButton {
      float: left;
      height: 50px;
      line-height: 50px;
      i{
        font-size:12px;
        padding-right:6px;
      }
    }
    .headerForm {
      line-height: 50px;
      margin-right:20px;
      float: right;
      .el-input{
        width:240px;

        .el-input__inner{
          height:32px;
          border-radius:0 !important;
        }
      }
      .el-button{
        height:32px !important;
        background:#9fd8fb !important;
        color:#fff;
        font-size:12px;
        i{
          font-size:12px;
        }
      }
    }
    .el-button{
      padding:0 20px;
      height:32px;
      border:none;
      background:#9fd8fb;
      border-radius: 0;
      &:nth-child(1){
        background:#92dba2;
        margin-left:10px;
      }
      &:nth-last-child(1){
        background:#b191d3;
        margin-right:20px;
      }
    }
    .diaglog_body{
      width:100%;
      padding: 10px 0 10px;
      text-align: center;
      p{
        line-height: 20px;
        margin:10px 10%;
        width:80%;
        color:#424242;
      }
      .down{
        cursor: pointer;
        height:40px;
        line-height:40px;
        i:nth-child(1){
          vertical-align: middle;
        }
        i:nth-last-child(1){
          padding-left:10px;
        }
      }
      .el-button{
         background:#b191d3;
        color:#fff;
      }
    }
    .text_danger{
      text-align: left;
      color:red;
      text-indent: 30px;
    }

  }

</style>
