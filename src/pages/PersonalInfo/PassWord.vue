<template>
    <section class="page">
        <el-form class="small-space" :model="passwordForm" :rules="passwordFormRules" ref="passwordForm"
                 label-position="right" label-width="100px" style='width: 400px; margin-top:50px;margin-left:20px;'>
            <el-form-item label="原密码" prop="oldPassword">
                <el-input type="password" v-model="passwordForm.oldPassword" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="passwordForm.newPassword" auto-complete="off"></el-input>
                <div :class="'SecurityVerification SecurityVerification'+level" v-if="level">
                    <span style="color:#424242;font-size:12px;">安全等级：</span>
                    <el-progress :percentage="level===1?20:level===2?50:100"></el-progress>
                </div>

            </el-form-item>

            <el-form-item label="重复新密码" prop="newPassword2">
                <el-input type="password" v-model="passwordForm.newPassword2" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <footer class="passwordFooter">
            <el-button type="primary"  size="large" @click="submitForm">
                <i class="el-icon-check"></i>
                提交
            </el-button>
        </footer>
    </section>
</template>

<script>
    import {mapState,mapActions} from 'vuex';
    import check from './validatedPassword'
    import AJAX from './../../assets/js/ajax';
    export default {
        data() {
            const validateNewPassword2 = (rule, value, callback) => {
                if (value !== this.passwordForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            const validateNewPassword1 =(rule, value, callback) => {
                check.init(value,callback,this.$store.commit);
            };
            return{
                //密码输入
                passwordForm: {
                    oldPassword: '',
                    newPassword: '',
                    newPassword2: '',
                },
                //密码验证规则
                passwordFormRules: {
                    oldPassword: [
                        {required: true, trigger: 'blur', message: '旧密码不能为空！'},
                        /*{required: true, trigger: 'blur', validator: validateOldPassword}*/
                    ],
                    newPassword: [
                        {required: true, trigger: 'blur', validator: validateNewPassword1}
                    ],
                    newPassword2: [
                        {required: true, trigger: 'blur', message: '重复密码不能为空！'},
                        {required: true, trigger: 'blur', validator: validateNewPassword2}
                    ]
                },
            }
        },
        methods: {
          ...mapActions(['submitPassword']),
            submitForm (){
                let _this =this;
                this.submitPassword(this);

            },
            init(){
                this.$store.commit('safelyLevel',0);
                this.passwordForm= {
                    oldPassword: '',
                    newPassword: '',
                    newPassword2: '',
                }
            }
        },
        created(){

        },
        computed:{...mapState(['level'])},
        mounted() {
        }
    }
</script>
<style lang="scss">
    .el-form-item__content{
        .el-progress{
            width:55%;
            display: inline-block;
        }
        .el-progress__text{
            display: none !important;
        }
    }

    .SecurityVerification{
       &.SecurityVerification1{
           .el-progress-bar__inner{
               background-color: #ff5b0a !important;
           }
       }
        &.SecurityVerification2{
            .el-progress-bar__inner{
                background-color: #ffa60a !important;
            }
        }
        &.SecurityVerification3{
            .el-progress-bar__inner{
                background-color: #4db71f !important;
            }
        }
    }
    .passwordFooter{
        margin-left:130px;
        margin-top:30px;
        button{
            background:#3cad54;
            border-color:#3cad54;
            width:200px;
            &:hover{
                background:#3cad54;
                border-color:#3cad54;
            }
        }
    }
</style>
