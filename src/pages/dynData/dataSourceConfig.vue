<template>
    <div class="page DataSourceConfig"  ref="dataSourceContainer">

        <div>
            <el-form :inline="true" :model="labelData" class="demo-form-inline">
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
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table
                    :data="msg"
                    border
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
                        label="数据库IP">
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
                <el-pagination class="button" layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="BusinessTableList.count" style="padding-right:20px;">
                </el-pagination>
            </el-col>
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
                labelData:{
                    dbType:'',
                    dbsName:'',
                    dataBaseName:''
                },
                total: 0, //总页数
                page: 1, //当前页数
                pageSize:15,
                pageSizeOptions:[15,20,25],
               /* tableHeight:0,//表格容器的高度*/
                addFormDialog:false
            }
        },
        computed:{
            ...mapState(['BusinessTableList','formList','addFormListMsg']),
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
                dat.msg = data.data.data;
                console.log(data.data)
                console.log(data.data.data)
            })
        },
       /* mounted(){
            let _this =this;
            this.tableHeight=this.$refs.dataSourceContainer.offsetHeight-140;
            $(window).resize(function(){
                _this.tableHeight=$(window).height()-230;
            })
        },*/
        methods:{
            ...mapActions(['handleBusinessTableList','handleSearchBusinessTableList']),
            handleCurrentChange(page){
                this.page = page;
                this.handleBusinessTableList({
                    pageSize:this.pageSize,
                    pageNo:page
                })

            },
            changePageSize(){
                this.handleBusinessTableList({
                    pageSize:this.pageSize,
                    pageNo:this.page
                })
            },
            search(){
                let dat =this
                //获取业务表列表
                AJAX.post('website/dyn/dynDataSource/findAllList',{
                    pageSize:dat.pageSize,
                    pageNo:dat.page,
                    dbType:dat.labelData.dbType,
                    dbsName:dat.labelData.dbsName,
                    dataBaseName:dat.labelData.dataBaseName
                },function(data){
                    dat.msg = data.data.data;
                    console.log(data.data)
                })
            },
            handleEdit(index,row){
                console.log(row);
                let dat =this
                //获取业务表列表
                AJAX.post('website/dyn/dynDataSource/findDataById',{
                    dbType:dat.labelData.dbType,
                    dbsName:dat.labelData.dbsName,
                    dataBaseName:dat.labelData.dataBaseName
                },function(data){
                    dat.msg = data.data.data;
                    console.log(data.data)
                })
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