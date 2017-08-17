<template>
    <div class="page ServiceTable" ref="serviceTableContainer">
        <div class="header">
            <el-form v-model="labelData" label-position="right" label-width="90px" class="ServiceTableForm">
                <el-form-item label="类型：">
                    <el-input v-model="labelData.type" size="small"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input v-model="labelData.desc" size="small"></el-input>
                </el-form-item>
                <el-button type="primary" size="small" class="btn1" @click="getList">
                    查询
                </el-button>
                <el-button type="primary" size="small" class="btn1" @click="add">
                    新增
                </el-button>
            </el-form>
        </div>
        <el-table
                :data="msg"
                :height="$store.state.screenHeight-230"
                border
                style="width:100%"
                >
            <el-table-column label="键值">
                <template scope="scope">
                    <span >{{ scope.row.value }}</span>
                </template>
            </el-table-column>
            <el-table-column label="标签">
                <template scope="scope">
                    <p>{{ scope.row.label }}</p>
                </template>
            </el-table-column>
            <el-table-column label="类型">
                <template scope="scope">
                    <p>{{ scope.row.type }}</p>
                </template>
            </el-table-column>
            <el-table-column label="描述">
                <template scope="scope">
                    <span>{{scope.row.description}}</span>
                </template>
            </el-table-column>
            <el-table-column label="排序">
                <template scope="scope">
                    <span>{{scope.row.sort}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button
                            size="small"
                            type="text"
                            @click="edit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button
                            size="small"
                            type="text"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar">
            <div class="left">
                <span style="padding-left:10px;">选择页数：</span>
                <el-select v-model="pageSize"  placeholder="选择页数" class="pageSize" size="small" @change="getList">
                    <el-option
                            v-for="item in pageSizeOptions"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
            <el-pagination class="button" layout="prev, pager, next" @current-change="getList" :page-size="pageSize" :total="total" style="padding-right:20px;">
            </el-pagination>
        </el-col>
        <el-dialog
                title="字典添加"
                :visible.sync="addFormDialog"
                size="tiny"
                >
            <el-form>
                <el-form-item label="键值">
                    <el-input v-model="form.value"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-input v-model="form.label"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-input v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remarks"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addFormDialog = false">取 消</el-button>
                <el-button type="primary" @click="submitAddFormList">确 定</el-button>
              </span>
        </el-dialog>

        <el-dialog
                title="字典编辑"
                :visible.sync="editFormDialog"
                size="tiny"
        >
            <el-form>
                <el-form-item label="键值">
                    <el-input v-model="editForm.value"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-input v-model="editForm.label"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-input v-model="editForm.type"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="editForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="editForm.sort"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="editForm.remarks"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addFormDialog = false">取 消</el-button>
                <el-button type="primary" @click="submitEditFormList(editForm.id)">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    import AJAX from '../../../assets/js/ajax';
    export default {
        data() {
            return {
                msg:[],
                labelData:{
                    desc:'',
                    type:'',
                },
                form:{
                    value:'',
                    label:'',
                    type:'',
                    desc:'',
                    sort:'',
                    remarks:'',
                },
                editForm:{
                    id:'',
                    value:'',
                    label:'',
                    type:'',
                    desc:'',
                    sort:'',
                    remarks:'',
                },
                total: 0, //总页数
                page: 1, //当前页数
                pageSize:15,
                pageSizeOptions:[15,20,25],
                tableHeight:0,//表格容器的高度
                addFormDialog:false,
                editFormDialog:false
            }
        },
        computed:{
        },
        created(){
            let dat = this
            //获取业务表列表
            AJAX.get("website/sys/dict/getDictList",{
                pageNo:this.page,
                pageSize:this.pageSize
            },function(data){
                dat.msg = data.data.dictList.list;
                dat.total=data.data.dictList.count;
            })
        },
        mounted(){

        },
        methods:{
            getList(page){
                let dat = this
                let labelData = this.labelData
                this.page = page;
                //获取业务表列表
                AJAX.get("website/sys/dict/getDictList",{
                    type:labelData.type,
                    desc:labelData.desc,
                    pageNo:this.page,
                    pageSize:this.pageSize
                },function(data){
                    dat.msg = data.data.dictList.list;
                    dat.total=data.data.dictList.count;
                })
            },
            //删除
            handleDelete(index,scope){
                let dat = Object.assign(scope,{
                    pageSize:this.pageSize,
                    pageNo:this.page
                });
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    AJAX.post('website/sys/dict/delete',{id:dat.id},(res)=>{
                        this.getList(dat.pageNo)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //新增
            add(){
                this.addFormDialog=true;
            },
            //新增
            submitAddFormList(){
                let _this = this;
                let form = _this.form;
                AJAX.post('website/sys/dict/saveOrEdit',
                    {
                        value : form.value,
                        label : form.label,
                        type : form.type,
                        description : form.desc,
                        sort : form.sort,
                        remarks : form.remarks,
                    },(res)=>{
                    if(res.data.stateCode.code===200){
                        this.addFormDialog=false;
                        this.getList(1)
                    }else{
                        this.$message.error(res.data.stateCode.msg);
                    }
                })
            },
            //根据id获得字典信息
            edit(index,scope){
                let dat = Object.assign(scope,{});
                let editForm = this.editForm;
                AJAX.get('website/sys/dict/getDict',{id:dat.id},function(data){
                    editForm.id = data.data.id;
                    editForm.value = data.data.value;
                    editForm.label = data.data.label;
                    editForm.type = data.data.type;
                    editForm.desc = data.data.description;
                    editForm.sort = data.data.sort;
                    editForm.remarks = data.data.remarks;
                })
                this.editFormDialog=true;
            },
            //修改
            submitEditFormList(id){
                let _this = this;
                let editForm = _this.editForm;
                AJAX.post('website/sys/dict/saveOrEdit',
                    {
                        id:id,
                        value : editForm.value,
                        label : editForm.label,
                        type : editForm.type,
                        description : editForm.desc,
                        sort : editForm.sort,
                        remarks : editForm.remarks,
                    },(res)=>{
                        if(res.data.stateCode.code===200){
                            this.editFormDialog=false;
                            this.getList(1)
                        }else{
                            this.$message.error(res.data.stateCode.msg);
                        }
                    })
            },

        },

    };
</script>

<style lang="scss">
    .ServiceTable{
        display: flex;
        flex-flow: column;
        position:relative;
       .header{
           width:100%;
           height:50px;
           line-height: 50px;
           .ServiceTableForm{
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
                   height:30px;
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
