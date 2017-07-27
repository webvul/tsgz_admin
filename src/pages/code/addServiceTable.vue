<template>
    <div class="page addServiceTable" ref="pageAddContainer">
        <header>
            <div class="title">基本信息</div>
            <el-form v-model="addFormList.genTable" label-position="right" label-width="90px" class="tableForm">
                <el-form-item label="表名：">
                    <el-input v-model="addFormList.genTable.name" :disabled="true" size="small"></el-input>
                </el-form-item>
                <el-form-item label="说明：">
                    <el-input v-model="addFormList.genTable.comments" size="small"></el-input>
                </el-form-item>
                <el-form-item label="类名：">
                    <el-input v-model="addFormList.genTable.className" size="small"></el-input>
                </el-form-item>
            </el-form>
            <div class="selectForm">
                <el-form label-position="right" label-width="100px" v-model="addFormList.genTable">
                    <el-form-item label="父表表名：" >
                        <el-select v-model="addFormList.genTable.parentTable" filterable placeholder="请输入" size="small">
                            <el-option
                                    v-for="item in addFormList.tableList"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="当前表外键：">
                        <el-select v-model="addFormList.genTable.parentTableFk" filterable placeholder="请输入" size="small">
                            <el-option
                                    v-for="item in addFormList.genTable.columnList"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </header>
        <div class="tableList" style="padding:0 15px 0 5px;">
            <div class="header">
                字段列表
            </div>
            <el-table
                    :data="addFormList.genTable.columnList"
                    border
                    :height="tableContainerHeight"
                    :style="'width:100%;height:'+tableContainerHeight"
                    >
                <el-table-column
                        label="列名"
                        >
                    <template scope="scope">
                        <span :title="scope.row.name">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="说明"
                        >
                    <template scope="scope">
                        <el-input v-model="scope.row.comments" size="small"> </el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="物理类型"
                        prop="jdbcType"

                >
                </el-table-column>
                <el-table-column
                        label="JAVA类型"
                        width="120"
                >
                    <template scope="scope">
                        <el-select v-model="scope.row.javaType" filterable placeholder="请输入" size="small">
                            <el-option
                                    style="width:100px"
                                    :title="item.value"
                                    v-for="item in addFormList.cofig.javaTypeList"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        label="JAVA属性名称"
                        width="120"
                >
                    <template scope="scope">
                        <el-input v-model="scope.row.javaField" size="small"> </el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="主键"
                        width="50"
                >
                    <template scope="scope"
                    >
                        <el-checkbox v-model="scope.row.isPk" ></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                        label="可空"
                        width="50"
                >
                    <template scope="scope">
                        <el-checkbox v-model="scope.row.isNull"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                        label="插入"
                        width="50"
                >
                    <template scope="scope">
                        <el-checkbox v-model="scope.row.isInsert" ></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                        label="编辑"
                        width="50"
                >
                    <template scope="scope">
                        <el-checkbox v-model="scope.row.isEdit"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                        label="列表"
                        width="50"
                >
                    <template scope="scope">
                        <el-checkbox v-model="scope.row.isList" ></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                        label="查询"
                        width="50"
                >
                    <template scope="scope">
                        <el-checkbox v-model="scope.row.isQuery"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                        label="查询匹配方式"
                        width="120"
                >
                    <template scope="scope">
                        <el-select v-model="scope.row.queryType" filterable placeholder="请输入" size="small">
                            <el-option
                                    style="width:120px"
                                    :title="item.value"
                                    v-for="item in addFormList.cofig.queryTypeList"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        label="显示表单类型"
                        width="120"
                >
                    <template scope="scope">
                        <el-select v-model="scope.row.showType" filterable placeholder="请输入" size="small">
                            <el-option
                                    style="width:100px"
                                    :title="item.label"
                                    v-for="item in addFormList.cofig.showTypeList"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        label="字典类型"
                        width="70"
                >
                    <template scope="scope">
                        <el-input v-model="scope.row.dictType" size="small"> </el-input>
                    </template>
                </el-table-column><el-table-column
                    label="排序"
                    width="60"
            >
                <template scope="scope">
                    <el-input v-model="scope.row.sort" size="small"> </el-input>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <footer class="footer_addService">
            <el-button type="text" size="small">返回</el-button>
            <el-button type="primary" size="small" @click="submit">确认</el-button>
        </footer>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex';
    export default {
        data() {
            return {
               tableContainerHeight:0
            }
        },
        computed:{
            ...mapState(['addFormList']),
        },
        created(){
            this.$store.commit("deleFormListMsg");
            this.handleAddFormList({
                name:this.$route.query.name,
                id:this.$route.query.id
            })

        },
        mounted(){
            let _this = this;
            this.tableContainerHeight = this.$refs.pageAddContainer.offsetHeight-270;
            $(window).resize(function(){
                _this.tableContainerHeight=$(window).height()-360;
            })

        },
        watch:{

        },
        methods:{
            ...mapActions(['handleAddFormList']),
            submit(){
                //转换函数，识别不了字符串 0 1
                let trans=(obj,key)=>{
                    if(obj[key]===true) obj[key]='1';
                    if(obj[key]===false) obj[key]='0';
                };
                this.addFormList.genTable.columnList.map(function(item,key){
                    for(let i in item) {trans(item,i)}
                });
                console.log(this.addFormList.genTable.columnList)

            }

        },


    };
</script>

<style lang="scss">
    .addServiceTable{
        input{
            border-radius: 0 !important;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner{
            border-radius:0 !important;
        }
        position:relative;
        .title{
            padding-left:15px;
            font-size:16px;
            font-weight:bold;
            height:40px;
            line-height: 40px;
            color:#0088CC;
        }
        .tableForm{
            border-top:1px solid #ddd;
            border-bottom:1px solid #ddd;
            display: flex;
            height:50px;
            line-height: 50px;
            .el-form-item{
                position:relative;
                margin-left:-20px;
                top:6px;
                &:nth-child(2){
                   margin-left:-30px;
                }

            }
            .el-input{
                width:180px;
            }
            .el-form-item__label{
                width:50px;
            }
            .btn1{
                margin-top:4px;
                width:50px;
                height:30px;
            }
        }
    .selectForm{
        height:50px;
        border-bottom:1px solid #ddd;
        .el-form{
            display: flex;
            top:6px;
            position:relative;
            .el-form-item{
                position:relative;
                &:nth-child(1){
                    left:-5px;
                }
                &:nth-child(2){
                    left:5px;
                }
            }
        }
    }
        .tableList .header{
            padding-left:15px;
            font-size:16px;
            font-weight:bold;
            height:40px;
            line-height: 40px;
            color:#0088CC;
        }
        /*控制表格的整体样式*/

        .el-table .cell{
            font-size:12px !important;
            padding-left:5px;
            padding-right:5px;
        }
        .footer_addService{
            position:absolute;
            bottom:45px;
            height:40px;
            width:100%;
            line-height:40px;
            padding-left:20px;

        }
    }

</style>
