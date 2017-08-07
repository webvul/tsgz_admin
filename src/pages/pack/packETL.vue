<template>
    <div class="page">
        <el-row :gutter="20">
            <el-col :span="10" class="col_span">
                <div class="left_con">
                    <div class="header">
                        <h5>ETL处理</h5>
                        <el-button type="primary" size="small" @click="addDabe">+添加表</el-button>
                    </div>
                    <div class="content">
                            <span v-if="leftChodata===''" class="null">{{tableData}}</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="14" class="col_span">
                <div class="right_con">
                    <div class="header">
                        <h5>ETL处理</h5>
                        <el-button type="primary" size="small" @click="preWatch">表预览</el-button>
                    </div>
                    <div class="contain" :style="div_status">
                        <div class="dialogHeader">
                            <p class="title">表数据设置</p>
                        </div>
                        <div style="margin-bottom:10px;">
                            <el-input v-model="sqlname" placeholder="请输入" style="border: 1px solid #bfcbd9;"></el-input>
                        </div>
                        <!--&lt;!&ndash;定位用&ndash;&gt;-->
                        <div class="pos">参与分析</div>
                        <!--&lt;!&ndash;定位用,注意ref是全局的方法，一定不能重复&ndash;&gt;-->
                        <el-table :data="dabeList"  border :max-height="250"  row-key="columnName"
                                  @select-all="selectedAll"  @select="select" ref="select_table1"
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
                            <el-table-column label="关联表" width="100">
                                <template scope="scope">
                                    <span :title="scope.row.relationTables">{{scope.row.relationTables==='none'?'':scope.row.relationTables}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column type="selection" width="150" header-align="left"  align="center"
                                             :reserve-selection="true"
                            >
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="footer">
            <el-button type="default" @click="cancel">取消</el-button>
            <el-button type="primary" @click="saveData">保存</el-button>
        </div>
        <!--&lt;!&ndash;添加表弹窗&ndash;&gt;-->
        <el-dialog  :visible.sync="dialogEtlTableVisible" size="middle" title="ID关联信息">
            <div class="dialogHeader">
                <el-select v-model="form.value" filterable placeholder="请选择"
                           @change="choseVal"
                           style="width:80%"
                           size="small" class="select">
                    <el-option
                            v-for="item,key in dbsNameList"
                            :key="key"
                            :label="item.dbsName"
                            :value="item.dbsName">
                    </el-option>
                </el-select>
            </div>

            <div class="tablist">
                <span v-for="item,key in tableList" :key="key"  :class="firstcolor===key?'span active':'span'" @click="choosefirst(item,key)">
                <img src="./img/download.png" alt="" style="" />
                {{item.tabName}}
            </span>
            </div>
            <div class="relateDabeButton">
                <el-button type="default" @click="contactTable">下一步</el-button>
            </div>
        </el-dialog>
        <!--&lt;!&ndash;表预览弹窗&ndash;&gt;-->
        <el-dialog  :visible.sync="dialogTableVisible1" size="middle" title="表预览">
            <div style="overflow-x: auto; overflow-y: auto; max-height: 200px; width:600px;">
                <table  class="table table-bordered" style="table-layout:fixed;border-collapse:collapse;">
                    <thead>
                    <tr>
                        <th v-for="item,key1 in columnNameList" :key="key1" :title="item" style="width:150px;border-bottom-width: 1px;">
                            {{item.split("-")[0]}}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item,ke in nineDataList" :key="ke">
                        <td v-for="item1,key in item" :key="key">{{item1}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </el-dialog>
        <!--ID关联信息弹窗-->
        <el-dialog  :visible.sync="dialogEtlTableVisible2" size="middle" title="表预览">
            <div class="relate_con">
                <div class="box box1">
                    <div class="text" id="texttable">{{tableData}}</div>
                    <div class="text" id="textid">{{columnName}}</div>
                </div>
                <div class="box2">
                    <div :class="activeTabs==='0'?'item active':'item'" @click="cho_item('0')" >1:1</div>
                    <div :class="activeTabs==='1'?'item active':'item'" @click="cho_item('1')" >1:N</div>
                    <div :class="activeTabs==='2'?'item active':'item'" @click="cho_item('2')" >N:1</div>
                </div>
                <div class="box box3">
                    <div class="text" id="oppositetable">{{realtables}}</div>
                    <div class="text" id="oppositeid">{{realcolumn}}</div>
                </div>
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="close" @click="removeDabe">&times;</div>
            </div>
            <div class="relateDabeButton">
                <el-button type="primary" @click="contactOtherTable">+ 关联到其他表</el-button>
            </div>
            <div class="tablist" v-if="step===1">
                <span v-for="item,key in columnDataList" :key="key"  :class="color===key?'span active':'span'" @click="choItem(item,key)">
                <img src="./img/download.png" alt="" style="" />
                {{item.tabName}}
            </span>
            </div>
            <div class="tablist" v-if="step===2">
                <span v-for="item,key in columnDataList" :key="key"  :class="color2===key?'span active':'span'" @click="choItem2(item,key)">
                <img src="./img/download.png" alt="" style="" />
                {{item}}
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
                queryId:'',
                sqlname:'',
                preTable:'', //表预览 表名
                dabeList:[],//弹窗，表里面的相关信息
                dbsNameList:[],  //数据库连接
                leftChodata:'',
                dialogEtlTableVisible:false, //添加表弹窗
                dialogEtlTableVisible2:false, //添加表弹窗
                dialogTableVisible1:false,//表预览弹窗
                tableList:[], //根据数据连接得到的表
                firstcolor:'',
                tableData:'',
                columnNameList:[],
                nineDataList:[],
                div_status:'display:none',
                tabNames:'', //表名
                activeTabs:'0',//初始关联表
                columnName:'',//字段名
                columnDataList:[],//关联其他的表
                columnIndex:0,//点击表字段索引
                color:'',
                color2:'',
                step:1,
                realcolumn:'',
                realtables:'',
            }
        },
        computed:{

        },
        created(){
            this.queryId=this.$route.query.id;
        },
        methods:{
            //添加表弹窗
            addDabe(){
                this.dialogEtlTableVisible=true;
                this.tableList = [];
                //this.dbsNameList = [];
                let _this =this;
                AJAX.get('website/packsql/getTableConn',{},(res)=>{
                    console.log(res);
                    _this.dbsNameList = res;
                })
            },
            //添加表字段
            contactTable(){
                let _this = this;
                _this.dabeList = [];
                if(this.form.value=='' || this.tableData==''){
                    return this.$message.error('请选择数据连接和表');
                }else{
                    let sql = "select * from "+this.tableData;
                    _this.div_status = 'display:block';
                    AJAX.post('website/packsql/selectData',{name:this.form.value,sql:sql},(res)=> {
                        console.log(res)
                        _this.nineDataList = res.data.alllist;
                        _this.columnNameList = res.data.list;
                        this.dialogEtlTableVisible=false;
                        //设置初始选中项
                        window.setTimeout(()=>{
                            _this.dabeList.map(function(item,key){
                                if(item.isJoin==='1'){
                                    return  _this.$refs.select_table1.toggleRowSelection(item,true);
                                }
                            });
                        },200)
                        res.data.list.map(function(item,key){
                            // console.log(item)
                            _this.dabeList.push({
                                columnName:item.split("-")[0],
                                columnType:item.split("-")[1],
                                relationTables:'none',
                                isJoin:'1',
                                comments:'',
                                relationColumn:'',
                                correspondence:''
                            })
                        });
                    })
                }
            },
            //改变数据连接
            choseVal(){
               // console.log(this.form.value)
                let _this = this;
                AJAX.post('website/packadd/getTableByConn',{dbsName:this.form.value},(res)=>{
                   // console.log(res.data.list)
                    _this.tableList = res.data.list;
                    this.firstcolor = '';
                })
            },
            //选择哪个数据连接下的表
            choosefirst(item,key) {
                this.firstcolor = key;
                this.tableData = item.tabName;
            },
            modalColumn(row,index){
                this.columnDataList = '';
                this.step=1;
                this.color='';
                this.columnIndex=index;
                this.activeTabs='0';
                this.realtables = row.relationTables==='none'?'':row.relationTables;
                this.realcolumn = row.relationColumn;
                if(row.correspondence){
                    this.activeTabs = row.correspondence;
                }

                this.columnName=row.columnName;
                this.dialogEtlTableVisible2=true;
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
            //表预览
            preWatch(){
                let _this = this;
                /!*_this.dialogTableVisible=false;*!/
                _this.dialogTableVisible1=true;

            },
            //关联到其他表
            contactOtherTable(){
                let _this = this;
                AJAX.post("website/pack/getDataTableByName",{
                    dbsName:this.form.value
                },function(res){
                    //console.log(res.data.list);
                    _this.columnDataList = res.data.list;
                })
            },
            choItem(item,key){
                this.color=key;
                let _this = this;
                //console.log(item.tabName)
                AJAX.post("website/pack/getTableColumnByName",{
                    dbsName:this.form.value,
                    classname:item.tabName
                },function(res){
                    //console.log(res.list);
                    _this.columnDataList = res.data.list;
                    _this.realtables = item.tabName;
                    _this.realcolumn = '';
                    _this.step = 2;
                })
            },
            choItem2(item,key){
                this.color2=key;
                this.realcolumn = item;
                this.dabeList[this.columnIndex].relationTables=this.realtables;
                this.dabeList[this.columnIndex].relationColumn=item;
                this.dabeList[this.columnIndex].correspondence=this.activeTabs;
                console.log(this.dabeList)
                this.columnDataList = '';
                this.init();
            },
            init(){
                this.columnDataList = '';
                this.step = 1;
                this.color='';
                this.color2=''
            },
            cho_item(num){
                this.activeTabs=num;
            },
            removeDabe(){
                this.realtables = '';
                this.realcolumn = '';
                this.dabeList[this.columnIndex].relationTables='none';
                this.dabeList[this.columnIndex].relationColumn='';
            },
            saveData() {
                let _this = this;
                if(_this.sqlname.trim()==''){
                    return this.$message.error('请输入要保存的表名');
                }else{
                    AJAX.post("website/packsql/addsqlBase",{
                        dabeList:JSON.stringify(_this.dabeList),
                        pickid:_this.queryId,
                        dbsName:_this.form.value,
                        name:_this.sqlname
                    },function(res){
                        //console.log(res)
                        _this.$router.push({
                            path:'/pack/packDetail',
                            query:{id:_this.queryId,name:_this.$route.query.name}
                        });
                    })
                }
            },
            cancel(){
                this.$router.push({
                    path:'/pack/packDetail',
                    query:{id:this.queryId,name:this.$route.query.name}
                });
            },
        }


    };
