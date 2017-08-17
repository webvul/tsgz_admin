<template>
    <div class="page ServiceTable" ref="serviceTableContainer">
        <div class="header">
            <!--<el-form label-position="right" label-width="90px" class="ServiceTableForm">
                <el-button type="primary" size="small" class="btn1" @click="add">
                    新增
                </el-button>
            </el-form>-->
            <template>
                <el-tabs v-model="tab" type="card" @tab-click="add">
                    <el-tab-pane label="角色列表" name="first">角色列表</el-tab-pane>
                    <el-tab-pane label="角色添加" name="second">角色添加</el-tab-pane>
                </el-tabs>
            </template>
        </div>
        <el-table
                :data="msg"
                :max-height="1000"
                border
                style="width:100%"
                >
            <el-table-column label="角色名称">
                <template scope="scope">
                    <span >{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="英文名称">
                <template scope="scope">
                    <p>{{ scope.row.enname }}</p>
                </template>
            </el-table-column>
            <el-table-column label="归属机构">
                <template scope="scope">
                    <p>{{ scope.row.office.name }}</p>
                </template>
            </el-table-column>
            <el-table-column label="数据范围">
                <template scope="scope">
                    <span>{{scope.row.dataScope}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button
                            size="small"
                            type="text"
                            @click="edit(scope.$index, scope.row)">分配
                    </el-button>
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

            </div>

        </el-col>
        <el-dialog
                title="添加角色"
                :visible.sync="addFormDialog"
                size="tiny"
                >
            <el-form>
                <el-form-item label="归属机构">
                    <el-input v-model="form.office"></el-input>
                </el-form-item>
                <el-form-item label="角色名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="英文名称">
                    <el-input v-model="form.enname"></el-input>
                </el-form-item>
                <el-form-item label="角色类型">
                    <el-select v-model="form.roleType" placeholder="请选择">
                        <el-option label="普通角色" value="1"></el-option>
                        <el-option label="管理角色" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否系统数据">
                    <el-select v-model="form.sysData" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否可用">
                    <el-select v-model="form.useable" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据范围">
                    <el-select v-model="form.dataScope" placeholder="请选择">
                        <el-option label="所有数据" value="1"></el-option>
                        <el-option label="所在公司及以下数据" value="2"></el-option>
                        <el-option label="所在公司数据" value="3"></el-option>
                        <el-option label="所在部门已以下数据" value="4"></el-option>
                        <el-option label="所在部门数据" value="5"></el-option>
                        <el-option label="仅本人数据" value="8"></el-option>
                        <el-option label="按明细设置" value="9"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色授权">
                    <el-tree
                        :highlight-current="true"
                        :class="'filter-tree'"
                        :data="menuList"
                        :props="defaultProps"
                        default-expand-all
                        style="font-size:12px;"
                        node-key="name"
                        current-node-key="name"
                        :filter-node-method="filterNode">
                    </el-tree>
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
    import AJAX from './../../assets/js/ajax';
    export default {
        data() {
            return {
                msg:[],
                form:{
                    office:'',
                    name:'',
                    enname:'',
                    roleType:'',
                    dataScope:'',
                    sysData:'',
                    useable:'',
                    menuList:[],
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
                tableHeight:0,//表格容器的高度
                addFormDialog:false,
                editFormDialog:false,
                tab: 'first',
                //树结构
                defaultProps: {
                    children: 'children',
                    label: 'name',
                },
            }
        },
        computed:{
        },
        created(){
            let dat = this
            //获取业务表列表
            AJAX.get("website/sys/role/getRoleList",{

            },function(data){
                dat.msg = data;
            })
        },
        mounted(){

        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },

            getList(){
                let dat = this
                let labelData = this.labelData
                //获取业务表列表
                AJAX.get("website/sys/dict/getDictList",{
                    type:labelData.type,
                    desc:labelData.desc,
                },function(data){
                    dat.msg = data.dictList.list;
                })
            },
            //删除
            handleDelete(index,scope){
                let dat = Object.assign(scope,{

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
                let form = this.form;
                AJAX.get('website/sys/role/getRoleForm',{},(res)=>{
                    alert(JSON.stringify(res.menuList))
                    form.menuList = res.menuList
                })
                this.addFormDialog=true;
            },
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
                    if(res.data.code==='0'){
                        this.addFormDialog=false;
                        this.getList(1)
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            //修改
            edit(index,scope){
                let dat = Object.assign(scope,{});
                let editForm = this.editForm;
                AJAX.get('website/sys/dict/getDict',{id:dat.id},function(data){
                    editForm.id = data.id;
                    editForm.value = data.value;
                    editForm.label = data.label;
                    editForm.type = data.type;
                    editForm.desc = data.description;
                    editForm.sort = data.sort;
                    editForm.remarks = data.remarks;
                })
                this.editFormDialog=true;
            },
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
                        if(res.data.code==='0'){
                            this.editFormDialog=false;
                            this.getList(1)
                        }else{
                            this.$message.error(res.data.msg);
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
