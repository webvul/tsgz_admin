<template>
    <div class="page">
        <el-row :gutter="20">
            <el-col :span="14" class="col_span">
                <div class="left_con">
                    <h5>SQL数据集配置</h5>
                    <div class="cho_data">
                        <span class="title">数据来自数据连接</span>
                        <el-select v-model="form.value" filterable placeholder="请选择"
                                   size="small" class="select">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.label">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="send_sql">
                        <div class="header">SQL语句</div>
                        <div id="sqldata" contenteditable="true" class="contenteditable" placeholder="请输入SQL" ></div>
                    </div>
                </div>
            </el-col>
            <el-col :span="10" class="col_span">
                <div class="right_con">
                    <h5>表数据</h5>
                    <div class="prebutton">
                        <el-button type="default" size="small">预览</el-button>
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

            }
        },
        computed:{

        },
        created(){

        },
        methods:{

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
                .cho_data{
                    display: flex;
                    justify-content: space-between;
                    padding:0 20px;
                }
                .send_sql{
                    position:relative;
                    clear:both;
                    width:96%;
                    height:400px;
                    margin:20px 2% 0;
                    border:1px solid #ddd;
                }
                .send_sql .header{
                    background:#eee;
                    text-align:center;
                    height:30px;
                    line-height:30px;
                }
                .contenteditable{
                    height:370px;
                    padding:10px;
                    font-size:16px;
                }
                .contenteditable:empty:before{
                    content:attr(placeholder);
                    font-size: 16px;
                    color: #999;
                }
                .contenteditable:focus:before{
                    content:none;
                }

            }
            .right_con{
                margin-top:5px;
                border:1px solid #eee;
                .prebutton{
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                    border-bottom:2px solid #eee;
                    .el-button{
                        width: 100px;
                        height: 30px;
                        background: #ccc;
                        border: none;
                    }
                }
                .contain{
                    width:94%;
                    height:385px;
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

    }
    h5{
        height:30px;
        line-height:30px;
        padding-left:4px;
        border-bottom:1px solid #eee;
        color: #317eac;
        font-weight: bold;
    }

</style>
