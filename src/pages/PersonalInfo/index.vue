<template>
    <div class="page">
        <div class="app-container">
            <header>
                <span>你本次登录地为 : {{ipMsg.cname}}</span>
                <span>IP:{{ipMsg.cip}}</span>
            </header>
            <section class="msg">
                <div class="left">
                    <el-form label-position="right" label-width="100px" :model="user_msg">
                        <el-form-item label="用户名：">
                            {{user_msg.loginName}}
                        </el-form-item>
                        <el-form-item label="昵称：">
                            <el-input v-model="user_msg.name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别：">
                            <el-radio-group v-model="user_msg.sex">
                                <el-radio label="man">男</el-radio>
                                <el-radio label="woman">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="邮箱：">
                            <el-input v-model="user_msg.email"></el-input>
                        </el-form-item>
                        <el-form-item label="电话：">
                            <el-input v-model="user_msg.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="手机：">
                            <el-input v-model="user_msg.mobile"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="right">
                    <el-form  label-width="100px">
                        <el-form-item label="头像：" class="label_img">
                            <div class="con">
                                <img :src="dialogImageUrl" alt="用户头像" class="user_img">
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
                                </el-upload>
                            </div>
                            <!--<img width="100%" :src="dialogImageUrl" alt="">
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture"
                                    :on-preview="handlePictureCardPreview"
                                    >
                                <span>上传头像</span>
                            </el-upload>-->
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
                            <el-input v-model="user_msg.token"></el-input>
                        </el-form-item>
                    </el-form>

                </div>
            </section>
        </div>
        <footer>
            <el-button type="primary"  size="large" @click="submitForm">
                <i class="el-icon-check"></i>
                提交</el-button>
        </footer>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex';
    import {IPAddress} from '../../utils';
    export default {
        data() {
            return {
                editable: false,
                ipMsg:'',
                msg:JSON.parse(sessionStorage.getItem('Token'))?JSON.parse(sessionStorage.getItem('Token')):''
            }
        },
        computed: {...mapState(['user_msg','prefix']),
            dialogImageUrl(){
               return this.prefix+this.user_msg.photo;
            }
        },
        created() {
            this.ipMsg = IPAddress();
            this.handleUserMsg();
        },
        methods: {
            ...mapActions(['handleUserMsg']),
            //提交表单
            submitForm() {
                let vm = this;
                vm.editable = false;
                let par = {
                    "status": vm.user_msg.status,
                    "name": vm.user_msg.name,
                    "token": vm.user_msg.token,
                    "avatar":vm.user_msg.avatar,
                    "sex": vm.user_msg.sex,
                    "introduction": vm.user_msg.introduction,
                };


            },
            //取消
            resetForm(){
               this.editable=false;
            },
            //上传头像
            uploadAvatar(){
                alert('稍后补上')
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
    /*文件上传*/
</style>
