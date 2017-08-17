<template>
    <div class="page">
        <el-row :gutter="20">
            <el-col :span="14" class="col_span">
                <div class="left_con">
                    <h5>SQL数据集配置</h5>
                    <div class="cho_data">
                        <span class="title1">数据来自数据连接</span>
                        <el-select v-model="form.value" filterable placeholder="请选择"
                                   size="small" class="select">
                            <el-option
                                    v-for="item,key in dbsNameList"
                                    :key="key"
                                    :label="item.dbsName"
                                    :value="item.dbsName">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="send_sql">
                        <div class="header">SQL语句</div>
                        <div id="sqldata"  contenteditable="true" class="contenteditable" placeholder="请输入SQL" ref="sqlvalue" ></div>
                    </div>
                </div>
            </el-col>
            <el-col :span="10" class="col_span">
                <div class="right_con">
                    <h5>表数据</h5>
                    <div class="prebutton">
                        <el-button type="default" size="small" @click="preview">预览</el-button>
                    </div>
                    <div class="contain">
                        <div style="overflow-x: auto; overflow-y: auto; height:100%; width:100%;">
                            <table  class="table table-bordered" style="table-layout:fixed;border-collapse:collapse;" v-if="hidePreTable">
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
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="footer">
            <el-button type="default">取消</el-button>
            <el-button type="primary" @click="openWindow" :disabled="button_status">保存</el-button>
        </div>
        <el-dialog  :visible.sync="dialogSqlTableVisible" size="middle" :show-close="false" class="mymodel">
            <div class="dialogHeader">
                <p class="title">表数据设置</p>
                <el-button type="primary" size="small" @click="">表预览</el-button>
            </div>
            <div style="margin-bottom:10px;">
                <el-input v-model="sqlname" placeholder="请输入" style="border: 1px solid #bfcbd9;"></el-input>
            </div>
            <!--定位用-->
            <div class="pos">参与分析</div>
            <!--定位用,注意ref是全局的方法，一定不能重复-->
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
            <div class="dialogFooter">
                <el-button type="default" size="small" @click="dialogSqlTableVisible=false">关闭</el-button>
                <el-button type="danger" size="small" @click="saveDate">保存</el-button>
            </div>
        </el-dialog>
        <!--ID关联信息弹窗-->
        <el-dialog  :visible.sync="dialogSqlTableVisible2" size="middle" title="表预览">
            <div class="relate_con">
                <div class="box box1">
                    <div class="text" id="texttable">{{tabNames}}</div>
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
                <el-button type="primary" @click="contactTable">+ 关联到其他表</el-button>
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
                sqlvalue:'',
                dbsNameList:[],
                hidePreTable:false,
                dialogSqlTableVisible: false,
                dialogSqlTableVisible2: false,
                preTable:{
                    list:[],
                    alllist:[]
                },
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
                dabeList:[],//弹窗，表里面的相关信息
                sqlname:'',
                button_status:true
            }
        },
        computed:{

        },
        created(){
            this.ajax();
        },
        methods:{
            ajax(){
                let _this =this;
                AJAX.get('website/packsql/getTableConn',{},(res)=>{
                    _this.dbsNameList = res.data;
                    //console.log(_this.dbsNameList)
                })
            },
            openWindow(){
                this.dialogSqlTableVisible = true;
                let _this = this;
                //设置初始选中项
                window.setTimeout(()=>{
                    _this.dabeList.map(function(item,key){
                        if(item.isJoin==='1'){
                            return  _this.$refs.select_table1.toggleRowSelection(item,true);
                        }
                    });
                },200)
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
                console.log(this.dabeList)
                console.log(this.form.value)
                console.log(this.$route.query.id)
                console.log(this.sqlname)
                let _this = this;
                if(_this.sqlname.trim()==''){
                    return this.$message.error('请输入要保存的表名');
                }else{
                    AJAX.post("website/packsql/addsqlBase",{
                        dabeList:JSON.stringify(_this.dabeList),
                        pickid:_this.$route.query.id,
                        dbsName:_this.form.value,
                        name:_this.sqlname
                    },function(res){
                        //console.log(res)
                        _this.$router.push({
                            path:'/pack/packDetail',
                            query:{id:_this.$route.query.id,name:_this.$route.query.name}
                        });
                    })
                }

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
                this.dialogSqlTableVisible2=true;
            },
            cho_item(num){
                this.activeTabs=num;
            },
            //关联到其他表
            contactTable(){
                let _this = this;
                AJAX.post("website/pack/getDataTableByName",{
                    dbsName:this.form.value
                },function(res){
                    //console.log(res.data.list);
                    _this.columnDataList = res.data.data.list;
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
                    _this.columnDataList = res.data.data.list;
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
            removeDabe(){
                this.realtables = '';
                this.realcolumn = '';
                this.dabeList[this.columnIndex].relationTables='none';
                this.dabeList[this.columnIndex].relationColumn='';
            },
            preview(){
                /*console.log(this.form.value);
                console.log(this.$refs.sqlvalue.innerHTML);*/
                let _this = this;
                let name = this.form.value;
                let sql = this.$refs.sqlvalue.innerHTML;
                if(name == '' || sql == ''){
                    return this.$message.error('请确定数据连接和sql都存在');
                }else{
                     AJAX.post('website/packsql/selectData',{name:name,sql:sql},(res)=>{
                        //console.log(res)
                         _this.button_status = true;
                         _this.preTable.list = '';
                         _this.preTable.alllist = '';
                         if(res.data.data.error=='true'){
                             return this.$message.error('sql错误');
                         }else{
                             _this.hidePreTable = true;
//                             console.log(res)
                             _this.preTable.list = res.data.data.list;
                             _this.preTable.alllist = res.data.data.alllist;
                             //_this.dabeList = res.data.list;
                            // console.log(res.data.list)
                            res.data.data.list.map(function(item,key){
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
                            _this.button_status = false;
                         }
                    })
                }

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
                .cho_data{
                    display: flex;
                    justify-content: space-between;
                    padding:0 20px;
                }
                .send_sql{
                    position:relative;
                    clear:both;
                    width:96%;
                    height:400px;
                    margin:20px 2% 0;
                    border:1px solid #ddd;
                }
                .send_sql .header{
                    background:#eee;
                    text-align:center;
                    height:30px;
                    line-height:30px;
                }
                .contenteditable{
                    height:370px;
                    padding:10px;
                    font-size:16px;
                }
                .contenteditable:empty:before{
                    content:attr(placeholder);
                    font-size: 16px;
                    color: #999;
                }
                .contenteditable:focus:before{
                    content:none;
                }

            }
            .right_con{
                margin-top:5px;
                border:1px solid #eee;
                .prebutton{
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                    border-bottom:2px solid #eee;
                    .el-button{
                        width: 100px;
                        height: 30px;
                        background: #ccc;
                        border: none;
                    }
                }
                .contain{
                    width:94%;
                    height:385px;
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

    }
    h5{
        height:30px;
        line-height:30px;
        padding-left:4px;
        border-bottom:1px solid #eee;
        color: #317eac;
        font-weight: bold;
    }
    td{

    }
    th{

    }
    .dialogHeader{
        .title1{
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
        top:105px;
        color: #1f2d3d;
        font-weight: bold;
        z-index:100;
        right:70px;
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
