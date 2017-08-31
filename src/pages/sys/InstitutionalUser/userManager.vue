<template>
  <section class="page userManagementPage">
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
      <div class="header_c">
        <el-form :inline="true" :model="managerDetail.form">
          <el-form-item label="归属公司：">
            <!--<el-select-tree-->
              <!--class="el-tree-comp"-->
              <!--v-model="managerDetail.form.companyId"-->
              <!--:treeData="managerDetail.companyTree"-->
              <!--:propNames="defaultProps"-->
              <!--placeholder="归属公司"-->
              <!--@setSelectedId="setSelectedId"-->
            <!--&gt;-->
            <!--</el-select-tree>-->
            <el-select v-model="managerDetail.form.companyId" v-if="managerDetail.companyTree.length" size="small" @change="handleChangeCompany">
                 <el-option  :label="item.name"  :value="item.id" v-for="item,key in managerDetail.companyTree" :key="key">
                 </el-option>
            </el-select>
          </el-form-item>
          <el-form-item labelWidth="30px"></el-form-item>
          <el-form-item label="姓名：">
            <el-input size="small" class="form_input" v-model="managerDetail.form.name" placeholder=""></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="managerDetail.form">
          <el-form-item label="归属部门：">
            <!--<el-select-tree-->
              <!--class="el-tree-comp"-->
              <!--size="small"-->
              <!--v-model="managerDetail.form.officeId"-->
              <!--:treeData="managerDetail.officeTree"-->
              <!--:propNames="defaultProps"-->
              <!--clearable-->
              <!--:type="2"-->
              <!--@setSelectedId="setSelectedOffiveId"-->
              <!--placeholder="归属部门">-->
            <!--</el-select-tree>-->
            <el-select v-model="managerDetail.form.officeId" size="small" >
              <el-option   :label="item.name" :value="item.id" v-for="item,key in managerDetail.officeTree" :key="key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登录名：">
            <el-input size="small" class="form_input" v-model="managerDetail.form.loginName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="addList" v-touch-ripple><i
              class=" icon iconfont icon-xinzeng"></i>新增
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="small" @click="deleteList" v-touch-ripple><i
              class=" icon iconfont icon-delete"></i>批量删除
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="search">
              <i class=" icon iconfont icon-search"></i>查询</el-button>
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
      <!--新增和编辑弹窗-->
      <model_dialog
        :dialog="dialogGoodsVisible"
        @cancle="dialogGoodsVisible=false"
        :title="'用户新增编辑'"
        :hideFooter="true"
      >
        <div class="add_edit_content">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form :label-position="'right'" label-width="120px" :model="ruleForm" ref="ruleForm1" :rules="rules">
                  <el-form-item label="归属公司:" prop="companyId">
                    <el-select v-model="ruleForm.companyId" size="small" @change="handleChangeCompany">
                      <el-option  :label="item.name" :value="item.id" v-for="item,key in managerDetail.companyTree" :key="key">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="归属部门:" prop="officeId">
                    <el-select v-model="ruleForm.officeId" size="small" v-cloak>
                      <el-option  :label="item.name" :value="item.id" v-for="item,key in managerDetail.officeTree" :key="key">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="工号:" prop="no">
                    <el-input v-model="ruleForm.no" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="登录名:" prop="loginName">
                    <el-input v-model="ruleForm.loginName" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码:">
                    <el-input v-model="ruleForm.newPassword" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="电话:">
                    <el-input v-model="ruleForm.phone" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="是否允许登录:">
                    <el-switch on-text="" off-text="" v-model="ruleForm.loginFlag"></el-switch>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form :label-position="'right'" label-width="120px" :model="ruleForm" ref="ruleForm" :rules="rules">
                  <el-form-item label="用户头像:">
                    <!--<el-input v-model="ruleForm.photo" size="small"></el-input>-->
                    <div class="con">
                      <el-upload
                        class="avatar-uploader"
                        :action="$store.state.prefix+'/jad-saas-mgmt/api/website/upload'"
                        :show-file-list="false"
                        :multiple="false"
                        :auto-upload="true"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="ruleForm.photo!=''&&ruleForm.photo" :src="dialogImageUrl" class="avatar">
                        <i  class="el-icon-plus avatar-uploader-icon" v-else></i>
                      </el-upload>
                    </div>
                  </el-form-item>
                  <el-form-item label="姓名:" prop="name">
                    <el-input v-model="ruleForm.name" size="small"></el-input>
                  </el-form-item>
                  <el-form-item  label="密码:">
                    <el-input type="password" v-model="ruleForm.password" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱:">
                    <el-input v-model="ruleForm.email" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="手机:">
                    <el-input v-model="ruleForm.mobile" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="用户类型:">
                    <el-select v-model="ruleForm.userType" size="small">
                      <el-option  :label="item.label" :value="item.value" v-for="item,key in user_type" :key="key">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form :label-position="'right'" label-width="100px" :model="ruleForm" ref="ruleForm">
                  <el-form-item label="用户角色：">
                    <el-checkbox-group v-model="ruleForm.roleArr" v-if="allRoles">
                      <el-checkbox :label="item.name"  :key="item.id"  v-for="item in allRoles"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="备注：">
                    <el-input v-model="ruleForm.remarks" type="textarea"  size="small"></el-input>
                    <!--<el-checkbox-group v-model="ruleForm.type" v-if="allRoles" @change="changeVal">-->
                    <!--<el-checkbox :label="item.name"  :key="item.id"  v-for="item in allRoles"></el-checkbox>-->
                    <!--</el-checkbox-group>-->
                  </el-form-item>
                  <el-form-item>
                    <el-button  @click="handleSave" class="button_submit" size="small"><span class="icon iconfont icon-gou"></span><span>确定</span></el-button>
                    <el-button @click="handleCancle" class="button_cancle" size="small"><span class="icon iconfont icon-piliangshanchu"></span><span>取消</span></el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
        </div>
      </model_dialog>
    </div>
  </section>
