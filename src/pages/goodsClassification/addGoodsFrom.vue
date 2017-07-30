<template>
    <div class="page">
        <header>
            <div class="title">基本信息</div>
            <el-form :model="gccMenu" :rules="rules" ref="gccMenu" label-width="100px" class="tableForm">
                <el-form-item label="名称"  prop="name">
                    <el-input v-model="gccMenu.name"></el-input>
                </el-form-item>
                <el-form-item label="链接"  prop="href">
                    <el-input v-model="gccMenu.href"></el-input>
                </el-form-item>
                <el-form-item label-width="100px">
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </header>


    </div>
</template>

<script>
    import AJAX from './../../assets/js/ajax';
    export default {
        data() {
            return {
                gccMenu:[]            }
        },rules: {
            name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
        },
        computed:{
        },
        created(){
            let _this = this;
            AJAX.get('gcc/gccContror/addeditDate',{menuid:this.$route.query.id},function(data){
                _this.gccMenu = data.menu;
                console.info(data.menu);
            })
        },
        mounted(){

        },
        watch:{

        },
        methods:{
        },

    };
</script>

<style lang="scss" scoped>
    .title{
        padding-left:15px;
        font-size:18px;
        font-weight:bold;
        height:50px;
        line-height: 50px;
        color:#0088CC;
    }
    .tableForm{
        border-top:1px solid #ddd;
        border-bottom:1px solid #ddd;
        position: relative;
        display: flex;
        height:50px;
        line-height: 50px;
        .el-form-item{
            position:relative;
            left:-20px;
            top:6px;
            &:nth-child(2){
                left:-40px;
            }
            &:nth-child(3){
                left:-40px;
            }
        }
        .el-input{
            width:130px;
        }
        .el-form-item__label{
            width:50px;
        }
        .btn1{
            margin-top:4px;
            width:50px;
            height:30px;
        }
    },
    .selectForm{
        height:50px;
        border-bottom:1px solid #ddd;
        .el-form{
            display: flex;
            position:relative;
            top:7px;
            .el-form-item{
                position:relative;
                &:nth-child(1){
                    left:-5px;
                }
                &:nth-child(2){
                    left:5px;
                }
            }
        }
    }
</style>
