<template>
    <div class="page DataSourceConfig"  ref="dataSourceContainer">

        <div>
            <el-form :inline="true" v-model="labelData" class="demo-form-inline" style="position:relative;top:15px;">
                <el-form-item labelWidth="30px"></el-form-item>
                <el-form-item label="操作菜单：">
                    <el-input v-model="labelData.title" placeholder="操作菜单" ></el-input>
                </el-form-item>
                <el-form-item label="用户ID：">
                    <el-input v-model="labelData.userId" placeholder="用户ID" ></el-input>
                </el-form-item>
                <el-form-item label="URL：">
                    <el-input v-model="labelData.requestUri"placeholder="URL"  ></el-input>
                </el-form-item>

            </el-form>
            <el-form :inline="true" v-model="labelData2" class="demo-form-inline"  >
                <el-form-item labelWidth="30px"></el-form-item>
                    <template>
                      <span><label calss="el-form-item__label">日期范围:</label></span>
                                        <el-date-picker
                                                v-model="labelData2.beginDate"
                                                align="right"
                                                type="date"
                                                placeholder="选择日期" >
                                        </el-date-picker>
                        -  -
                                        <el-date-picker
                                                v-model="labelData2.endDate"
                                                align="right"
                                                type="date"
                                                placeholder="选择日期" >
                                        </el-date-picker>
                                        <el-checkbox v-model="checked">只查询异常信息 </el-checkbox>

                    </template>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="height:400px;width:100%;overflow: scroll" class="loglist">
            <table class="table table-bordered"  >
                <thead>
                <tr>
                    <th>操作菜单</th>
                    <th>操作用户</th>
                    <th>所在公司</th>
                    <th>所在部门</th>
                    <th>URI</th>
                    <th>提交方式</th>
                    <th>操作者IP</th>
                    <th>操作时间</th>
                </tr>
                </thead>
                <tbody>
                <template v-for="item in msg ">
                    <tr>
                        <td>{{item.title}}</td>
                        <td>{{item.userName}}</td>
                        <td>{{item.companyName}}</td>
                        <td>{{item.officeName}}</td>
                        <td>{{item.requestUri}}</td>
                        <td>{{item.method}}</td>
                        <td>{{item.remoteAddr}}</td>
                        <td>{{item.createDate}}</td>
                    </tr>
                    <tr v-if="item.exception">
                        <td colspan="8" style="word-wrap:break-word;word-break:break-all;">
                            异常信息: <br/><span v-html="item.exception">

                            </span>

                        </td>
                    </tr>
                </template>

                </tbody>
            </table>
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

    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex';
    export default {
        data() {
            return {
                msg:[],
                checked: false,
                labelData:{
                    title:'',
                    userName:'',
                    requestUri:''
                },
                labelData2:{
                    beginDate:'',
                    endDate:''
                },
                formValue:{
                    title:'',
                    userName:'',
                    companyName:'',
                    officeName:'',
                    requestUri:'',
                    method:'',
                    remoteAddr:'',
                    createDate:''
                },

                total: 0, //总页数
                page: 1, //当前页数
                pageSize:15,
                pageSizeOptions:[15,20,25],
                tableHeight:0,//表格容器的高度
                updateFormDialog:false,
                addFormDialog:false,
                index:-1 //点击行号
            }
        },       computed:{
        },
        created(){
            let dat =this;
          this.getSysLoglist(dat)
        },
        mounted(){
            let _this =this;
            this.tableHeight=$(window).height()-245;
            $(window).resize(function(){
                _this.tableHeight=$(window).height()-245;
            })
        },
        methods:{
          ...mapActions(['getSysLoglist']),
            handleCurrentChange(page){
                let dat=this;
                dat.page = page;
                this.getSysLoglist(dat)
            },
            changePageSize(){
                let dat=this;
              this.getSysLoglist(dat)
            },
            //获取日志列表
            search(){
                let dat =this;
              this.getSysLoglist(dat)
            },
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
      .loglist table{
        border-width: 1px;
        border-collapse: collapse;
      }
      .loglist table th{
        border-width: 1px;
      }
      .loglist table tr td{
        border-width: 1px;
      }

    }

</style>
