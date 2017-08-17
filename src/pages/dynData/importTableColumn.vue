<template>
    <div class="page ImportTableColumn"  ref="ImportTableColumn">
    <!--基本信息-->
        <div>
            <el-form :inline="true" v-model="seaForm" class="demo-form-inline">
                <el-form-item labelWidth="100px"></el-form-item>
                <el-form-item label="表名：">
                    <el-input v-model="seaForm.tabName" placeholder="表名" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input v-model="seaForm.comments" placeholder="描述"  :disabled="true"></el-input>
                </el-form-item>
            </el-form>
        </div>
    <!--查询结果列表-->
        <div style="overflow-y: hidden">
            <el-table
                    :data="msg"
                    border
                    :max-height="height"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        width="50"
                        label="序号">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="列名"
                >
                </el-table-column>
                <el-table-column
                        prop="comments"
                        label="说明"
                >
                </el-table-column>
                <el-table-column
                        prop="jdbcType"
                        label="物理类型"
                >
                </el-table-column>
                <el-table-column
                        prop="isPk"
                        label="主键"
                >
                </el-table-column>
                <el-table-column
                        prop="isNull"
                        label="是否可空"
                > </el-table-column>
            </el-table>
            <el-button type="primary" @click="importTable">导入</el-button>
            <el-button type="primary" @click="returnDataTable">返回</el-button>
        </div>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex';
    import AJAX from './../../assets/js/ajax';
    export default {
        components: {
          },
        data() {
            return {
                msg:[],
                seaForm:{
                    tabName:this.$route.query.tabName,
                    comments:this.$route.query.comments
                },
                height:400
            }
        },
        computed:{

        },
        created(){
            let dat =this
            //获取业务表列表
            AJAX.get('website/dyn/dynImportTab/getTaCcolumn',{
                dbsId:dat.$route.query.dbsId,
                tabName:dat.$route.query.tabName,
                dbsDriverclass:dat.$route.query.dbsDriverclass,
                comments:dat.$route.query.comments,
            },function(data){
                console.log(data.data);
                console.log(data.data.columnList);
               dat.msg =data.data.columnList;
            })
        },
        mounted(){
            let _this =this;
           this.height=$(window).height()-245;
           $(window).resize(function(){
               _this.height=$(window).height()-245;
           })
        },
        methods:{
            //导入
            importTable(){
                let dat =this
                AJAX.post('website/dyn/dynImportTab/saveImportTable',{
                    columnList:JSON.stringify(dat.msg),
                    dbsId:dat.$route.query.dbsId,
                    tabName:dat.$route.query.tabName,
                    dbsDriverclass:dat.$route.query.dbsDriverclass,
                    comments:dat.$route.query.comments,
                },function(data){
                    if(data.data.stateCode.code===200){
                        dat.$router.push({
                            path:'/dynData/DataImport/extTableImport',
                            query:{
                                dbsId:dat.$route.query.dbsId,
                            }
                        })
                    }
                    if(data.data.stateCode.code!==200){
                        dat.$message.error(data.data.stateCode.message);
                    }

                })
            },
            //返回
            returnDataTable() {
                let dat = this;
                dat.$router.push({
                    path:'/dynData/DataImport/addDataTable',
                    query:{
                        dbsId:dat.$route.query.dbsId,
                    }
                })

            }
        },
    };
</script>

<style lang="scss">
    .ImportTableColumn{
        display: flex;
        flex-flow: column;
        position:relative;
        .header{
            width:100%;
            height:50px;
            line-height: 50px;
            .ImportTableColumn{
                position: relative;
                top:6px;
                display: flex;
                line-height: 50px;
                .el-form-item{
                    position:relative;
                    left:-20px;
                    &:nth-child(2){
                        left:-40px;
                    }
                    &:nth-child(3){
                        left:-30px;
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
                    height:50px;
                }
            }
        }
        .toolbar{
            position: absolute;
            bottom:45px;
            height:45px;
            background:#fff;
            /*border-top:1px solid #ddd;*/
            overflow-x: hidden;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 99;
            .left{
                width:240px;
                overflow: hidden;
                .pageSize{
                    width:70px;
                    li{
                        width:50px;
                    }
                }
            }


        }
    }
</style>
