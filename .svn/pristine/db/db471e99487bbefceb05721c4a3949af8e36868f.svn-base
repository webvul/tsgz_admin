<template>
    <div style="font-size:14px">
        <div class="navbar">
            <div class="left_con">
                <i class="fa fa-bars" @click="toggleSideBar" :isActive="sidebar.opened"></i>
                <!--<div class="title">态势感知后台系统</div>-->
                <div class="headNav">
                    <el-menu   :default-active="$store.state.headerCurRouter" class="el-menu-demo"
                               mode="horizontal" unique-opened router>
                        <!-- v-if='!item.hidden && (($store.state.user.userinfo.access_status===1 && $store.state.user.userinfo.web_routers[item.path]) || $store.state.user.userinfo.access_status!==1)' -->
                        <el-menu-item
                                v-for='(item,index) in $router.options.routes'
                                :index="item.path"
                                :key='item.path'
                                v-if='!item.hidden'>
                            {{item.name}}
                        </el-menu-item>
                    </el-menu>
                </div>
            </div>
            <div class="header">
                <div class="message">
                  <i class="el-icon-message"></i>
                   <div class="mark mark1">0</div>
                </div>
                <div class="message">
                   <i class="el-icon-edit"></i>
                    <div class="mark mark2">0</div>
                </div>
                <el-dropdown class="head_drop_menu">
                    <span class="head_drop_menu_button">
                        <img src="./../../assets/img/login/6.jpg" class="user_logo_img" alt=""/>
                        <span style="color:#fff">系统管理员,你好</span>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="text-align: left;width:130px;">
                        <el-dropdown-item class="head_item_text" @click.native="dialogVisible = true" style="font-size:12px">
                            更改主题
                        </el-dropdown-item>
                        <el-dropdown-item class="head_item_text"  @click.native="dialogFormVisible = true"
                                          style="font-size:12px">修改密码
                        </el-dropdown-item>
                        <el-dropdown-item class="head_item_text" @click.native="loginOut" style="font-size:12px">退出登陆
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>
                  <i class="el-icon-upload2"></i>
                </span>
                <span>
                   <i class="el-icon-setting"></i>
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
        <!--修改主题弹窗-->
        <el-dialog title="更改主题颜色" :visible.sync="dialogVisible" >
            <el-form class="small-space" label-position="left" label-width="130px" style='width: 400px; margin-left:50px;'>

                <el-form-item label="请选择主题颜色：" prop="resource">
                    <el-radio-group v-model="themeValue">
                        <el-radio label="theme_blue" style="color:blue">蓝色</el-radio>
                        <el-radio label="theme_green" style="color:green">绿色</el-radio>
                        <el-radio label="theme_red" style="color:red">红色</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>

                <el-button type="primary" @click="handleChangeTheme">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {changeTheme} from '../../utils'
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
            handleChangeTheme(){
                changeTheme(document.body,this.themeValue);
                this.dialogVisible=false;
            }
        },
        computed: mapState(['sidebar']),
        created(){
            console.log(this.$route.matched);
            this.$store.commit('setCurrentRoute',this.$route.matched);
        }
    }
</script>

<style lang="scss" scoped>
    .navbar {
        background:#1f2c33;
        height: 50px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        border-radius: 0px !important;
        .left_con{
            display: flex;
            align-items: center;
            .fa-bars {
                display: inline-block;
                margin:0 10px;
                cursor: pointer;
                font-size: 20px;
                color: #fff;
            }
            .fa-bars[isactive] {
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
            .message,span{
                display: inline-block;
                position:relative;
                padding-right:10px;
                i{
                    font-size:16px;
                    color:#fff;
                }
                .mark{
                    padding:0 4px;
                    height:16px;
                    position:absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
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
            line-height: 50px;
            .head_drop_menu_button {
                display: flex;
                align-items: center;
            }
            .user_logo_img {
                width: 18px;
                height: 18px;
                border-radius: 100%;
                margin-right:10px;
            }
        }

    }
</style>
