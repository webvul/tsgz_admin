<template>
    <div class="page">
        <div class="header">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="业务包名" style="display: inline-block">
                    <el-input v-model="form.name" size="small" style="width:200px"></el-input>
                </el-form-item>
                <el-select v-model="form.value" filterable placeholder="请选择" size="small">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form>
        </div>
        <div class="dabeList">
            <span v-for="item in 4" :key="item" :title="'数据表'+item" class="span" @click="handleTips">
                <img src="./img/download.png" alt="" style="" />
                数据表{{item}}
            </span>
        </div>
        <el-dialog title="表数据设置" :visible.sync="dialogTableVisible" size="middle">
            <div class="pos">
                参与分析
            </div>
            <el-table :data="gridData"  border>
                <el-table-column property="name" label="原字段名" width="150"></el-table-column>
                <el-table-column property="type" label="类型" width="150"></el-table-column>
                <el-table-column property="rename" label="转义名" width="100"></el-table-column>
                <el-table-column property="relation" label="关联表" width="100"></el-table-column>
                <el-table-column type="selection" width="150" header-align="left"  align="center">
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               form:{
                   name:'',
                   value:''
               },
                dialogTableVisible: false, //模态框初始关闭状态
                gridData: [{
                    name: 'SDDDDFFF',
                    type: '王小虎',
                    rename: '',
                    relation:'ddd',
                    join:0
                }, {
                    name: 'SDDDDFFF',
                    type: '王小虎',
                    rename: 'dddd',
                    relation:'',
                    join:0
                },{
                    name: 'SDDDDFFF',
                    type: '王小虎',
                    rename: 'dddd',
                    relation:'',
                    join:0
                },{
                    name: 'SDDDDFFF',
                    type: '王小虎',
                    rename: '上海',
                    relation:'',
                    join:0
                },],
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
           this.form.name=this.$route.query.busPackageName
        },
        mounted(){

        },
        methods:{
            handleTips(){
                this.$message({
                    message: '只有添加成功之后才可以编辑哦',
                    type: 'warning'
                });
            },
            goback(){
                this.$router.go(-1);
            },
            handleFinish(){
                if(this.form.name===''){
                    return this.$message.error('你还没给包命名哦');
                }
                this.$router.push('/groupList')
            },
            handleIconClick(){
                alert("执行搜索")
            },
            handleTips(){
                this.dialogTableVisible=true;
            }
        }


    };
</script>

<style lang="scss" scoped>
    .page{
        position:relative;
    }
    .header{
        height:40px;
        margin-top:5px;
        border-bottom:1px solid #eee;
        .header_input{
            margin:0.1rem 0.2rem;
            width:300px;

        }
    }
    .dabeList{
        height:450px;
        width:95%;
        overflow-y: auto;
        padding: 0.2rem;
        .span{
            cursor: pointer;
            border:1px solid #ddd;
            margin-right:1.9%;
            margin-top:5px;
            display: inline-block;
            width:10.1%;
            padding-right:0.02rem;
            height:25px;
            line-height: 25px;
            overflow-x: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            &.active{
                background:#65cea7;
                color:#fff;
            }
            img{
                width:16px;
                height:16px;
                vertical-align: middle ;
                margin:0 4px;
            }

        }
        .el-table{

        }
    }
    .pos{
        width:100px;
        height:15px;
        position:absolute;
        top:78px;
        right:23px;
        z-index:2;
        font-size:14px;
        font-weight: bold;
    }
</style>
