<template>
  <div>
    <div class="login_content" v-if="loadding">
      <img src="./../assets/img/login/login_logo.png" class="login_img" alt="" style="width:3.17rem;height:0.55rem">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
               class="demo-ruleForm login-container" action="">
        <h3 class="title">欢迎您登陆</h3>
        <el-form-item prop="account">
          <el-input type="text"  v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"
                    placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked" checked class="remember">记住我</el-checkbox>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2"
                     :loading="logining">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <loadding v-else/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {mapGetters} from 'vuex'
  import loadding from './../components/loadding/loadding.vue'
  import AJAX from './../assets/js/ajax'
  export default {
    data() {
      return {
        loadding: true, //为true显示加载动画 为false显示页面
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        rules2: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            //{ validator: validaePass }
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    mounted: function () {
    },
    //解构赋值，获取state和getters里面的值
    /*computed: {...mapState(['num']),...mapGetters(['changeNum'])},*/
    components: {
      loadding
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        let _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            let loginParams = {username: this.ruleForm2.account, password: this.ruleForm2.checkPass};

            AJAX.post('website/sys/user/loginweb', loginParams, (res) => {
              console.log(res.data);
              _this.logining = false;
              sessionStorage.setItem('Token', JSON.stringify(res.data.data.token));
              _this.$router.push({path: '/home/Personal'});
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  .login_content {
    width: 100%;
    height: 100vh;
    background: url('../assets/img/login/login_bg.png');
    position: relative;
    background-size: cover;
    .login_img{
      position: absolute;
      top:20px;
      left:40px
    }
  }

  .login-container {
    position: absolute;
    top: 150px;
    right:100px;
    background: transparent;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    width: 350px;
    padding: 35px 35px 15px 35px;
    .el-input__inner{
      background-color: transparent;
      border:none;
      color:rgba(255,255,255,0.45);
      border-radius:0;
      border-bottom:1px solid rgba(255,255,255,0.45);
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
      border-color: #75c988 !important;
      background:#75c988 !important;
      border-radius: 0;
    }
    .el-checkbox__label{
      color:#fff;
      font-weight: 200;
    }
    .el-button{
      width:3rem;
      height:36px;
      border-radius: 0;
      font-size: 0.22rem;
    }
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    font-size: 18px;
    color: #fff;
  }
</style>
