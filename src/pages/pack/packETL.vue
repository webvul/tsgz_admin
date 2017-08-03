<template>
    <div class="page">
        <el-row :gutter="20">
            <el-col :span="10" class="col_span">
                <div class="left_con">
                    <div class="header">
                        <h5>ETL处理</h5>
                        <el-button type="primary" size="small" @click="addDabe">+添加表</el-button>
                    </div>
                    <div class="content">
                            <span v-id="leftChodata===''" class="null">暂未添加表字段</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="14" class="col_span">
                <div class="right_con">
                    <div class="header">
                        <h5>ETL处理</h5>
                        <el-button type="primary" size="small">表预览</el-button>
                    </div>
                    <div class="contain">

                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="footer">
            <el-button type="default">取消</el-button>
            <el-button type="primary">保存</el-button>
        </div>
        <!--添加表弹窗-->
        <el-dialog  :visible.sync="dialogTableVisible" size="middle" title="ID关联信息">
            <div class="dialogHeader">
                <el-select v-model="form.value" filterable placeholder="请选择"
                           @change="choseVal"
                           style="width:80%"
                           size="small" class="select">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                    </el-option>
                </el-select>
            </div>
            <div class="relateDabeButton">
                <el-button type="default" @click="contactTable">下一步</el-button>
            </div>
            <div class="tablist">
                <span v-for="item in 6" :key="item"  class="span">
                <img src="./img/download.png" alt="" style="" />
                {{333333333333333333}}
            </span>
            </div>
        </el-dialog>
    </div>

</template>
<script>
    import AJAX from './../../assets/js/ajax';
    export default {
        data() {
            return {
                form:{
                    name:'',
                    value:''
                },
                options: [{
                    value: '1',
                    label: '添加表'
                }, {
                    value: '2',
                    label: '添加库/业务包'
                }, {
                    value: '3',
                    label: 'ETL'
                }, {
                    value: '4',
                    label: 'SQL'
                }, {
                    value: '5',
                    label: 'EXCELL'
                }],
                leftChodata:'',
                dialogTableVisible:false, //添加表弹窗
            }
        },
        computed:{

        },
        created(){

        },
        methods:{
            //添加表弹窗
            addDabe(){
                this.dialogTableVisible=true;
            },
            //添加表字段
            contactTable(){

            }

        }


    };
</script>

<style lang="scss" scoped>
    .page{
        position:relative;
        .el-row{
            height:100%;
            margin-bottom:50px;
            .col_span{
                height:100%;
            }
            .left_con{
                margin-top:5px;
                border:1px solid #eee;
                .content{
                    width:100%;
                    height:420px;
                    .null{
                        display: inline-block;
                        width:100%;
                        margin-top:30px;
                        text-align: center;
                        color:#999;
                    }
                }



            }
            .right_con{
                margin-top:5px;
                border:1px solid #eee;
                .header{
                    padding:0 30px 0 6px;
                }
                .contain{
                    width:94%;
                    height:420px;
                    margin:5px 5% 0 1%;
                    overflow-y: auto;
                }
            }


        }
        .footer{
            position: absolute;
            bottom:45px;
            height:50px;
            width:100%;
            border-top:1px solid #eee;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:0 40px 0 10px;
            .el-button{

                width:100px;

                span{
                    display: inline-block;
                    line-height: 30px;
                    height:30px;
                }
            }
        }
        .header{
            height:50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom:1px solid #eee;
            padding:0 6px;
            h5{
                height:30px;
                line-height:30px;
                padding-left:4px;
                color: #317eac;
                font-weight: bold;
            }
        }

    }
    .relateDabeButton{
        margin-top:10px;
        width:100%;
        height:40px;
        text-align:right;
        padding-right:10px;
    }
    .relateDabeButton button{
        width:120px;
        height:32px;
        border:none;
        background:#2fa4e7;
        color:#fff;
        border-radius:4px;

    }
    .dialogHeader{
        width:100%;
        height:60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom:1px solid #ddd;
    }



</style>
