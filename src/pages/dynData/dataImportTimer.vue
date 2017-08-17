<template>
    <div class="page DataImportTimer"  ref="dataImportTimerContainer">
        <!---查询表单↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓-->
        <div>
            <el-form :inline="true" v-model="seachForm" class="demo-form-inline">
                <el-form-item labelWidth="30px"></el-form-item>
                <el-form-item label="任务名称：">
                    <el-input v-model="seachForm.timerName" placeholder="任务名称" ></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-input v-model="seachForm.flag" placeholder="状态" ></el-input>
                </el-form-item>
                <el-form-item label="数据源名称：">
                    <el-input v-model="seachForm.dbsName"placeholder="数据源名称"  ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="primary" @click="addTimer">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--查询表单 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑-->
        <!--查询结果列表 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓-->
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
                        prop="timerName"
                        label="任务名称"
                >
                </el-table-column>
                <el-table-column
                        prop="flag"
                        label="状态"
                >
                </el-table-column>
                <el-table-column
                        prop="dbsName"
                        label="数据源名称"
                >
                </el-table-column>
                <el-table-column
                        prop="tabName"
                        label="表名"
                >
                </el-table-column>
                <el-table-column
                        prop="tabType"
                        label="表类型"
                >
                </el-table-column>
                <el-table-column
                        prop="day"
                        label="间隔天数"
                >
                </el-table-column>
                <el-table-column
                        prop="hour"
                        label="间隔小时"
                >
                </el-table-column>
                <el-table-column
                        prop="min"
                        label="间隔分钟"
                >
                </el-table-column>
                <el-table-column
                        prop="createBy"
                        label="创建者"
                >
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建日期"
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                                type="text"
                                @click="handleChange(scope.$index, scope.row)">启动
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
        <!--查询结果列表 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑-->
        <!--新增弹窗页 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓-->
        <div>
            <el-dialog title="定时任务添加"
                       :visible.sync="addFormDialog"
                       style="height: auto">
                <el-form v-model="addFormValue" class="demo-form-inline" :inline="true" >
                <el-form-item label="任务名称:" prop="timerName">
                    <el-input v-model="addFormValue.timerName"></el-input>
                </el-form-item>
                <el-form-item label="间隔天数:" prop="day">
                    <el-input v-model="addFormValue.day"></el-input>
                </el-form-item>
                <el-form-item label="间隔小时:" prop="hour">
                    <el-input v-model="addFormValue.hour"></el-input>
                </el-form-item>
                <el-form-item label="间隔分钟:" prop="min">
                    <el-input v-model="addFormValue.min"></el-input>
                </el-form-item>
                    <el-form-item label="数据源名称:"  prop="dbsName">
                        <el-select v-model="addFormValue.dbsName" placeholder="数据源名称" @change="changeDbsName">
                            <el-option
                                    v-for="item in addFormValue.dbsNameList"
                                    :key="item.dbsName"
                                    :label="item.dbsName"
                                    :value="item.dbsName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="表名: "  prop="tabName">
                        <el-select v-model="addFormValue.tabName" placeholder="表名" >
                            <el-option
                                    v-for="item in addFormValue.tabNameList"
                                    :key="item.tabName"
                                    :label="item.tabName"
                                    :value="item.tabName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="表类型:" prop="tabType">
                        <el-select v-model="addFormValue.tabType" placeholder="表类型">
                            <el-option
                                    :value-key="key"
                                    v-for="item,key in addFormValue.tabTypeList"
                                    :key="item.tabType"
                                    :label="item.lable"
                                    :value="item.tabType">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addFormDialog = false">取 消</el-button>
                    <el-button type="primary" @click.stop="saveTimer('addFormValue')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <!--新增弹窗页 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑-->
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
                seachForm:{
                    timerName:'',
                    flag:'',
                    dbsName:''
                },
                addFormValue:{
                    timerName:'',
                    dbsName:'',
                    min:'',
                    hour:'',
                    day:'',
                    tabType:'',
                    tabName:'',
                    tabTypeList:[{//表类型下拉框
                        tabType:1,
                        lable:'基础表'
                    },{
                        tabType:2,
                        lable:'业务表'
                    }],
                    dbsNameList:[],//数据源下拉框
                    tabNameList:[],//表名下拉框
                },

                total: 0, //总页数
                page: 1, //当前页数
                pageSize:15,
                pageSizeOptions:[15,20,25],
                height:400,
                addFormDialog:false,
            }
        },
        computed:{

        },
        created(){
            let dat =this
            //获取业务表列表
            AJAX.post('website/dyn/dynDataImportTimer/findAllList',{
                pageSize:dat.pageSize,
                pageNo:dat.page,
                timerName:dat.seachForm.timerName,
                flag:dat.seachForm.flag,
                dbsName:dat.seachForm.dbsName
            },function(data){
                dat.msg = data.data.data.data;
                dat.total=data.data.data.count;
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
                AJAX.post('website/dyn/dynDataImportTimer/findAllList',{
                    pageSize:dat.pageSize,
                    pageNo:page
                },function(data){
                  dat.msg = data.data.data.data;
                })

            },
            changePageSize(){
                let dat=this;
                AJAX.post('website/dyn/dynDataImportTimer/findAllList',{
                    pageSize:dat.pageSize,
                    pageNo:dat.page
                },function(data){
                  dat.msg = data.data.data.data;
                })
            },
            //获取业务表列表
            search(){
                let dat =this
                AJAX.post('website/dyn/dynDataImportTimer/findAllList',{
                    pageSize:dat.pageSize,
                    pageNo:dat.page,
                    timerName:dat.seachForm.timerName,
                    flag:dat.seachForm.flag,
                    dbsName:dat.seachForm.dbsName
                },function(data){
                  dat.msg = data.data.data.data;
                })
            },
            /*点击新增按钮*/
            addTimer(){
                let dat =this;
                AJAX.get('website/dyn/dynImportTab/getDataSource',{
                },(res1)=>{
                    dat.addFormValue.dbsNameList=res1.data;
                }),
                    dat.addFormDialog=true;
            },
            /*数据源change事件  val：选中数据值*/
            changeDbsName(val){
                let  dat=this;
                if(val!=''&&val){
                    AJAX.get('website/dyn/dynImportTab/getTabListByDbsName',{dbsName:val},(res1)=>{
                        dat.addFormValue.tabNameList=res1.data;
                        dat.addFormValue.tabName=""
                    })
                }

            },
            /*保存新增定时任务*/
            saveTimer(formValue){
                let dat = this;

                console.log(dat.addFormValue);
                console.log(JSON.stringify(dat.addFormValue));
                        AJAX.post('website/dyn/dynDataImportTimer/saveTimer',{params:JSON.stringify(dat.addFormValue)},function (data)
                        {

                            if(data.data.stateCode.code===200){
                                AJAX.post('website/dyn/dynDataImportTimer/findAllList',{
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

            },
            //启动
            handleChange(index,scope){
                let dat = this;
                console.log(scope);
              console.log(JSON.stringify(scope));
                AJAX.post('website/dyn/dynDataImportTimer/changeFlag',{params:JSON.stringify(scope)},(res)=>{
                    AJAX.post('website/dyn/dynDataImportTimer/findAllList',{
                        pageSize:dat.pageSize,
                        pageNo:dat.pageNo
                    },(res1)=>{
                        dat.msg = res1.data.data.data;
                    })
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
                    AJAX.delete('website/dyn/dynDataImportTimer/deleteById',{id:scope.id,tabName:scope.tabName},(res)=>{
                        AJAX.post('website/dyn/dynDataImportTimer/findAllList',{
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

<style lang="scss" scoped>
    .DataImportTimer{
        display: flex;
        flex-flow: column;
        position:relative;
        .header{
            width:100%;
            height:50px;
            line-height: 50px;
            .DataImportTimer{
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
