<template>
  <section class="page userManagementPage">
    <div class="tableTree">
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
    <div class="content">
      <div class="header">
          <el-form :inline="true" :model="managerDetail.form" >
            <el-form-item label="归属公司：">
              <el-select-tree
                class="el-tree-comp"
                v-model="managerDetail.form.companyId"
                :treeData="managerDetail.companyTree"
                :propNames="defaultProps"
                placeholder="归属公司"
                @setSelectedId="setSelectedId"
              >
              </el-select-tree>
            </el-form-item>
            <el-form-item labelWidth="30px"></el-form-item>
            <el-form-item label="姓名：">
              <el-input size="small" class="form_input" v-model="managerDetail.form.name" placeholder=""></el-input>
            </el-form-item>
          </el-form>
          <el-form :inline="true" :model="managerDetail.form" >
            <el-form-item label="归属部门：">
              <el-select-tree
                class="el-tree-comp"
                size="small"
                v-model="managerDetail.form.officeId"
                :treeData="managerDetail.officeTree"
                :propNames="defaultProps"
                clearable
                :type="2"
                @setSelectedId="setSelectedOffiveId"
                placeholder="归属部门">
              </el-select-tree>
            </el-form-item>
            <el-form-item label="登录名：">
              <el-input size="small" class="form_input" v-model="managerDetail.form.loginName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="addList" v-touch-ripple><i class=" icon iconfont icon-xinzeng"></i>新增</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" size="small" @click="deleteList" v-touch-ripple><i class=" icon iconfont icon-delete"></i>批量删除</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      <qgs_normal_table
        :tableList="tableList"
        :propsName="propsName"
        :page="(managerDetail.pageNo-1)*managerDetail.pageSize"
        @edit="edit"
        :top="180"
        @deletegroup="handleGetgroup"
        @handleDeleteVal="handleDeleteVal"
      >
        <div class="pageNation">
          <el-pagination
            style="float:right;margin-right:30px;"
            :page-sizes="[10,15,20]"
            :page-size="managerDetail.pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes,prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </qgs_normal_table>
        <!--<ul>-->
          <!--<li :class="status===1?'active':''" @click="handleChangeNav(1)">用户列表</li>-->
          <!--<li :class="status===2?'active':''" @click="handleChangeNav(2)">用户添加</li>-->
        <!--</ul>-->
      <!--</div>-->
      <!--<List v-if="status===1"-->
            <!--:management="managerDetail"-->
            <!--@submitUserList="submitUserList"-->
            <!--@changeCurrentPage="changeCurrentPage"-->
            <!--@changeSizePage="chageCurrentPageSize"-->
            <!--@handleDeleteGet="deleteRow"-->
            <!--@handleEditData="editData"-->
      <!--&gt;-->
      <!--</List>-->
      <!--<ListAdd v-if="status===2"-->
               <!--@handleClickSave="saveForm"-->
               <!--:companyTree="managerDetail.companyTree"-->
               <!--:officeTree="managerDetail.officeTree"-->
               <!--:ruleForm="ruleForm"-->
               <!--@init="init"-->
      <!--&gt;</ListAdd>-->
    </div>
  </section>
</template>

