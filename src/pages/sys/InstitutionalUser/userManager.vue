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
        <ul>
          <li :class="status===1?'active':''" @click="handleChangeNav(1)">用户列表</li>
          <li :class="status===2?'active':''" @click="handleChangeNav(2)">用户添加</li>
        </ul>
      </div>
      <List v-if="status===1"
            :management="managerDetail"
            @submitUserList="submitUserList"
            @changeCurrentPage="changeCurrentPage"
            @changeSizePage="chageCurrentPageSize"
            @handleDeleteGet="deleteRow"
            @handleEditData="editData"
      >
      </List>
      <ListAdd v-if="status===2"
               @handleClickSave="saveForm"
               :companyTree="managerDetail.companyTree"
               :officeTree="managerDetail.officeTree"
               :ruleForm="ruleForm"
      ></ListAdd>
    </div>
  </section>
</template>

<script>
  import AJAX from './../../../assets/js/ajax';
  import {tranlateDataTreeManagement} from './../../../utils';
  import {mapActions} from 'vuex'
  import List from './list/list.vue'
  import ListAdd from './list/listadd.vue'
  export default {
    data () {
      return {
        type: '', //1归属公司 2归属部门
        loadding: true, //为true显示加载动画 为false显示页面
        //树结构
        defaultProps: {
          children: 'children',
          label: 'name',
        },
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
          total: 0
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
    components: {
      List,
      ListAdd
    },
    methods: {
      ...mapActions(['getUserList','getListTypeTree']),
      //当前页的跳转
      changeCurrentPage(page){
        this.managerDetail.pageNo = page;
        this.getUserList(this)
      },
      //修改每一页的数量
      chageCurrentPageSize(page){
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
<style lang="scss" scoped>
  .userManagementPage {
    display: flex;
    padding-bottom: 45px;
    .tableTree {
      width: 200px;
      overflow-x: auto;
      position: relative;
      z-index: 1;

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
      position: relative;
      margin-left: -15px;
      /*height:100%;*/
      z-index: 2;
      background: #fff;
      flex: 4;
      border-left: 1px solid #ddd;
      .header {
        height: 45px;
        ul {
          margin-left: 5px;
          margin-top: 5px;
          height: 40px;
          line-height: 40px;
          list-style: none;
          border-bottom: 1px solid #ddd;
          display: flex;
          li {
            cursor: pointer;
            padding: 0 25px;
            position: relative;
            bottom: -1px;
            &.active {
              border: 1px solid #ddd;
              border-bottom: 1px solid #fff;
              background: #fff;
              color: #000;
            }
          }
        }
      }
    }
  }
</style>
