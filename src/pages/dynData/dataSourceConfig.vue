<template>
    <div class="page DataSourceConfig"  ref="dataSourceContainer">

        <div>
            <el-form :inline="true" v-model="labelData" class="demo-form-inline">
                <el-form-item labelWidth="30px"></el-form-item>
                <el-form-item label="数据库类型：">
                    <el-select v-model="labelData.dbType" placeholder="数据库类型">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="oracle数据库" value="oracle"></el-option>
                        <el-option label="mysql数据库" value="mysql"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据源名称：">
                    <el-input v-model="labelData.dbsName" placeholder="数据源名称" ></el-input>
                </el-form-item>
                <el-form-item label="数据库名称：">
                    <el-input v-model="labelData.dataBaseName"placeholder="数据库名称"  ></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="primary" @click="add">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table
                    :data="msg"
                    border
                    :height="($store.state.screenHeight-245)"
                    style="width: 100%">
                <el-table-column
                        prop="dbsName"
                        label="数据源名称"
                >
                </el-table-column>
                <el-table-column
                        prop="dataBaseName"
                        label="数据库名称"
                >
                </el-table-column>
                <el-table-column
                        prop="dbType"
                        label="数据库类型">
                </el-table-column>
                <el-table-column
                        prop="dbsIp"
                        label="数据库IP地址">
                </el-table-column>
                <el-table-column
                        prop="dbsPort"
                        label="数据库端口">
                </el-table-column>
                <el-table-column
                        prop="dbsUsername"
                        label="数据库账号">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                                type="text"
                                @click="handleEdit(scope.$index, scope.row)">修改
                        </el-button>
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
            <!--新增弹窗页-->
            <el-dialog title="数据源配置添加"
                       :visible.sync="addFormDialog"
                       style="height: auto">
                <el-form v-model="addFormValue" class="demo-form-inline" :inline="true">
                    <el-form-item label="数据源名称:" prop="dbsName">
                        <el-input v-model="addFormValue.dbsName"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库类型:" prop="dbType">
                        <el-select v-model="addFormValue.dbType" placeholder="数据库类型">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="oracle数据库" value="oracle"></el-option>
                            <el-option label="mysql数据库" value="mysql"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据库名称: " prop="dataBaseName">
                        <el-input v-model="addFormValue.dataBaseName"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库IP地址:" prop="dbsIp">
                        <el-input v-model="addFormValue.dbsIp"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库端口:" prop="dbsPort">
                        <el-input v-model="addFormValue.dbsPort"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库账号:" prop="dbsUsername">
                        <el-input v-model="addFormValue.dbsUsername"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库密码:"  prop="dbsPassword">
                        <el-input v-model="addFormValue.dbsPassword"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addFormDialog = false">取 消</el-button>
                    <el-button type="primary" @click="addDataSource">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div>
            <!--修改弹窗页-->
            <el-dialog title="数据源配置修改"
                       :visible.sync="updateFormDialog"
                      style="height: auto">
                <el-form v-model="formValue" class="demo-form-inline" :inline="true">
                    <el-form-item label="数据源名称:">
                        <el-input v-model="formValue.dbsName"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库类型:">
                        <el-select v-model="formValue.dbType" placeholder="数据库类型">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="oracle数据库" value="oracle"></el-option>
                            <el-option label="mysql数据库" value="mysql"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据库名称: ">
                        <el-input v-model="formValue.dataBaseName"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库IP地址:">
                        <el-input v-model="formValue.dbsIp"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库端口:">
                        <el-input v-model="formValue.dbsPort"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库账号:">
                        <el-input v-model="formValue.dbsUsername"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库密码:">
                        <el-input v-model="formValue.dbsPassword"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="updateFormDialog = false">取 消</el-button>
                    <el-button type="primary" @click="updateDataSource">确 定</el-button>
                </div>
            </el-dialog>
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
          const validateEmpty =(rule, value, callback) => {
            check.init(value, callback, this.$store.commit);
          };
            return {
                msg:[],
                labelData:{
                    dbType:'',
                    dbsName:'',
                    dataBaseName:''
                },
                formValue:{
                    dbType:'',
                    dbsName:'',
                    dataBaseName:'',
                    dbsIp:'',
                    dbsPort:'',
                    dbsUsername:'',
                    dbsPassword:''

                },
                addFormValue:{
                    dbType:'',
                    dbsName:'',
                    dataBaseName:'',
                    dbsIp:'',
                    dbsPort:'',
                    dbsUsername:'',
                    dbsPassword:''

                },
                total: 0, //总页数
                page: 1, //当前页数
                pageSize:15,
                pageSizeOptions:[15,20,25],
                updateFormDialog:false,
                addFormDialog:false,
                index:-1, //点击行号

            }
        },
        created(){
            let dat =this
            //获取业务表列表
            AJAX.post('website/dyn/dynDataSource/findAllList',{
                pageSize:dat.pageSize,
                pageNo:dat.page,
                dbType:dat.labelData.dbType,
                dbsName:dat.labelData.dbsName,
                dataBaseName:dat.labelData.dataBaseName
            },function(data){
                dat.msg = data.data.data.data;
                dat.total=data.data.data.count;
            })
        },
        mounted(){


        },
        methods:{
            handleCurrentChange(page){
                let dat=this;
                dat.page = page;
                AJAX.post('website/dyn/dynDataSource/findAllList',{
                    pageSize:dat.pageSize,
                    pageNo:page
                },function(data){
                    dat.msg = data.data.data.data;
                })

            },
            changePageSize(){
                let dat=this;
                AJAX.post('website/dyn/dynDataSource/findAllList',{
                    pageSize:dat.pageSize,
                    pageNo:dat.page
                },function(data){
                    dat.msg = data.data.data.data;
                })
            },
            //获取业务表列表
            search(){
                let dat =this
                AJAX.post('website/dyn/dynDataSource/findAllList',{
                    pageSize:dat.pageSize,
                    pageNo:dat.page,
                    dbType:dat.labelData.dbType,
                    dbsName:dat.labelData.dbsName,
                    dataBaseName:dat.labelData.dataBaseName
                },function(data){
                   dat.msg = data.data.data.data;
                })
            },
            //新增数据源
            add(){
                this.addFormDialog=true;
            },

            addDataSource(){
                let dat = this;
               /* this.$refs.addFormValue.validate((valid) => {
                    if (valid) {*/
                        AJAX.post('website/dyn/dynDataSource/editData',{params:JSON.stringify(dat.addFormValue)},function (data)
                        {
                            if(data.data.stateCode.code===200){
                                AJAX.post('website/dyn/dynDataSource/findAllList',{
                                    pageSize:dat.pageSize,
                                    pageNo:dat.pageNo
                                },function(res1){
                                    dat.msg = res1.data.data.data;
                                });
                                dat.addFormDialog=false;
                                dat.addFormValue='';
                            }
                            if(data.data.stateCode.code!==200){
                                dat.$message.error(data.data.stateCode.message);
                            }
                        })
                   /* }else {
                        console.log('数据校验未通过!!');
                        return false;
                    }
                })*/

            },
            //修改操作，查询单条数据
            handleEdit(index,row){
                let dat =this
                dat.index = index;
                AJAX.get('website/dyn/dynDataSource/findDataById',{
                    id:row.id
                },function(data){
                    dat.updateFormDialog=true
                    dat.formValue=data.data
                })
            },
            //修改数据
            updateDataSource(){
                let dat = this;
                AJAX.post('website/dyn/dynDataSource/editData',{params:JSON.stringify(dat.formValue)},function (data)
                {
                  console.log(data)
                    if(data.data.stateCode.code===200){
                        dat.msg[dat.index]=Object.assign(dat.msg[dat.index],dat.formValue);
                        dat.updateFormDialog=false;
                        dat.formValue='';
                    }
                    if(data.data.stateCode.code!==200){
                        dat.$message.error(data.data.stateCode.message);
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

                        AJAX.delete('website/dyn/dynDataSource/deleteById',{id:scope.id},(res)=>{
                            AJAX.post('website/dyn/dynDataSource/findAllList',{
                                pageSize:dat.pageSize,
                                pageNo:dat.pageNo
                            },(res1)=>{
                                _this.msg = res1.data.data.data;
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
    .DataSourceConfig{
        display: flex;
        flex-flow: column;
        position:relative;
        .header{
            width:100%;
            height:50px;
            line-height: 50px;
            .DataSourceConfigFrom{
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
            overflow-x: hidden;
            display: flex;
            justify-content: space-between;
            align-items: center;
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
