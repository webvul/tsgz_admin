<template>
    <div class="page pageExcell">
        <el-row :gutter="20">
            <el-col :span="14" class="col_span">
                <div class="left_con">
                    <div>
                        <h5>Excell数据集配置</h5>
                        <div class="header">
                            <p>上传信息</p>
                            <div class="icon_button">
                                <el-button type="primary" size="small" style="margin-right:5px;" @click="openWindow">上传数据</el-button>
                                <i class="el-icon-warning" style="font-size:20px;color:#22bf98" @click="openWindowKnow"></i>
                            </div>
                        </div>
                        <div id="preData"></div>
                    </div>
                </div>
            </el-col>
            <el-col :span="10" class="col_span">
                <div class="right_con">
                    <h5>表数据</h5>
                    <div class="contain">
                        <span v-if="excellData===''" class="preSpan">
                            请上传excell数据
                        </span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="footer">
            <el-button type="default">取消</el-button>
            <el-button type="primary">保存</el-button>
        </div>
        <!--弹窗-->
        <el-dialog  :visible.sync="dialogTableVisible"   title="导入数据" class="dialogModal">
            <div class="submitButton">
                <input type="file" name="file" value="选择jar包"/>
                <el-button type="primary" size="small">导入</el-button>
            </div>
            <div class="dialogFooter">
                <span>导入文件不能超过5M，仅允许导入xls、csv、xlsx格式文件</span>
                <el-button type="default" size="small" @click="dialogTableVisible=false">关闭</el-button>
            </div>
        </el-dialog>
        <!--注意事项-->
        <el-dialog  :visible.sync="dialogTableVisible1"  :show-close="false" class="mymodel">
            <div class="dialogHeader">
                <p class="title">注意事项</p>
            </div>
            <!--定位用-->
            <div class="pos">参与分析</div>

            <div class="dialogFooter">
                <el-button type="default" size="small" @click="dialogTableVisible=false">关闭</el-button>
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
                excellData:'',
                dialogTableVisible:false,
                dialogTableVisible1:false
            }
        },
        computed:{

        },
        created(){

        },
        methods:{
            openWindow(){
                this.dialogTableVisible = true;
            },
            openWindowKnow(){
                this.dialogTableVisible1 = true;
            }
        }


    };
</script>

<style lang="scss">
    .pageExcell{
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
                #preData{
                    max-height:400px;
                    height:400px;
                    overflow: auto;
                }

            }
            .right_con{
                margin-top:5px;
                border:1px solid #eee;
                .contain{
                    width:94%;
                    height:442px;
                    margin:5px 5% 0 1%;
                    overflow-y: auto;
                    .preSpan{
                        display: inline-block;
                        width:100%;
                        text-align: center;
                        font-size:16px;
                        color:#999;
                        margin-top:20px;
                    }
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
            p{
                font-size:14px;
                color:#999;
            }
            text-align:center;
            height:50px;
            line-height:50px;
            padding:0 6px;
            display: flex;
            justify-content: space-between;
            .icon_button{
                cursor: pointer;
                display: flex;
                align-items: center;
                padding-right:5px;
            }
        }
        h5{
            height:50px;
            line-height:50px;
            padding:0 6px;
            border-bottom:1px solid #eee;
            color: #317eac;
            font-weight: bold;
            margin-top:0;
            margin-bottom:0;
            background:#eee;
        }
        .dialogModal .el-dialog{
            .el-dialog__body{
                padding:20px 0 0!important;
            }
            .submitButton{
                input{
                    padding-left:180px;
                }
                height:100px;
                text-align: center;
                .el-button{
                    margin-top:20px;
                }
            }
        }
        .dialogFooter{
            height:40px;
            background-color: #eee;
            white-space: nowrap;
            align-items: center;
            display: flex;
            justify-content: space-between;
            padding:0 10px;
        }
    }


</style>
