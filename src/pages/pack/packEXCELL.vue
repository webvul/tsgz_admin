<template>
    <div class="page pageExcell">
        <el-row :gutter="20">
            <el-col :span="14" class="col_span">
                <div class="left_con">
                    <div>
                        <h5>Excell数据集配置</h5>
                        <div class="header">
                            <p>上传信息</p>
                            <div class="icon_button">
                                <el-button type="primary" size="small" style="margin-right:5px;" @click="openWindow">上传数据</el-button>
                                <i class="el-icon-warning" style="font-size:20px;color:#22bf98" @click="openWindowKnow"></i>
                            </div>
                        </div>
                        <div id="preData">
                            <table class="table"  v-if="hideColumnPreTable">
                                <thead>
                                <tr>
                                    <th>字段名</th>
                                    <th>字段类型</th>
                                    <th>列名</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item,key in columnList">
                                    <td>{{item.name}}</td>
                                    <td>ABC</td>
                                    <td><el-input v-model="item.input"></el-input></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="10" class="col_span">
                <div class="right_con">
                    <h5>表数据</h5>
                    <div class="contain">
                        <span v-if="columnList.length>1" class="preSpan">
                            请上传excell数据
                        </span>
                        <div style="overflow-x: auto; overflow-y: auto; height:90%; width:100%;">
                            <table  class="table table-bordered" style="table-layout:fixed;border-collapse:collapse;" v-if="hidePreTable">
                                <thead>
                                <tr>
                                    <th v-for="item,key in columnList" :title="item.item" style="width:150px;border-bottom-width: 1px;">
                                        {{item.name}}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in alllist">
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
            <el-button type="default" size="small">取消</el-button>
            <el-button type="primary" size="small" @click="openAddWindow">保存</el-button>
        </div>
        <!--弹窗-->
        <el-dialog  :visible.sync="dialogTableVisible"   title="导入数据" class="dialogModal">
            <div class="submitButton">
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        :action="$store.state.prefix+'/jad-saas-mgmt/api/website/packexcel/importFile'"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :multiple="false"
                        :auto-upload="true"
                >
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button slot="trigger" size="small" type="primary" @click.stop="importFile">导入</el-button>
                    <p>{{file.fileName}}</p>
                </el-upload>
            </div>
            <div class="dialogFooter">
                <span>导入文件不能超过5M，仅允许导入xls、csv、xlsx格式文件</span>
                <el-button type="default" size="small" @click="dialogTableVisible=false">关闭</el-button>
            </div>
        </el-dialog>
        <!--注意事项-->
        <el-dialog  :visible.sync="dialogTableVisible1"  :show-close="false" class="mymodel">
            <div class="dialogHeader">
                <p class="title">注意事项</p>
            </div>
            <!--定位用-->
            <div class="pos">参与分析</div>

            <div class="dialogFooter">
                <el-button type="default" size="small" @click="dialogTableVisible=false">关闭</el-button>
            </div>
        </el-dialog>

        <el-dialog  :visible.sync="dialogExcelTableVisible" size="middle" :show-close="false" class="mymodel">
            <div class="dialogHeader">
                <p class="title">表数据设置</p>
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
                <el-button type="default" size="small" @click="dialogExcelTableVisible=false">关闭</el-button>
                <el-button type="danger" size="small" @click="saveDate">保存</el-button>
            </div>
        </el-dialog>
        <!--ID关联信息弹窗-->
        <el-dialog  :visible.sync="dialogExcelTableVisible2" size="middle" title="表预览">
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
    import {isRepeat} from './../../utils'
    export default {
        data() {
            return {
                form:{
                    name:'',
                    value:''
                },
                code:'',
                excellData:'',
                dialogTableVisible:false,
                dialogTableVisible1:false,
                dialogExcelTableVisible: false,
                dialogExcelTableVisible2:false,
                file:'',
                alllist:[],
                dabeList:[],//弹窗，表里面的相关信息
                sqlname:'',
                columnList:[{name:'',input:''}],
                hidePreTable:false,
                hideColumnPreTable:false,
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
           /* console.log(this.$store.state.prefix)
            console.log(JSON.parse(sessionStorage.getItem('Token')))*/
            this.code=JSON.parse(sessionStorage.getItem('Token'));
        },
        methods:{
            openWindow(){
                this.dialogTableVisible = true;
            },
            openWindowKnow(){
                this.dialogTableVisible1 = true;
            },
            handleAvatarSuccess(file){
              //console.log(file.data)
                this.file=file.data;
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
            modalColumn(row,index){
               /* this.columnDataList = '';
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
                this.dialogExcelTableVisible2=true;*/
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
               // console.log(this.dabeList)
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
                        dbsName:'0',
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
            importFile(){
                let _this =this;
                this.dialogTableVisible=false;
                this.hidePreTable=true;
                this.hideColumnPreTable=true;
                this.file.columnList.map(function(item,key){
                    _this.columnList.push({
                        name:item,
                        input:''
                    })
                })
                _this.columnList.shift();
                this.alllist=this.file.objLists;
            },
            openAddWindow(){
                let temp_arr=[];
                this.columnList.map(function(item,key){
                    temp_arr.push(item.input);
                });
                console.log(temp_arr)
                let test =isRepeat(temp_arr);
                let _this = this;
                if(test===1){
                    return this.$message.error('列名不能有重复项');
                }else if(test===2){
                    return this.$message.error('列名不能有空');
                }else{
                    this.dialogExcelTableVisible = true;

                    this.columnList.map(function(item,key){
                        // console.log(item)
                        _this.dabeList.push({
                            columnName:item.input,
                            columnType:'VARCHAR',
                            relationTables:'none',
                            isJoin:'1',
                            comments:item.name,
                            relationColumn:'',
                            correspondence:''
                        })
                    });
                    //设置初始选中项
                    window.setTimeout(()=>{
                        _this.dabeList.map(function(item,key){
                            if(item.isJoin==='1'){
                                return  _this.$refs.select_table1.toggleRowSelection(item,true);
                            }
                        });
                    },200);
                    console.log(_this.dabeList)
                }
            }
        }
    };
</script>

<style lang="scss">
    .pageExcell{
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
                #preData{
                    max-height:400px;
                    height:400px;
                    overflow: auto;
                }

            }
            .right_con{
                margin-top:5px;
                border:1px solid #eee;
                .contain{
                    width:94%;
                    height:442px;
                    margin:5px 5% 0 1%;
                    overflow-y: auto;
                    .preSpan{
                        display: inline-block;
                        width:100%;
                        text-align: center;
                        font-size:16px;
                        color:#999;
                        padding-top:20px;
                    }
                }
            }


        }
        .footer{
            position: absolute;
            bottom:30px;
            height:50px;
            width:100%;
            border-top:1px solid #eee;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:0 40px 0 10px;
            .el-button{
                width:100px;
                padding:0;
                span{
                    display: inline-block;
                    line-height: 30px;
                    height:30px;
                }
            }
        }
        .header{
            p{
                font-size:14px;
                color:#999;
            }
            text-align:center;
            height:50px;
            line-height:50px;
            padding:0 6px;
            display: flex;
            justify-content: space-between;
            .icon_button{
                cursor: pointer;
                display: flex;
                align-items: center;
                padding-right:5px;
            }
        }
        h5{
            height:50px;
            line-height:50px;
            padding:0 6px;
            border-bottom:1px solid #eee;
            color: #317eac;
            font-weight: bold;
            margin-top:0;
            margin-bottom:0;
            background:#eee;
        }
        .dialogModal .el-dialog{
            .el-dialog__body{
                padding:20px 0 0!important;
            }
            .submitButton{
                input{
                    padding-left:180px;
                }
                height:100px;
                text-align: center;
                .el-button{
                    margin-top:20px;
                }
            }
        }
        .dialogFooter{
            height:40px;
            background-color: #eee;
            white-space: nowrap;
            align-items: center;
            display: flex;
            justify-content: space-between;
            padding:0 10px;
        }
        .el-upload__input{
            display: none !important;
        }
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
