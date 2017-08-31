<template>
    <section class="page officeManagementPage">
        <div class="tableTree_area">
          <div class="wrapper">
            <el-input
              placeholder="查询"
              v-model="filterText"
              size="small"
            >
            </el-input>
            <el-tree
              :highlight-current="true"
              :class="'filter-tree'"
              :data="managementMenu"
              :props="defaultProps"
              default-expand-all
              style="font-size:12px;"
              node-key="name"
              current-node-key="name"
              :filter-node-method="filterNode"
              @node-click="choNodeKey"
              ref="ManagerTableTree">
            </el-tree>
          </div>
        </div>
        <div class="content">

          <div class="header">
            <ul>
              <li :class="status===1?'active':''" @click="handleChangeNav(1)">机构列表</li>
              <li :class="status===2?'active':''"  @click="handleChangeNav(2)">机构{{saveUp}}</li>
            </ul>
          </div>
          <div v-if="status===1" class="left_con_tablelist">
            <TableTree
              :data-source="officeList"
              :columns="columns"
              :tree-structure="true"
              @updateHandle="editData"
              @addNextHandle="addNext"
              @handleDelete="deleteData"
            > </TableTree>
          </div>
          <div v-if="status===2">
            <el-card class="userContent">
              <qgs_scrollBar
                :scroll_bar_style="'width:100%;height:500px;padding:20px;'"
              >
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="上级机构：" prop="parentIdd">
                        <el-select-tree v-model="ruleForm.parentIdd" :treeData="officeAllTree" :propNames="defaultProps"
                                        @setSelectedId="selectedparentIdd"
                                        :originId="ruleForm.id"
                                        placeholder="选择上级机构">
                        </el-select-tree>
                      </el-form-item>
                      <el-form-item label="归属区域：">
                        <el-select-tree v-model="ruleForm.areaId" :treeData="areaAllTree" :propNames="defaultProps" clearable
                                        @setSelectedId="selectedareaId"
                                        placeholder="选择归属区域">
                        </el-select-tree>
                      </el-form-item>
                      <el-form-item label="机构名称" prop="name">
                        <el-input v-model="ruleForm.name" size="small"></el-input>
                      </el-form-item>
                      <el-form-item label="机构编码" prop="code">
                        <el-input v-model="ruleForm.code" size="small"></el-input>
                      </el-form-item>
                      <el-form-item label="机构类型" prop="type">
                        <el-select v-model="ruleForm.type" placeholder="请选择">
                          <el-option
                            :label="item.label"
                            :value="item.value"
                            :key="key"
                            v-for="item,key in office_type"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="机构级别" prop="grade">
                        <el-select v-model="ruleForm.grade" placeholder="请选择">
                          <el-option
                            :label="item.label"
                            :value="item.value"
                            :key="key"
                            v-for="item,key in office_grade"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="是否可用" prop="delivery">
                        <el-switch on-text="" off-text="" v-model="ruleForm.useable"></el-switch>
                      </el-form-item>
                      <el-form-item label="主负责人：">
                        <el-select-tree
                          v-model="ruleForm.primaryPersonId"
                          :treeData="userAllTree"
                          :propNames="defaultProps"
                          clearable
                          @setSelectedId="selectedprimaryPersonId"
                          placeholder="选择主负责人">
                        </el-select-tree>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="副负责人：">
                        <el-select-tree v-model="ruleForm.deputyPersonId" :treeData="userAllTree" :propNames="defaultProps" clearable
                                        @setSelectedId="selecteddeputyPersonId"
                                        placeholder="选择副负责人">
                        </el-select-tree>
                      </el-form-item>
                      <el-form-item label="联系地址" prop="photo">
                        <el-input v-model="ruleForm.address" size="small"></el-input>
                      </el-form-item>
                      <el-form-item label="邮政编码" prop="photo">
                        <el-input v-model="ruleForm.zipCode" size="small"></el-input>
                      </el-form-item>
                      <el-form-item label="负责人" prop="photo">
                        <el-input v-model="ruleForm.master" size="small"></el-input>
                      </el-form-item>
                      <el-form-item label="电话" prop="photo">
                        <el-input v-model="ruleForm.phone" size="small"></el-input>
                      </el-form-item>
                      <el-form-item label="传真" prop="photo">
                        <el-input v-model="ruleForm.fax" size="small"></el-input>
                      </el-form-item>
                      <el-form-item label="邮箱" prop="photo">
                        <el-input v-model="ruleForm.email" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>


                  <el-form-item label="备注" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm1')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
                </el-form>

              </qgs_scrollBar>

            </el-card>

          </div>

        </div>
    </section>
</template>

