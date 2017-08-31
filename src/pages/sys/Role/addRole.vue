<template>
  <div class="page DataSourceConfig" ref="dataSourceContainer">
    <el-form :model="sendForm" :rules="rules" ref="areaName">
      <el-form-item label="归属机构" :label-width="formLabelWidth">
        <el-select-tree
          v-model="sendForm.officeId"
          :treeData="officeList"
          :propNames="defaultProps"
          :value="sendForm.officeId"
          clearable
          @setSelectedId="setSelectedId"
          placeholder="请选择归属机构">
        </el-select-tree>
      </el-form-item>
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="sendForm.name" auto-complete="off" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="英文名称" :label-width="formLabelWidth">
        <el-input v-model="sendForm.enname" auto-complete="off" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="角色类型" style="margin-left: 32px;">
        <el-select v-model="sendForm.roleType" placeholder="请选择">
          <el-option label="普通角色" value="1"></el-option>
          <el-option label="管理角色" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否系统数据" style="margin-left: 32px;">
        <el-select v-model="sendForm.sysData" placeholder="请选择">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否可用" style="margin-left: 32px;">
        <el-select v-model="sendForm.useable" placeholder="请选择">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据范围" style="margin-left: 32px;">
        <el-select v-model="sendForm.dataScope" placeholder="请选择">
          <el-option label="所有数据" value="1"></el-option>
          <el-option label="所在公司及以下数据" value="2"></el-option>
          <el-option label="所在公司数据" value="3"></el-option>
          <el-option label="所在部门已以下数据" value="4"></el-option>
          <el-option label="所在部门数据" value="5"></el-option>
          <el-option label="仅本人数据" value="8"></el-option>
          <el-option label="按明细设置" value="9"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色授权" style="margin-left: 32px;">
        <el-tree
          ref="selectTree"
          :data="menuList"
          show-checkbox
          node-key="id"
          class="selectTree"
          :default-expand-all="true"
          :default-checked-keys="menuIdList"
          :props="defaultProps">
        </el-tree>
      </el-form-item>
      <el-form-item label="" :label-width="formLabelWidth">
        <el-button size="small" icon="plus" type="primary" @click="submitForm(sendForm.id)" v-text="">保存</el-button>
        <el-button size="small" type="primary" @click="goback" icon="delete">返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import selectTree from "./../../../components/tableTree/selectTree.vue"
  import AJAX from '../../../assets/js/ajax';

  export default {
    components: {
      'el-select-tree': selectTree,
    },
    props: ['form', 'officeList', 'officeId', 'menuList', 'menuIdList'],
    data() {
      return {
        formLabelWidth: '100px',
        defaultProps: {
          children: 'children',
          label: 'name',
          id: "id",
        },
        rules: {
          name: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
        },

      }
    },
    computed: {
      sendForm(){
        return this.form
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      submitForm() {
        let _this = this;
        AJAX.post('website/sys/role/saveOrEdit', {
          //params:_this.sendForm
          id: _this.sendForm.id,
          officeId: _this.sendForm.officeId,
          name: _this.sendForm.name,
          enname: _this.sendForm.enname,
          roleType: _this.sendForm.roleType,
          menuList: JSON.stringify(this.$refs.selectTree.getCheckedNodes()),
          dataScope: _this.sendForm.dataScope,
          sysData: _this.sendForm.sysData,
          useable: _this.sendForm.useable,
          remarks: _this.sendForm.remarks,
        }, function (data) {
          if (data.data.stateCode.code === 200){
            _this.$emit("handleChangeNav",1,"")
          }else {
            alert(data.data.stateCode.message)
          }
        })
      },
      setSelectedId(val){
        let _this = this;
        _this.sendForm.officeId=val;
      },
      goback() {
        this.$emit("handleChangeStatus", 1);
      },
    },
  };
</script>

<style lang="scss">
  .DataSourceConfig {
    display: flex;
    flex-flow: column;
    position: relative;
    .header {
      width: 100%;
      height: 50px;
      line-height: 50px;
      .DataSourceConfigFrom {
        position: relative;
        top: 6px;
        display: flex;
        line-height: 50px;
        .el-form-item {
          position: relative;
          left: -20px;
          &:nth-child(2) {
            left: -40px;
          }
          &:nth-child(3) {
            left: -30px;
          }
        }
        .el-input {
          width: 130px;
        }
        .el-form-item__label {
          width: 50px;
        }
        .btn1 {
          margin-top: 4px;
          width: 50px;
          height: 50px;
        }
      }
    }
    .toolbar {
      position: absolute;
      bottom: 45px;
      height: 45px;
      overflow-x: hidden;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        width: 240px;
        overflow: hidden;
        .pageSize {
          width: 70px;
          li {
            width: 50px;
          }
        }
      }

    }
  }
  .selectTree{
    width:500px;
    position:relative;
    left:68px
  }
</style>
