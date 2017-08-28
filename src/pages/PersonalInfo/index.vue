<template>
  <div class="page">
    <div class="app-container">
      <header>
        <span>你本次登录地为 : {{ipMsg.cname}}</span>
        <span>IP:{{ipMsg.cip}}</span>
      </header>
      <section class="msg">
        <div class="left">
          <el-form label-position="right" label-width="100px" :model="user_msg" :rules="userFormRules" ref="userForm">
            <el-form-item label="用户名：">
              {{user_msg.loginName}}
            </el-form-item>
            <el-form-item label="昵称："  prop="name">
              <el-input v-model="user_msg.name"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
              <el-radio-group v-model="user_msg.sex">
                <el-radio label="0">男</el-radio>
                <el-radio label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="user_msg.email"></el-input>
            </el-form-item>
            <el-form-item label="电话：">
              <el-input v-model="user_msg.phone"></el-input>
            </el-form-item>
            <el-form-item label="手机：" prop="mobile">
              <el-input v-model="user_msg.mobile"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <el-form  label-width="100px">
            <el-form-item label="头像：" class="label_img">
              <div class="con">
                <!-- <img :src="dialogImageUrl" alt="用户头像" class="user_img">
                 <el-upload
                         action="http://127.0.0.1:8080/jad-saas-mgmt/api/website/upload"
                         class="el-button filter-item "
                         :on-preview="handlePictureCardPreview"
                         :on-success="handleSuccess"
                         style="border:none"
                         list-type="text"
                         :show-file-list="false"
                         :auto-upload="true"
                            >
                     <span>上传头像</span>
                 </el-upload>-->
                <el-upload
                  class="avatar-uploader"
                  :action="$store.state.prefix+'/jad-saas-mgmt/api/website/upload'"
                  :show-file-list="false"
                  :multiple="false"
                  :auto-upload="true"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="user_msg.photo" :src="dialogImageUrl" class="avatar">
                  <i  class="el-icon-plus avatar-uploader-icon" v-else></i>

                </el-upload>
              </div>

            </el-form-item>
            <el-form-item label="归属公司：">
              {{user_msg.company}}
            </el-form-item>
            <el-form-item label="归属部门：">
              中检杰德

            </el-form-item>
            <el-form-item label="用户类型：">
              无
            </el-form-item>
            <el-form-item label="用户角色：">
              系统管理员
            </el-form-item>
            <el-form-item label="备注：">
              <el-input v-model="user_msg.remarks"></el-input>
            </el-form-item>
          </el-form>

        </div>
      </section>
    </div>
    <footer>
      <el-button type="primary"  size="large" @click="submitForm" :disabled="editable" v-touch-ripple>
        <i class="el-icon-check"></i>
        提交</el-button>
    </footer>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
  import {IPAddress} from '../../utils';
  import AJAX from './../../assets/js/ajax';
  export default {
    data() {
      return {
        editable: false,
        ipMsg:'',
        userForm: {
          name: '',
          sex: ''
        },
        //用户信息规则
        userFormRules: {
          name: [
            {required: true, trigger: 'blur', message: '昵称不能为空！'},
            /*{required: true, trigger: 'blur', validator: validateOldPassword}*/
          ],
          sex: [
            {required: true, trigger: 'blur', message: "性别不能为空!"}
          ],
          mobile: [
            {required: true, trigger: 'blur', message: "手机不能为空!"}
          ],
        },
      }
    },
    computed: {...mapState(['user_msg','prefix']),
      dialogImageUrl(){
        return this.prefix+"/jad-saas-mgmt"+this.user_msg.photo;
      }
    },
    created() {
       this.ipMsg = IPAddress();
      this.getUserMsg(); //获取登录者的登录信息
    },
    methods: {
      ...mapActions(['getUserMsg','submitPersonInfo']),
      //提交表单
      submitForm() {
        let vm = this;
        vm.editable = true;
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            this.submitPersonInfo(vm);
          } else {
            vm.editable = false;
            console.log('error submit!!');
            return false;
          }
        });

      },
      handleAvatarSuccess(res, file) {
        console.log(res)
        console.log(file)
        this.user_msg.photo = res.path;
      },
      beforeAvatarUpload(file) {
//        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

//        if (!isJPG) {
//          this.$message.error('上传头像图片只能是 JPG 格式!');
//        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      //取消
      resetForm(){
        this.editable=false;
      },
      handlePictureCardPreview(file){
        console.log(file);
        this.dialogImageUrl = file.url;
      },
      handleSuccess(file){
        console.log(file);
      }
    }
  };
</script>

<style lang="scss">
  .app-container{
    margin:10px 1% 0;
    width:97%;
    overflow-x: hidden;
    header{
      display: flex;
      flex-wrap: nowrap;
      height:40px;
      line-height: 40px;
      span{
        color:#8d8d8d;
        font-size:0.14rem;
        &:nth-child(1){
          padding-left:0.4rem;
          display: inline-block;
          width:7.5rem;
        }
      }
    }
    .msg{
      display: flex;
      .left{
        padding-top:0.3rem;
        width:6rem;
        margin-right:0.8rem;
      }
      .right{
        width:6rem;
      }
    }
  }
  .el-form-item{
    margin-bottom:15px;
  }
  .label_img{
    display: flex;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right:5px;
      border:1px solid #ededed;
    }
    .con{
      display: flex;
      align-items: center;
      position: relative;
      left:-100px;

    }
  }
  footer{
    width:12.8rem;
    text-align: center;
    margin-top:30px;
    button{
      width:3rem;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width:80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
  input[type=file]{
    display:none !important;
  }
  /*文件上传*/
</style>