<script>
  import AJAX from './../../../assets/js/ajax';
  import {tranlateDataTreeManagement} from './../../../utils';
  import {mapActions} from 'vuex'
  import selectTree from "@/components/tableTree/selectTree.vue"
  import qgs_scrollBar from '@/components/Common/qgs_scrollBar.vue'
  import qgs_normal_table from '@/components/Common/qgs_normal_table'
  export default {
    components: {qgs_scrollBar,'el-select-tree':selectTree, qgs_normal_table},
    data () {
      return {
        type: '', //1归属公司 2归属部门
        loadding: true, //为true显示加载动画 为false显示页面,
        //树结构
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        //表单列表
        tableList:[],
        propsName:[
          {
            label: '归属公司',
            dat: 'companyName'
          },
          {
            label: '归属部门',
            dat: 'officeName'
          },
          {
            label: '登录名',
            dat: 'loginName'
          },
          {
            label: '姓名',
            dat: 'name'
          },
          {
            label: '电话',
            dat: 'phone'
          },
          {
            label: '手机',
            dat: 'mobile'
          }
        ],
        total:0, //总页数
        managementMenu: [],
        managerDetail: {
          form: {
            companyId: '',
            officeId: '',
            loginName: '',
            name: ''
          },
          companyTree: [],
          officeTree: [],
          data: [],
          pageSize: 10,
          pageNo: 1,
        },
        filterText: '',
        status: 1,
        //用户添加需要传过去的参数
        ruleForm: {
          companyName: '',
          officeName: '',
          id: '',
          photo: '',
          companyId: '',
          officeId: '1',
          no: '',
          name: '',
          loginName: '',
          newPassword: '',
          region: '',
          email: '',
          mobile: '',
          phone: '',
          loginFlag: true,
          roleNames: '',
          createDate: '',
          userType: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          roleArr: [],
          resource: '',
          remarks: '',
          oldLoginName: '',
          password: ''
        },
      }
    },
    watch: {
      filterText(val) {
        this.$refs.ManagerTableTree.filter(val);
      }
    },
    methods: {
      ...mapActions(['getUserList','getListTypeTree']),
      addList(){
        alert("添加按钮");
      },
      deleteList(){
        alert('批量删除')
      },
      //树结构的选中项
      setSelectedId(val){

      },
      setSelectedOffiveId(){

      },
      //获取查询结果
      search(){

      },
      //获取批量删除列表
      handleGetgroup(gro){
          console.log(gro);
      },
      handleDeleteVal(val){
         alert('单个删除')
      },
      edit(){

      },
      //当前页的跳转
      handleCurrentChange(page){
        this.managerDetail.pageNo = page;
        this.getUserList(this)
      },
      //修改每一页的数量
      handleSizeChange(page){
        this.managerDetail.pageSize = page;
        this.getUserList(this);
      },
      //删除的方法
      deleteRow(index, row){
        let _this = this;
        AJAX.delete("website/sys/user/deleteUser", {userId: row.id}, (res) => {
          _this.getUserList(_this);
        })

      },
      //初始化form
      init(){
        this.ruleForm = {
          companyName: '',
          officeName: '',
          companyId: '',
          officeId: '',
          id: '',
          photo: '',
          no: '',
          name: '',
          loginName: '',
          newPassword: '',
          region: '',
          email: '',
          mobile: '',
          phone: '',
          loginFlag: true,
          roleNames: '',
          createDate: '',
          userType: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          roleArr: [],
          resource: '',
          remarks: '',
          oldLoginName: '',
          password: ''
        }
      },
      //编辑列表
      editData(index, row){
          console.log(row);
        row.type = []; //绑定用户类型
        this.ruleForm = Object.assign({}, row);
        this.status = 2;
      },
      submitUserList(){
        this.getUserList(this);
      },
      saveForm(sta){
        console.log(sta);
        this.status = sta;
        this.getUserList(this);
      },
      ajax(type){
        let _this = this;
        AJAX.get("/website/sys/office/treeData", {
          type: type
        }, (res) => {
          switch (type) {
            case 1 : {
              _this.managerDetail.companyTree = tranlateDataTreeManagement(res.data);
              break;
            }
            case 2 : {
              _this.managerDetail.officeTree = tranlateDataTreeManagement(res.data);
              break;
            }
            default: {
              _this.managementMenu = tranlateDataTreeManagement(res.data);
            }
          }
        })
      },
      filterNode(value, data){
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      choNodeKey(obj, node, self){
        //判断节点是否展开或者关闭
        console.log(obj);
        //判断对象是公司还是部门
        if (obj.children.length) this.managerDetail.form.companyId = obj.id;
        this.managerDetail.form.officeId = obj.id;
        this.ruleForm.companyId = obj.id;
        this.getUserList(this);
      },
      handleChangeNav(status){
        this.status = status;
        if (status === 2) this.init();
      }
    },
    created(){
      this.ajax();
      this.ajax(1);
      this.ajax(2);
      this.getUserList(this);
    },
    mounted(){

    }
  }
</script>

<!--使用sass语法进行编译样式-->
<style lang="scss">
  .icon-xinzeng{
    font-size:14px;
    padding-right:12px;
  }
  .icon-delete{
    font-size:12px;
    padding-right:12px;
  }
  .userManagementPage {
    position: relative;
    height:100%;
    overflow: hidden;
    .tableTree {
      width: 210px;
      height:102%;
      position: absolute;
      overflow: scroll;
      top:0;
      left:0;
      z-index: -1;

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
    .content {
      height:100%;
      width:100%;
      background:#fff;
      margin-left:193px;
      padding-right:210px;
      display: inline-block;
      position: relative;
      border-left: 1px solid #ddd;
      .header {
        width:100%;
        display: inline-block;
        white-space: nowrap;
          .el-form{
            position:relative;
            height:45px;
            padding-left:30px;
            top:2px;
          }
          .form_input{
            width:150px;
            .el-input__inner{
              border-radius:0;
            }
          }

      }
    }
    .el-tree-comp{
       width:240px;
      .el-input__inner{
        width:240px !important;
      }
      .ats-tree-scrollbar{
        width:240px !important;
        min-width:240px !important;
      }
    }
    .pageNation {
      position:relative;
      top:2px;
      width: 100%;
    }
  }
</style>
