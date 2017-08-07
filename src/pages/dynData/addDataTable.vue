<template>
    <div class="page AddDataTable"  ref="addDataTableContainer">
    <!--查询表单-->
        <div>
            <el-form :inline="true" v-model="seaForm" class="demo-form-inline">
                <el-form-item labelWidth="30px"></el-form-item>
                <el-form-item label="表名：">
                    <el-input v-model="seaForm.tabName" placeholder="表名" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
    <!--查询结果列表-->
        <div style="overflow-y: hidden">
            <el-table
                    :data="msg"
                    border
                    :max-height="height"
                    @select="handleSelect"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        width="50"
                        label="序号">
                </el-table-column>
                <el-table-column
                        type="selection"
                        width="55"
                        label="全选">
                </el-table-column>
                <el-table-column
                        prop="tabName"
                        label="表名"
                >
                </el-table-column>
                <el-table-column
                        prop="comments"
                        label="描述"
                >
                </el-table-column>
                <el-table-column
                        prop="dbsName"
                        label="数据源名称"
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                                type="text"
                                @click="handleSeach(scope.$index, scope.row)">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" @click="importTable">导入</el-button>
            <el-button type="primary" @click="returnDataTable">返回</el-button>
        </div>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex';
    import ElForm from "../../../node_modules/element-ui/packages/form/src/form.vue";
    import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";
    import AJAX from './../../assets/js/ajax';
    export default {
        components: {
            ElFormItem,
            ElForm},
        data() {
            return {
                msg:[],
                seaForm:{
                    tabName:''
                },
                height:400,
                multipleSelection:[],
            }
        },
        computed:{

        },
        created(){
            let dat =this
            //获取业务表列表
            AJAX.get('website/dyn/dynImportTab/getDataTabList',{
                dbsId:dat.$route.query.dbsId,
                tabName:dat.seaForm.tabName
            },function(data){
                dat.msg = data.data;
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
            //获取业务表列表
            search(){
                let dat =this
                console.log(this.$route.query.id);
                AJAX.get('website/dyn/dynImportTab/getDataTabList',{
                    dbsId:dat.$route.query.id,
                    tabName:dat.seaForm.tabName
                },function(data){
                    dat.msg = data.data;
                })
            },
            //查询
            handleSeach(index,scope) {
                let dat = this;
                AJAX.get('website/dyn/dynImportTab/getTaCcolumn',{
                    dbsId:scope.dbsId,
                    tabName:scope.tabName,
                    dbsDriverclass:scope.dbsDriverclass,
                },function(data){
                    console.log(data.data);
                    dat.$router.push({
                        path:'/dynData/DataImport/importTableColumn',
                        query:{
                            dbsId:scope.dbsId,
                            tabName:scope.tabName,
                            dbsDriverclass:scope.dbsDriverclass,
                            comments:scope.comments,
                        }
                    })
                })
            },
            //导入
            importTable(){
                let dat =this;
                let dbsDriverClass=dat.msg[0].dbsDriverclass;
                let dbsName=dat.msg[0].dbsName;
                let nameAndCommentsList=[];
                //循环列表，获取每行的表名以及备注
                dat.multipleSelection.map((item,key)=>{
                    nameAndCommentsList.push(item.nameAndComments);
                })
                AJAX.post('website/dyn/dynImportTab/saveAllImportTable',{
                    nameAndCommentsList:JSON.stringify(nameAndCommentsList),
                    dbsId:dat.$route.query.dbsId,
                    dbsDriverClass:dbsDriverClass,
                    dbsName:dbsName
                },function(data){
                    if(data.data.message==='SUCCESS'){
                        dat.$router.push({
                            path:'/dynData/DataImport/extTableImport',
                            query:{
                                dbsId:dat.$route.query.dbsId,
                            }
                        })
                    }
                    if(data.data.message!=='SUCCESS'){
                        dat.$message.error(data.data.message);
                    }

                })
            },
            //返回
            returnDataTable() {
                let dat = this;
                dat.$router.push({
                    path:'/dynData/DataImport/extTableImport',
                    query:{
                        dbsId:dat.$route.query.dbsId,
                    }
                })
            },
            handleSelect(selection,row){
                let dat = this;
                dat.multipleSelection=selection;
                console.log(dat.multipleSelection);
            }
        },
    };
</script>

<style lang="scss">
    .AddDataTable{
        display: flex;
        flex-flow: column;
        position:relative;
        .header{
            width:100%;
            height:50px;
            line-height: 50px;
            .AddDataTable{
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