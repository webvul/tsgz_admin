<template>
    <div class="page">
        <div class="header">
            <el-form ref="form" :model="form" label-width="80px" class="title">
                <el-form-item label="业务包名" style="display: inline-block">
                    <el-input v-model="form.name" size="small" style="width:200px"></el-input>
                </el-form-item>
                <el-select v-model="form.value" filterable placeholder="请选择"
                           @change="choseVal"
                           size="small" class="select">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                    </el-option>
                </el-select>
            </el-form>
        </div>
        <div class="dabeList">
            <span v-for="item in list" :key="item.id" :title="item.tableNames" class="span" @click="handleTips(item)">
                <img src="./img/download.png" alt="" style="" />
                {{item.tableNames}}
            </span>
        </div>
        <el-dialog  :visible.sync="dialogTableVisible" size="middle" :show-close="false" class="mymodel">
            <div class="dialogHeader">
                <p class="title">表数据设置</p>
                <el-button type="primary" size="small" @click="preWatch">表预览</el-button>
            </div>
            <!--定位用-->
            <div class="pos">参与分析</div>
            <!--定位用,注意ref是全局的方法，一定不能重复-->
            <el-table :data="dabeList"  border :max-height="250"  row-key="id"
                      @select-all="selectedAll"  @select="select" ref="select_table"
            >
                <el-table-column label="原字段名" width="150" >
                    <template scope="scope">
                        <p @click="modalColumn(scope.row,scope.$index)">{{ scope.row.columnName }}</p>
                    </template>
                </el-table-column>
                <el-table-column property="columnType" label="类型" width="150"></el-table-column>
                <el-table-column label="转义名" width="100">
                    <template scope="scope">
                        <el-input v-model="scope.row.comments" size="small" class="noBorderInput"> </el-input>
                    </template>
                </el-table-column>
                <el-table-column property="relationTables" label="关联表" width="100"></el-table-column>
                <el-table-column type="selection" width="150" header-align="left"  align="center"
                                 :reserve-selection="true"
                >
                </el-table-column>
            </el-table>
            <div class="dialogFooter">
                <el-button type="default" size="small" @click="dialogTableVisible=false">关闭</el-button>
                <el-button type="danger" size="small" @click="saveDate">保存</el-button>
                <el-button type="primary" size="small" @click="deletePack">移除业务包</el-button>
            </div>
        </el-dialog>
        <!--表预览弹窗-->
        <el-dialog  :visible.sync="dialogTableVisible1" size="middle" title="表预览">
            <div style="overflow-x: auto; overflow-y: auto; max-height: 200px; width:600px;">
                <table  class="table table-bordered" style="table-layout:fixed;border-collapse:collapse;">
                    <thead>
                    <tr>
                        <th v-for="item in preTable.list" :title="item" style="width:150px;border-bottom-width: 1px;">
                            {{item.split("-")[0]}}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in preTable.alllist">
                        <td v-for="item1 in item">{{item1}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </el-dialog>
        <!--ID关联信息弹窗-->
        <el-dialog  :visible.sync="dialogTableVisible2" size="middle" title="表预览">
            <div class="relate_con">
                <div class="box box1">
                    <div class="text" id="texttable">{{tabNames}}</div>
                    <div class="text" id="textid">{{columnName}}</div>
                </div>
                <div class="box2">
                    <div :class="activeTabs===0?'item active':'item'" @click="cho_item(0)" >1:1</div>
                    <div :class="activeTabs===1?'item active':'item'" @click="cho_item(1)" >1:N</div>
                    <div :class="activeTabs===2?'item active':'item'" @click="cho_item(2)" >N:1</div>
                </div>
                <div class="box box3">
                    <div class="text" id="oppositetable"></div>
                    <div class="text" id="oppositeid"></div>
                </div>
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="close" @click="removeDabe">&times;</div>
            </div>
            <div class="relateDabeButton">
                <el-button type="primary" @click="contactTable">+ 关联到其他表</el-button>
            </div>
            <div class="tablist">
                <span v-for="item in 6" :key="item"  class="span">
                <img src="./img/download.png" alt="" style="" />
                {{333333333333333333}}
            </span>
            </div>
        </el-dialog>
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
                list:[],//展示包里面的表
                dabeList:[],//弹窗，表里面的相关信息
                dialogTableVisible: false, //模态框初始关闭状态
                dialogTableVisible1:false,//表预览弹窗
                dialogTableVisible2:false,//Id关联信息
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
                tabNames:'', //表名
                preTable:'', //表预览 表名
                activeTabs:0,//初始关联表
                columnName:''//字段名
            }

        },
        computed:{


        },
        created(){
            let _this = this;
           this.form.name=this.$route.query.name;
            AJAX.get('website/pack/updatesource',{id:this.$route.query.id},function(res){
                _this.list = res.list;
            })
        },
        mounted(){

        },
        methods:{
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
            handleTips(item){
                let _this = this;
                _this.dialogTableVisible=true;
                _this.tabNames=item.tableNames;
                AJAX.get("website/pack/getColumn",{
                    id:this.$route.query.id,
                    tablename:item.tableNames
                },function(res){
                    let cho=[];
                    _this.dabeList=res.list;
                    //设置初始选中项
                    _this.dabeList.map(function(item,key){
                        if(item.isJoin==='1'){
                           return  _this.$refs.select_table.toggleRowSelection(item,true);
                        }
                    });
                    //设置初始选中项结束

                })
            },
            select(selection,row){
                if(row.isJoin==='1'){
                    row.isJoin='2'
                }else{
                    row.isJoin='1'
                }
            },
            selectedAll(option){
                option.map((row)=>{
                    if(row.isJoin==='1'){
                        row.isJoin='2'
                    }else{
                        row.isJoin='1'
                    }
                })
            },
            saveDate(){
                console.log(this.dabeList);
            },
            deletePack(){
                let _this = this;
                this.$confirm('此操作将永久删除该业务包, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    AJAX.post("website/pack/deletePag",{
                        id:_this.$route.query.id,
                        tablename:_this.tabNames
                    },function(res){
                            _this.dialogTableVisible=false;
                            _this.list.map((item,key)=>{
                                if(item.tableNames===_this.tabNames){
                                    _this.list.splice(key,1);
                                }
                            })
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //表预览
            preWatch(){
                let _this = this;
                /*_this.dialogTableVisible=false;*/
                _this.dialogTableVisible1=true;
                AJAX.get("website/pack/findData",{
                    id:_this.$route.query.id,
                    name:_this.tabNames
                },function(res){
                    console.log(res);
                    _this.preTable=res.mapData;
                })
            },
            modalColumn(row,index){
                this.columnName=row.columnName;
                this.dialogTableVisible2=true;
            },
            cho_item(num){
                this.activeTabs=num;
            },
            removeDabe(){
                alert("移除")
            },
            //关联到其他表
            contactTable(){

            },
            //选择项
            choseVal(){
                console.log(this.form.value);
                switch (this.form.value){
                    case 'SQL' :{
                        this.$router.push('/pack/packSQL');
                        break;
                    }
                }
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
        line-height: 40px;
        border-bottom:1px solid #eee;
        .header_input{
            margin:0.1rem 0.2rem;
            width:300px;
        }
        .title{
            display: flex;
            flex-wrap: nowrap;
        }
        .select{
            position: relative;
            top:-1px;
            left:10px;
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
            overflow-y: hidden;
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
    .dialogHeader{
        .title{
            color: #317eac;
            font-weight:bold;
        }
        height:50px;
        align-items: center;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    .dialogFooter {
        height:50px;
        align-items: center;
        display: flex;
        flex-direction: row-reverse;
        .el-button{
            margin-left:10px;
        }
    }
    .pos{
        position: absolute;
        top:59px;
        color: #1f2d3d;
        font-weight: bold;
        z-index:100;
        right:75px;
    }
    /* 第二个模态框样式 */
    .relate_con{
        width:770px;
        height:150px;
        position:relative;
    }
    .relate_con .box1{
        position:absolute;
        border:1px solid #ddd;
        background:#eee;
        width:180px;
        height:90px;
        top:30px;
        left:0;
        overflow:hidden
    }
    .relate_con .box .text{
        width:100%;
        height:45px;
        line-height:45px;
        text-align:center;
    }
    .relate_con .box .text:nth-child(1){
        border-bottom:1px solid #ddd;
    }
    .relate_con .line1{
        position:absolute;

        background:#bbb;
        width:70px;
        height:1px;
        top:74.5px;
        left:180px;
        overflow:hidden
    }
    .relate_con .box2{
        position:absolute;
        border:1px solid #ddd;
        background:#eee;
        width:140px;
        height:130px;
        top:10px;
        left:250px;
        overflow:hidden
    }
    .relate_con .box2 .item{
        margin:8px 10px 0;
        background:#fff;
        width:120px;
        text-align:center;
        height:33px;
        line-height:33px;
    }
    .relate_con .box2 .item.active{
        background:#2fa4e7;
        color:#fff;
    }
    .relate_con .line2{
        position:absolute;

        background:#bbb;
        width:70px;
        height:1px;
        top:74.5px;
        left:390px;
        overflow:hidden
    }
    .relate_con .box3{
        position:absolute;
        border:1px solid #ddd;
        background:#eee;
        width:180px;
        height:90px;
        top:30px;
        left:460px;
        overflow:hidden
    }
    .relate_con .close{
        position:absolute;
        width:20px;
        height:20px;
        top:65px;
        right:40px;
    }
    .relateDabeButton{
        width:100%;
        height:40px;
        text-align:right;
        padding-right:10px;
    }
    .relateDabeButton button{
        width:120px;
        height:32px;
        border:none;
        background:#2fa4e7;
        color:#fff;
        border-radius:4px;

    }
    .tablist{
        width:100%;
        max-height:200px;
        overflow-y:auto;
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
            overflow-y: hidden;
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
    }
</style>