</template>

<script>
  import AJAX from './../../../assets/js/ajax';
  import {tranlateDataTreeManagement} from './../../../utils';
  import {mapState,mapActions} from 'vuex';
  import selectTree from "@/components/tableTree/selectTree.vue"
  import qgs_scrollBar from '@/components/Common/qgs_scrollBar.vue'
  import qgs_normal_table from '@/components/Common/qgs_normal_table'
  import niceScroll from '@/assets/js/jquery.nicescroll';
  import qgs_dialog from '@//components/Common/qgs-dialog.vue';
  export default {
    components: {qgs_scrollBar, 'el-select-tree': selectTree, qgs_normal_table, 'model_dialog': qgs_dialog},
    data () {
      return {
          temp_id:'',//临时保存id，避免闪屏
        type: '', //1归属公司 2归属部门
        loadding: true, //为true显示加载动画 为false显示页面,
        deleteGroup:[], //批量删除
        //树结构
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        //表单列表
        tableList: [],
        propsName: [
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
        total: 0, //总页数
        managementMenu: [], //左边菜单的列表
        managerDetail: {
          form: {
            companyId: '',
            officeId: '',
            loginName: '',
            name: ''
          },
          companyTree: [],
          officeTree: [],
          pageSize: 10,
          pageNo: 1,
        },
        filterText: '',
        status: 1,
        dialogGoodsVisible:false,//用户新增编辑弹窗控制
        //如果用户新增让其默认选中的companyId officeId
        orginCompanyId:'',
        orginOfficeId:'',
        //用户角色
        sys_type:'sys_user_type',
        user_type:[],
        allRoles:[],
        //用户添加需要传过去的参数
        ruleForm: {
          companyName: '',
          officeName: '',
          id: '',
          photo: '',
          companyId: '',
          officeId: '',
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
          roleArr: [],
          resource: '',
          remarks: '',
          oldLoginName: '',
          password: ''
        },
        rules:{
          no: [{ required: true, message: '', trigger: 'blur' }],
          loginName:[{ required: true, message: '', trigger: 'blur' }],
          name:[{ required: true, message: '', trigger: 'blur' }],
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.ManagerTableTree.filter(val);
      }
    },
    computed:{
      ...mapState(['scrollBarState']),
        dialogImageUrl(){
          return this.$store.state.prefix+"/jad-saas-mgmt"+this.ruleForm.photo;
        }

    },
    methods: {
      ...mapActions(['getUserList','getsourceTree','getCompanySource','getOfficeSource','getUserForm','getDictList'
      ,'getParentsCompanyId','handleSaveUser','handleDeleteUserList','getRoleList'
      ]),
      handleAvatarSuccess(res, file) {
        this.ruleForm.photo = res.path;
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      addList(){
        this.init();
        this.getDictList(this);
        this.getRoleList(this);
        this.dialogGoodsVisible=true;
      },
      //用户切换公司选项
      handleChangeCompany(val){
        this.getOfficeSource(this);
      },
      //获取查询结果
      search(){
        this.getUserList(this);
      },
      //获取批量删除列表
      handleGetgroup(gro){
        this.deleteGroup=gro;
      },
      deleteList(){
        this.handleDeleteUserList(this)
      },
      handleDeleteVal(val){
        this.deleteGroup=val;
        this.handleDeleteUserList(this)
      },
      edit(val){
          this.ruleForm=Object.assign({},val);
          this.getDictList(this);
          this.getUserForm(this);
          this.dialogGoodsVisible=true;
      },
      //编辑提交
      handleSave(){
        this.$refs.ruleForm1.validate((valid) => {
          if (valid) {
            this.$refs.ruleForm.validate((valid1) => {
                if(valid1) this.handleSaveUser(this);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      handleCancle(){
        this.dialogGoodsVisible=false;
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
      //初始化form
      init(){
        this.ruleForm = {
          companyId: this.orginCompanyId,
          officeId: this.orginOfficeId,
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
          roleArr: [],
          resource: '',
          remarks: '',
          oldLoginName: '',
          password: ''
        }
      },
      //编辑列表
      editData(index, row){
        row.roleArr = []; //绑定用户类型
        this.ruleForm = Object.assign({}, row);
        this.status = 2;
      },
      submitUserList(){
        this.getUserList(this);
      },
      filterNode(value, data){
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      choNodeKey(obj, node, self){
        //判断节点是否展开或者关闭
        //判断对象是公司还是部门
        if (obj.children.length){
          this.ruleForm.companyId = obj.id;
          this.managerDetail.form.companyId = obj.id;
        }else{
          this.temp_id = obj.id;
          this.getParentsCompanyId(this);
        }


        this.getUserList(this);
      },
      handleChangeNav(status){
        this.status = status;
        if (status === 2) this.init();
      },
    },
    created(){
//      this.ajax(2);
      this.getUserList(this);
      this.getCompanySource(this);
      this.getsourceTree(this);
    },
    mounted(){

    }
  }
</script>

<!--使用sass语法进行编译样式-->
<style lang="scss">
  .userManagementPage {
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
    .content {
      height: 100%;
      width: 100%;
      background: #fff;
      margin-left: 210px;
      padding-right: 217px;
      display: inline-block;
      border-left: 1px solid #ddd;
      .header_c {
        width: 100%;
        height: 90px;
        display: inline-block;
        white-space: nowrap;
        .el-form {
          position: relative;
          height: 45px;
          padding-left: 30px;
          top: 2px;
        }
        .form_input {
          width: 150px;
        }
        .el-input__inner {
          border-radius: 0;
        }

      }
    }
    .el-tree-comp {
      width: 240px;
      .el-input__inner {
        width: 240px !important;
      }
      .ats-tree-scrollbar {
        width: 240px !important;
        min-width: 240px !important;
      }
    }
    .pageNation {
      position: relative;
      top: 2px;
      width: 100%;
    }
  }

  /*新增编辑样式*/
  .add_edit_content{
    width:800px;
    padding:10px 20px 30px;
    .el-form-item{
      margin-bottom:0px;
    }
    .el-input__inner{
      border-radius:0;
    }
    .el-textarea__inner{
      border-radius:0;
    }
    .el-select{
      width:250px;
    }
    .button_submit,.button_cancle{
       width:200px;
      height:32px;
      text-align: center;
      span:nth-child(1){
        font-size:12px;
        padding-right:10px;
      }
    }
    .button_submit{
      background:#22bf98;
      color:#fff;
      border:1px solid #22bf98;
    }
    /*图片样式*/
    .avatar-uploader{
      width:80px;
      height:90px;
      .el-upload{
        width:80px;
        height:80px;
        text-align: center;
        line-height: 80px;
        border:1px dashed #eee;
      }
      img{
        width:80px;
        height:80px;
        border-radius: 100%;
      }
    }
    input[type=file]{
      display:none !important;
    }
  }
</style>
