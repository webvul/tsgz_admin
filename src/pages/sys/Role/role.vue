<template>
  <div class="page DataSourceConfig" ref="dataSourceContainer">

    <div class="content">
      <div class="header">
        <ul>
          <li :class="status===1?'active':''" @click="handleChangeNav(1)">角色列表</li>
          <li :class="status===2?'active':''" @click="handleChangeNav(2)">角色{{saveUp}}</li>
        </ul>
      </div>
      <!--角色列表-->
      <roleList
        v-if="status===1"
        :msg="msg"
        @handleChangeNav="handleChangeNav"
      >
      </roleList>
      <!--添加角色-->
      <addRole
        v-if="status===2"
        :form="form"
        :officeList="officeList"
        :officeId="officeId"
        :menuList="menuList"
        :menuIdList="menuIdList"
        @handleChangeNav="handleChangeNav"
      >
      </addRole>
      <!--分配角色-->
      <!--<allotRole
          v-if="status===2"
          @handleChangeStatus="changeStatus"
          :form="form"
          :gccList="gccList">
      </allotRole>-->

    </div>

  </div>
</template>

<script>
  import AJAX from '../../../assets/js/ajax';
  import roleList from './roleList.vue'
  import addRole from './addRole.vue'
  import {tranlateDataTreeManagement} from './../../../utils';

  export default {
    components: {
      roleList,
      addRole
    },
    data() {
      return {
        msg: [],
        form: {
          office: '',
          name: '',
          enname: '',
          roleType: '',
          dataScope: '',
          sysData: '',
          useable: '',
          menuList: [],
          remarks: '',
        },
        status: 1,
        saveUp: '添加',
        officeList: [],
        menuList:[],
        officeId:'',
        menuIdList:[],
      }
    },
    computed: {},
    created() {
      this.ajax();
    },
    mounted() {

    },
    methods: {
      //切换
      handleChangeNav(status, id) {
        let _this = this;
        _this.status = status;
        //角色列表
        if (status === 1) {
          _this.ajax();
          this.saveUp = '添加';
        }
        //修改或者删除角色
        if (status === 2){
          if (id === '' || id === null || id === undefined){
            this.saveUp = '添加';
            id = '';
          }else {
            this.saveUp = '编辑';
          }
          //获得菜单列表和office列表
          AJAX.get("website/sys/role/getRoleForm", {id:id}, function (data) {
            _this.officeList = data.data.officeList;
            _this.menuList = data.data.menuList;
            _this.form = data.data.role;
            _this.form.officeId = data.data.role.office.id;
            _this.menuIdList = data.data.role.menuIdList;
            console.log(_this.form)
          })
        }
      },

      //获得角色列表
      ajax() {
        let _this = this
        AJAX.get("website/sys/role/getRoleList", {}, function (data) {
          _this.msg = data.data;
        })
      },
    },
  };
</script>

<style lang="scss">
  .content {
    position: relative;
    margin-left: -15px;
    height: 100%;
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
</style>
