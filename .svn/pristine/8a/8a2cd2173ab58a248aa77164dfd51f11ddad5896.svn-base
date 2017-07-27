<template>
    <div class="page">
        <div class="header">
            <div class="header_input">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="活动名称:">
                        <el-input v-model="form.name" size="small"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="dabeList">
            <span v-for="item in 4" :key="item" :title="'数据表'+item" class="span" @click="handleTips">
                <img src="./img/download.png" alt="" style="" />
                数据表{{item}}
            </span>
        </div>
        <div class="footer">
            <el-button size="small" @click="goback">取消</el-button>
            <el-button size="small" @click="handleFinish" type="primary">确认</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               form:{
                   name:''
               }

            }
        },
        computed:{

        },
        created(){

        },
        methods:{
            handleTips(){
                this.$message({
                    message: '只有添加成功之后才可以编辑哦',
                    type: 'warning'
                });
            },
            goback(){
                this.$router.go(-1);
            },
            handleFinish(){
                if(this.form.name===''){
                    return this.$message.error('你还没给包命名哦');
                }
                this.$router.push('/groupList')
            }
        }


    };
</script>

<style lang="scss" scoped>
    .page{
        position:relative;
    }
    .header{
        height:40px;
        border-bottom:1px solid #eee;
        .header_input{
            margin:0.1rem 0.2rem;
            width:300px;

        }
    }
    .dabeList{
        height:450px;
        width:95%;
        overflow-y: auto;
        padding: 0.2rem;
        .span{
            cursor: pointer;
            border:1px solid #ddd;
            margin-right:1.9%;
            margin-top:5px;
            display: inline-block;
            width:10.1%;
            padding-right:0.02rem;
            height:25px;
            line-height: 25px;
            overflow-x: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            &.active{
                background:#65cea7;
                color:#fff;
            }
            img{
                width:16px;
                height:16px;
                vertical-align: middle ;
                margin:0 4px;
            }

        }
    }
    .footer{
        position:absolute;
        width:100%;
        padding-top:10px;
        box-shadow:2px -2px 2px #aaaaaa;
        text-align: right;
        bottom:10px;
        .el-button{
            padding:5px 20px;
            &:nth-child(2){
                margin-right:30px;
            }
        }
    }
</style>
