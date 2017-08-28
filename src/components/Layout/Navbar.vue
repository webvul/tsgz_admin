<template>
  <div style="font-size:14px">
    <!--左边-->
    <div class="navbar">
      <div class="left_con">
        <i class="icon iconfont icon-shousuo" style="color:#fff" @click="toggleSideBar" :isActive="sidebar.opened"></i>
        <div class="headNav">
          <el-menu   :default-active="$store.state.headerCurRouter" class="el-menu-demo"
                     mode="horizontal" unique-opened router>
            <!-- v-if='!item.hidden && (($store.state.user.userinfo.access_status===1 && $store.state.user.userinfo.web_routers[item.path]) || $store.state.user.userinfo.access_status!==1)' -->
            <el-menu-item
              v-for='(item,index) in $router.options.routes'
              style="font-size:16px;"
              :index="item.path"
              :key='item.path'
              v-if='!item.hidden'>
              {{item.name}}
            </el-menu-item>
          </el-menu>
        </div>

      </div>
      <!--右边-->
      <div class="header">
        <!--<div class="message">-->
        <!--<i class="icon iconfont icon-xinfeng"></i>-->
        <!--<div class="mark mark1">0</div>-->
        <!--</div>-->
        <!--<div class="message">-->
        <!--<i class="icon iconfont icon-gonggao"></i>-->
        <!--<div class="mark mark2">0</div>-->
        <!--</div>-->
        <el-dropdown class="head_drop_menu">
                    <span class="head_drop_menu_button">
                        <img src="./../../assets/img/login/6.png" class="user_logo_img" alt=""/>
                        <span>系统管理员,你好</span>
                    </span>
          <el-dropdown-menu slot="dropdown" style="text-align: left;width:130px;">
            <el-dropdown-item class="head_item_text"  @click.native="dialogFormVisible = true"
                              style="font-size:12px">修改密码
            </el-dropdown-item>
            <el-dropdown-item class="head_item_text" @click.native="loginOut" style="font-size:12px">退出登陆
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--<el-dropdown>-->
        <!--<span class="icon_item" title="换肤">-->
        <!--<i class="icon iconfont icon-huanfu"></i>-->
        <!--</span>-->
        <!--<el-dropdown-menu slot="dropdown" style="text-align: left;width:130px;" class="themeDrop">-->
        <!--<el-dropdown-item class="head_item_text" style="font-size:12px" v-for="item in theme" @click.native="changeDefaultTheme(item.id)" :key="item.id">-->
        <!--<span :style="'background:'+item.color" class="themeItem"></span><span>{{item.name}}</span>-->
        <!--</el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
        <span class="icon_item" title="设置">
                   <i class="icon iconfont icon-shezhi"></i>
                </span>
        <span class="icon_item" style="margin-right:10px;" title="退出" @click="loginOut">
                   <i class="icon iconfont icon-tuichu"></i>
                </span>
      </div>
    </div>
    <!-- 修改密码弹窗 -->
    <el-dialog title="密码修改" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="passwordForm" :rules="passwordFormRules" ref="passwordForm"
               label-position="right" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model="passwordForm.oldPassword" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="passwordForm.newPassword" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="重复新密码" prop="newPassword2">
          <el-input type="password" v-model="passwordForm.newPassword2" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>

        <el-button type="primary" @click="handlePwdModifySubmit(passwordForm)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  //    import {changeTheme} from '../../utils'
  export default {
    data(){
      const validateNewPassword2 = (rule, value, callback) => {
        if (value !== this.passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        //主题配置
        theme:[
          {color:'#22bf98',id:'theme1',name:'默认主题'},
          {color:'#2bbabf',id:'theme2',name:'青蓝主题'},
          {color:'#16aeef',id:'theme3',name:'天蓝主题'},
          {color:'#f75555',id:'theme4',name:'洋红主题'},
          {color:'#fa6543',id:'theme5',name:'橙色主题'},
        ],
        //初始不显示密码
        dialogFormVisible: false,
        dialogVisible:false,
        themeValue:'',
        //密码输入
        passwordForm: {
          "oldPassword": '',
          "newPassword": '',
          "newPassword2": '',
        },
        //密码验证规则
        passwordFormRules: {
          oldPassword: [
            {required: true, trigger: 'blur', message: '旧密码不能为空！'},
            /*{required: true, trigger: 'blur', validator: validateOldPassword}*/

          ],
          newPassword: [
            {required: true, trigger: 'blur', message: '新密码不能为空！'},
          ],
          newPassword2: [
            {required: true, trigger: 'blur', message: '重复密码不能为空！'},
            {required: true, trigger: 'blur', validator: validateNewPassword2}
          ]
        },
      }
    },
    methods: {
      loginOut () {
        let _this = this;
        this.$confirm('确认退出吗?', '提示', {
          type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {
        });
      },
      toggleSideBar(){
        this.$store.dispatch('toggleSidebar');
      },
      changeDefaultTheme(theme){
        changeTheme(document.body,theme);
      }
    },
    computed: mapState(['sidebar']),
    created(){
      this.$store.commit('setCurrentRoute',this.$route.matched);
      this.$store.commit('setCurrentSiderbarHighLight',this.$route.matched[1].path)
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    background:#1f2c33;
    height: 50px;
    overflow-y: hidden;
    white-space: nowrap;
    border-radius: 0px !important;
    margin-bottom: 0 !important;
    .left_con{
      float:left;
      height:50px;
      line-height: 50px;
      .icon-shousuo {
        position:relative;
        top:-20px;
        display: inline-block;
        margin:0 10px;
        cursor: pointer;
        font-size: 14px;
        color: #fff;
      }
      .icon-shousuo[isactive] {
        transform: rotate(90deg);
      }
    }
    .headNav{
      height:50px;
      overflow-y: hidden;
      display: inline-block;
      .el-menu-item{
        height:50px;
        line-height: 50px;
        padding:0 10px;
      }
    }
    .header {
      height:50px;
      float:right;
      .message,.icon_item{
        display: inline-block;
        position:relative;
        width:24px;
        height:50px;
        line-height: 50px;
        text-align: center;
        font-size:12px;
        color:#718b92;
        i{
          font-size:22px;
          color:#718b92;
        }
        .mark{
          padding:0 4px;
          height:16px;
          display: inline-block;
          line-height: 16px;
          position:absolute;
          font-size:12px;
          top:3px;
          right:0;
          color:#fff;
        }
        .mark1{
          background:#f8d347;
        }
        .mark2{
          background:#ee8d2f;
        }
      }
      .head_drop_menu_button {
        padding:0 10px;
        span{
          position:relative;
          color:#718b92;
          font-size:12px;
        }
      }
      .user_logo_img {
        vertical-align: middle;
        position: relative;
        top:-3px;
        width: 44px;
        height: 44px;
        border-radius: 100%;
        margin-right:10px;
      }
    }
  }
  .themeDrop{
    .el-dropdown-menu__item{
      color:#000;
      .themeItem{
        position:relative;
        vertical-align: middle;
        margin-right:10px;
        display: inline-block;
        width:24px;
        height:24px;
      }
    }
  }

</style>