</script>

<style lang="scss" scoped>
    .page{
        position:relative;
        .el-row{
            height:100%;
            margin-bottom:50px;
            .col_span{
                height:100%;
            }
            .left_con{
                margin-top:5px;
                border:1px solid #eee;
                .content{
                    width:100%;
                    height:420px;
                    .null{
                        display: inline-block;
                        width:100%;
                        margin-top:200px;
                        text-align: center;
                        color:#449d44;
                    }
                }



            }
            .right_con{
                margin-top:5px;
                border:1px solid #eee;
                .header{
                    padding:0 30px 0 6px;
                }
                .contain{
                    width:94%;
                    height:420px;
                    margin:5px 5% 0 1%;
                    overflow-y: auto;
                }
            }


        }
        .footer{
            position: absolute;
            bottom:45px;
            height:50px;
            width:100%;
            border-top:1px solid #eee;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:0 40px 0 10px;
            .el-button{

                width:100px;

                span{
                    display: inline-block;
                    line-height: 30px;
                    height:30px;
                }
            }
        }
        .header{
            height:50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom:1px solid #eee;
            padding:0 6px;
            h5{
                height:30px;
                line-height:30px;
                padding-left:4px;
                color: #317eac;
                font-weight: bold;
            }
        }

    }
    .relateDabeButton{
        margin-top:10px;
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
    .dialogHeader{
        width:100%;
        height:60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom:1px solid #ddd;
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



</style>