<script>
import AJAX from './../../../assets/js/ajax';
import TableTree from '../../../components/tableTree/tableTree'
import selectTree from "../../../components/tableTree/selectTree.vue"
import {tranlateDataTreeManagement} from './../../../utils';
import qgs_scrollBar from "@/components/Common/qgs_scrollBar"
export default {
  components: {
    'el-select-tree':selectTree,
    TableTree,
    qgs_scrollBar
  },
  data () {
      return{
          ruleForm:{
            id:'',
            parentIdd:'',
            areaId:'',
            name:'',
            code:'',
            type: '',
            grade: '',//级别ID
            primaryPersonId:'',
            deputyPersonId:'',
            address:'',
            useable:true,
            zipCode:'',
            master:'',
            phone:'',
            fax:'',
            email:'',
            remarks: ''
          },
          officeList:[],
          columns: [
            {
              text: '机构名称',
              dataIndex: 'name'
            },
            {
              text: '归属区域',
              dataIndex: 'areaName'
            },
            {
              text: '机构编码',
              dataIndex: 'code'
            },
            {
              text: '机构类型',
              dataIndex: 'type'
            },
            {
              text: '备注',
              dataIndex: 'remarks'
            }
          ],
          typeDict:'sys_office_type',
          gradeDict:'sys_office_grade',
          office_type:[],
          office_grade:[],
          type:'', //1归属公司 2归属部门
          loadding:true, //为true显示加载动画 为false显示页面
          //树结构
          defaultProps: {
              children: 'children',
              label: 'name',
          },
          managementMenu:[],
          managerDetail:{
              form:{
                  companyId:'',
                  officeId:'',
                  loginName:'',
                  name:''
              },
              companyTree:[],
              officeTree:[],
              data:[],
              pageSize:10,
              pageNo:1,
              total:0
          },
          officeAllTree:[],
          userAllTree:[],
          areaAllTree:[],
          filterText:'',
          officeobj:[],
          status:1,
          saveUp:'添加',
          delivery: true,
          useable: true,
          rules: {
            name: [
              { required: true, message: '请输入机构名称', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
          grade:[{ required: true, message: '请输入机构级别', trigger: 'blur' },],
          type:[{ required: true, message: '请输入机构类型', trigger: 'blur' },],
          code:[{ required: true, message: '请输入机构编码', trigger: 'blur' },],

          },
      }
  },
    watch: {
        filterText(val) {
            this.$refs.ManagerTableTree.filter(val);
        }
    },
  methods: {
    //初始化form
    selectedprimaryPersonId(val){
      this.ruleForm.primaryPersonId= val ;
    },
    selecteddeputyPersonId(val){
      this.ruleForm.deputyPersonId= val ;
    },
    selectedareaId(val){
      this.ruleForm.areaId= val ;
    },
    selectedparentIdd(val){
      this.ruleForm.parentIdd= val ;
    },
    init(){
        this.ruleForm= {
          id:'',
          parentIdd:'',
          areaId:'',
          name:'',
          code:'',
          type: '',
          grade: '',//级别ID
          useable: true,
          primaryPersonId:'',
          deputyPersonId:'',
          address:'',
          zipCode:'',
          master:'',
          phone:'',
          fax:'',
          email:'',
          remarks: ''
      }
    },
    //编辑列表
    editData(row){
      this.status=2;
      this.saveUp='修改';
     this.getOfficeDict();
      let _this =this;
      AJAX.post("website/sys/office/officeform",{
        id:row.id,
      },(res)=>{
        if(res.data.data.useable==='true'){
          res.data.data.useable=true;
        }else{
          res.data.data.useable=false;
        }
        this.ruleForm = Object.assign({},res.data.data) ;
        console.log(this.ruleForm.parentIdd)

      })
          //this.ruleForm=Object.assign({},row);
        //  console.log(this.ruleForm.user_id);
    },
    deleteData(row){
      AJAX.get('/website/sys/office/delete', {
          id:row.id,
        }, (res)=>{
          this.getOfficeList();
      })
    },
    addNext(row){
      this.status=2;
      this.saveUp='添加';
      this.getOfficeDict();
      let _this =this;
      AJAX.post("website/sys/office/officeform",{
        Pid:row,
      },(res)=>{
        this.ruleForm = Object.assign({},res.data.data) ;
      })
    },
    saveForm(sta){
       this.status=sta;
      this.getOfficeList();
    },
      ajax(type){
          let _this = this;
          AJAX.get("/website/sys/office/treeData",{
              type:type
          },(res)=>{
          //   console.log(res)
              AJAX.get("/website/sys/office/getCompanyByOfficeId",{
                officeId:2,

              },(data)=>{
              })
                switch(type){
                  default:{
                      _this.managementMenu=tranlateDataTreeManagement(res.data);
                    //将外面的机构结构图赋给里面的树
                    _this.officeAllTree = _this.managementMenu ;
                  }
              }
          })
      },
    //获取机构的一些字典数据
    getOfficeDict(){
      let _this =this;

      //获得机构类型及机构级别字典
      AJAX.get('website/sys/office/getDictList',{type:this.typeDict,grade:this.gradeDict},(res)=>{
        //console.info(res.data)
        _this.office_type=res.data.type;
        _this.office_grade=res.data.grade;
      })

      this.ajax();
      //获得用户树结构
      AJAX.get('website/sys/office/treeOfficUserData',{},(res)=>{
        _this.userAllTree = tranlateDataTreeManagement(res.data) ;
      })
      //获得归属区域树结构
      AJAX.get('/website/sys/area/treeData',{},(res)=>{
        // console.log(res.data)
        _this.areaAllTree = tranlateDataTreeManagement(res.data);
      })
    },
      //获取机构列表
    getOfficeList(){
            let _this = this;
           // console.info(_this.officeobj);
            let dat ={
              name:_this.officeobj.name,
              id:_this.officeobj.id,
              pId:_this.officeobj.pId,
              type:_this.officeobj.type,
              parentIds:_this.officeobj.pIds,
            }
            AJAX.post("website/sys/office/officeListData",{
              params:JSON.stringify(dat)
            },(res)=>{
                _this.officeList=tranlateDataTreeManagement(res.data.data,_this.officeobj.pId);
            })
      },
    submitForm(formName) {
      let _this = this;
      //_this.ruleForm.roleArr=transArr(_this.ruleForm.type,_this.allRoles);
      //_this.$emit('handleClickSave','1');
      this.$refs[formName].validate((valid) => {
        if (valid) {
          AJAX.post("website/sys/office/save",{
            params:JSON.stringify(_this.ruleForm)
          },(res)=>{
              this.$message('修改成功');
              this.status=1;
              this.getOfficeList();
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName){
      this.init();
    },
      filterNode(value, data){
          if (!value) return true;
          return data.name.indexOf(value) !== -1;
      },
      choNodeKey(obj,node,self){
          //console.log(this.managerDetail.form);
          this.managerDetail.form.officeId=obj.id;
          this.officeobj = obj ;
          this.getOfficeList();
        this.handleChangeNav(1);
      },

    handleChangeNav(status){
      this.status=status;
      this.saveUp='添加';
      if(status==2){
        let dat = 'new';
        this.getOfficeDict();
        let _this =this;
        AJAX.post("website/sys/office/officeform",{
        },(res)=>{
          if(res.data.data.useable==='true'){
            res.data.data.useable=true;
          }
          this.ruleForm = Object.assign({},res.data.data) ;
        })
      }
    },

  },
    created(){
        this.ajax();
        this.getOfficeList();
    },
    mounted(){

    }
}
</script>

<!--使用sass语法进行编译样式-->
<style lang="scss">
    .officeManagementPage{
      position: relative;
      height: 100%;
      overflow: hidden;
      .tableTree_area {
        width: 210px;
        height: 100%;
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 1;
        .wrapper{
          width:107%;
          height:102%;
          overflow: scroll;
        }
        .el-input {
          width: 175px;
          margin: 10px 5px;

        }
        .el-tree {
          border: none;
          .el-tree-node__label {
            font-size: 12px;
          }
        }
      }
        .userContent{
          width:90%;
          margin-left:2%;
          overflow-y: auto;
          .el-input{
            width:230px !important;
          }
        }
        .content{
          height: 100%;
          width: 100%;
          padding:0 20px 0 5px;
          background: #fff;
          margin-left: 210px;
          padding-right: 217px;
          display: inline-block;
          border-left: 1px solid #ddd;
            .header{
                height:45px;
                ul{
                    margin-left:5px;
                    margin-top:5px;
                    height:40px;
                    line-height: 40px;
                    list-style: none;
                    border-bottom:1px solid #ddd;

                    li{
                      display: inline-block;
                        cursor: pointer;
                        padding:0 25px;
                        position:relative;
                        bottom:-1px;
                        &.active{
                            border:1px solid #ddd;
                            border-bottom:1px solid #fff;
                            background:#fff;
                            color:#000;
                        }
                    }
                }
            }
          .el-card__body{
            padding:0;
          }
          .left_con_tablelist{
            height:100%;
            overflow-y: scroll;
            padding-bottom:45px;
          }
          .demo-ruleForm{
            padding-bottom:20px;
          }
          .el-form-item{
            width:100% !important;
            .el-input__inner{

            }
            .el-textarea__inner{
              width:80%;
            }
          }
        }
    }
</style>
