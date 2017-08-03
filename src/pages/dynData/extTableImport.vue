<template>
    <div class="page ExtTableImport"  ref="extTableImportContainer">
    <!--查询表单-->
        <div>
            <el-form :inline="true" v-model="seachForm" class="demo-form-inline">
                <el-form-item labelWidth="30px"></el-form-item>
                <el-form-item label="表名：">
                    <el-input v-model="seachForm.tabName" placeholder="表名" ></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input v-model="seachForm.comments" placeholder="描述" ></el-input>
                </el-form-item>
                <el-form-item label="数据源名称：">
                    <el-input v-model="seachForm.dbsName"placeholder="数据源名称"  ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="primary" @click="importExtTable">导入</el-button>
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
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <div class="left">
                    <span style="padding-left:10px;">选择页数：</span>
                    <el-select v-model="pageSize"  placeholder="选择页数" class="pageSize" size="small" @change="changePageSize">
                        <el-option
                                v-for="item in pageSizeOptions"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </div>
                <el-pagination class="button" layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="padding-right:20px;">
                </el-pagination>
            </el-col>
        </div>

        <div>
            <!--导入弹窗页-->
            <el-dialog title="导入表添加"
                       :visible.sync="importFormDialog"
                       size="tiny">
                <el-select v-model="importFormValue" filterable placeholder="请选择数据源" >
                    <el-option
                            v-for="item in tableList"
                            :key="item.dbsName"
                            :label="item.dbsName"
                            :value="item.id">
                    </el-option>
                </el-select>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="importFormDialog = false">返回</el-button>
                    <el-button type="primary" @click="submitImportTable">导入</el-button>
                </div>
            </el-dialog>
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
                seachForm:{
                    tabName:'',
                    comments:'',
                    dbsName:''
                },
                total: 0, //总页数
                page: 1, //当前页数
                pageSize:15,
                pageSizeOptions:[15,20,25],
                height:400,
                importFormDialog:false,
                importFormValue:'',
                tableList:[]
            }
        },
        computed:{

        },
        created(){
            let dat =this
            //获取业务表列表
            AJAX.post('website/dyn/dynImportTab/findAllList',{
                pageSize:dat.pageSize,
                pageNo:dat.page,
                tabName:dat.seachForm.tabName,
                comments:dat.seachForm.comments,
                dbsName:dat.seachForm.dbsName
            },function(data){
                dat.msg = data.data.data;
                dat.total=data.data.count;
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
            handleCurrentChange(page){
                let dat=this;
                dat.page = page;
                AJAX.post('website/dyn/dynImportTab/findAllList',{
                    pageSize:dat.pageSize,
                    pageNo:page
                },function(data){
                    dat.msg = data.data.data;
                })

            },
            changePageSize(){
                let dat=this;
                AJAX.post('website/dyn/dynImportTab/findAllList',{
                    pageSize:dat.pageSize,
                    pageNo:dat.page
                },function(data){
                    dat.msg = data.data.data;
                })
            },
            //获取业务表列表
            search(){
                let dat =this
                AJAX.post('website/dyn/dynImportTab/findAllList',{
                    pageSize:dat.pageSize,
                    pageNo:dat.page,
                    tabName:dat.seachForm.tabName,
                    comments:dat.seachForm.comments,
                    dbsName:dat.seachForm.dbsName
                },function(data){
                    dat.msg = data.data.data;
                    console.log(data.data)
                })
            },
            //点击导入按钮，获取所有数据源
            importExtTable(){
                let dat =this;
                AJAX.get('website/dyn/dynImportTab/getDataSource',{
                },(res1)=>{
                    console.log(res1.data);
                    dat.tableList=res1.data;
                }),
                dat.importFormDialog=true
            },
            //获取指定数据源下的数据表
            submitImportTable(){
                let dat =this;
                alert(dat.importFormValue);
                AJAX.get('website/dyn/dynImportTab/getDataTabList',{dbsId:dat.importFormValue},(res)=>{
                    if(res.message==='SUCCESS'){
                        dat.importFormDialog=false;
                        this.$router.push({
                            path:'/dynData/DataImport/addDataTable',
                            query:{
                                dbsId:dat.importFormValue
                            }
                        })
                        this.importFormValue='';
                    }
                    if(res.message!=='SUCCESS'){
                        this.$message.error(res.message);
                    }
                })
            },
            //删除
            handleDelete(index,scope){
                let _this = this;
                let dat = Object.assign(scope,{
                    pageSize:_this.pageSize,
                    pageNo:_this.page
                });
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //删除业务表
                    AJAX.delete('website/dyn/dynImportTab/deleteById',{id:scope.id,tabName:scope.tabName},(res)=>{
                        AJAX.post('website/dyn/dynImportTab/findAllList',{
                            pageSize:dat.pageSize,
                            pageNo:dat.pageNo
                        },(res1)=>{
                            _this.msg = res1.data.data;
                            console.log(res1.data)
                        })
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
    };
</script>

<style lang="scss">
    .ExtTableImport{
        display: flex;
        flex-flow: column;
        position:relative;
        .header{
            width:100%;
            height:50px;
            line-height: 50px;
            .ExtTableImport{
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