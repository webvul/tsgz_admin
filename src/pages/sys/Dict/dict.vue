<template>
    <div class="page dict_manager" ref="serviceTableContainer">
        <div class="header">
            <el-form v-model="labelData" label-position="right" label-width="90px" class="ServiceTableForm">
                <el-form-item label="类型：">
                    <el-input v-model="labelData.type" size="small"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input v-model="labelData.description" size="small"></el-input>
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
                :height="$store.state.screenHeight-220"
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
      <qgs_dialog
        :dialog="editFormDialog"
        @cancle="editFormDialog=false"
        :title="'商品新增/编辑'"
        @submit="handleSubmitEdit"
      >
        <div class="el-dialog-body">
          <el-form :label-position="'right'" label-width="60px" :model="form" ref="ruleForm" :rules="rules">
            <div style="display: inline-block">
              <el-form-item label="类型" prop="type">
                <el-input v-model="form.type" size="small"></el-input>
              </el-form-item>
              <el-form-item label="标签" prop="label">
                <el-input v-model="form.label" size="small"></el-input>
              </el-form-item>
              <el-form-item label="键值">
                <el-input v-model="form.value" size="small"></el-input>
              </el-form-item>
            </div>
            <div style="display: inline-block">
              <el-form-item label="描述">
                <el-input v-model="form.description" size="small"></el-input>
              </el-form-item>
              <el-form-item label="排序">
                <el-input v-model="form.sort" size="small"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="form.remarks" size="small"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>

      </qgs_dialog>
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
        <el-pagination class="button_page" layout="prev, pager, next" @current-change="getList" :page-size="pageSize" :total="total" style="padding-right:20px;">
        </el-pagination>
      </el-col>
    </div>

</template>

<script>
    import AJAX from '../../../assets/js/ajax';
    import qgs_dialog from '@/components/Common/qgs-dialog.vue'
    export default {
        components:{
          qgs_dialog
        },
        data() {
            return {
                msg:[],
                labelData:{
                    description:'',
                    type:'',
                },
                form:{
                    value:'',
                    label:'',
                    type:'',
                    description:'',
                    sort:'',
                    remarks:'',
                },
              rules:{
                label:{ required: true, message: '', trigger: 'blur' },
                type:{ required: true, message: null, trigger: 'blur' }
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
                    description:labelData.description,
                    pageNo:this.page,
                    pageSize:this.pageSize
                },function(data){
                    dat.msg = data.data.dictList.list;
                    dat.total=data.data.dictList.count;
                })
            },
          handleSubmitEdit(){
            let _this = this;
            let form = _this.form;
            AJAX.post('website/sys/dict/saveOrEdit',
              {
                params:JSON.stringify(form)
              },(res)=>{
                if(res.data.stateCode.code===200){
                  this.editFormDialog=false;
                  this.getList(1)
                }else{
                  this.$message.error(res.data.stateCode.message);
                }
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
                this.init();
                this.editFormDialog=true;
            },
            //根据id获得字典信息
            edit(index,scope){
                let dat = Object.assign(scope,{});
                let editForm = this.editForm;
                let _this=this;
                AJAX.get('website/sys/dict/getDict',{id:dat.id},function(data){
                  _this.form=Object.assign({},data.data);

                })
                this.editFormDialog=true;
            },
            init(){
              this.form={
                  id:'',
                  value:'',
                  label:'',
                  type:'',
                  description:'',
                  sort:'',
                  remarks:'',
              }
            }
        },

    };
</script>

<style lang="scss">
    .dict_manager{
        width:100%;
        height:100%;
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
           bottom:0;
           height:45px;
       overflow-x: hidden;
           .left{
             float:left;
             position:relative;
             top:12px;
               width:240px;
               overflow: hidden;
               .pageSize{
                   width:70px;
                   li{
                       width:50px;
                   }
               }
           }
         .button_page{
           float:right;
           position:relative;
           top:11px;
         }


        }
      .el-dialog-body{
        width:550px;
        padding:20px;
        .el-form-item{
          margin-bottom:0
        }
        .el-input__inner{
          border-radius:0;
        }
      }
    }

</style>
