<template>
  <el-card class="userContent" :style="'height:'+cardHeight">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="归属公司：">
        <el-select-tree v-model="ruleForm.companyName" :treeData="companyTree" :propNames="defaultProps" clearable
                        @setSelectedId="setSelectedcompanyId"
                        placeholder="选择公司">
        </el-select-tree>
      </el-form-item>
      <el-form-item label="归属部门：">
        <el-select-tree v-model="ruleForm.officeName" :treeData="officeTree" :propNames="defaultProps" clearable
                        :type="2"
                        @setSelectedId="setSelectedOfficeId"
                        placeholder="选择部门">
        </el-select-tree>
      </el-form-item>
      <el-form-item label="工号" prop="no">
        <el-input v-model="ruleForm.no" size="small"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="登录名" prop="loginName">
        <el-input v-model="ruleForm.loginName"  size="small"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="photo">
        <el-input v-model="ruleForm.password" type="password" size="small"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="ruleForm.newPassword" type="password" size="small"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="photo">
        <el-input v-model="ruleForm.email" size="small"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="photo">
        <el-input v-model="ruleForm.phone" size="small"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="photo">
        <el-input v-model="ruleForm.mobile" size="small"></el-input>
      </el-form-item>
      <el-form-item label="是否允许登录" prop="delivery">
        <el-switch on-text="" off-text="" v-model="ruleForm.loginFlag"></el-switch>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="ruleForm.userType" placeholder="请选择">
          <el-option
            :label="item.label"
            :value="item.value"
            :key="key"
            v-for="item,key in user_type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-checkbox-group v-model="ruleForm.type" v-if="allRoles" @change="changeVal">
          <el-checkbox :label="item.name"  :key="item.id"  v-for="item in allRoles"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </el-card>
</template>
<script>
  import AJAX from './../../../../assets/js/ajax';
  import {transArr} from '../../../../utils/globelData'
  import selectTree from "../../../../components/tableTree/selectTree.vue"
  export default {
    data() {
      const validateNewPassword = (rule, value, callback) => {
        if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        type:'sys_user_type',
        allRoles:[],
        user_type:[],
        checkRoleId:[],
          cardHeight:0,
        rules: {
          companyName: [
            { required: true, message: '请输入归属公司', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
//          newPassword: [
//            {required: true, trigger: 'blur', message: '重复密码不能为空！'},
//            {required: true, trigger: 'blur', validator: validateNewPassword}
//          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '', trigger: 'change' }
          ],
          no: [
            { required: true, message: '请选择工号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请选择工号', trigger: 'blur' }
          ],
          loginName: [
            { required: true, message: '请选择工号', trigger: 'blur' }
          ]
        },
        defaultProps: {
          children: 'children',
          label: 'name',
          id: "id",
        },
      };
    },
    props:['companyTree','officeTree','ruleForm'],
    watch:{

    },
    components: {
      'el-select-tree':selectTree
    },
    created(){
        this.cardHeight=500+"px";



    },
    mounted(){

      this.ruleForm.companyName=this.companyTree[0].id;
      this.ruleForm.officeName=this.officeTree[0].children[0].id;
      let _this =this;
      AJAX.get('website/sys/user/getDictList',{type:this.type},(res)=>{
        _this.user_type=res.data.type;
      })
      AJAX.get('website/sys/user/getUseInfo',{userId:this.ruleForm.id},(res)=>{
          console.log(res.data.officeId);
        _this.allRoles=res.data.allRoles;
        _this.ruleForm.oldLoginName=res.data.user.loginName;
        _this.ruleForm.password=res.data.user.password;
        _this.ruleForm.remarks=res.data.user.remarks;
        _this.ruleForm.userType=res.data.user.userType;
        _this.ruleForm.companyId=res.data.companyId;
        _this.ruleForm.officeId=res.data.officeId;

        if(res.data.user.loginFlag=='1'){
          _this.ruleForm.loginFlag=true;
        }else{
          _this.ruleForm.loginFlag=false;
        }
        _this.allRoles.map((item)=>{
            if(item.useable=='checked'){
              _this.ruleForm.type.push(item.name)
            }
        })
        _this.checkRoleId=res.data.roleIdList;
      })
    },
    methods: {
      handleCheckedCitiesChange(){

      },
      changeVal(val){
      },
      submitForm(formName) {
          let _this = this;
          _this.ruleForm.roleArr=transArr(_this.ruleForm.type,_this.allRoles);

        this.$refs[formName].validate((valid) => {
          if (valid) {
            AJAX.post("website/sys/user/saveOrUpdate",{
                params:JSON.stringify(_this.ruleForm)
            },(res)=>{
              if(res.data.stateCode.code===200){
                _this.$emit('handleClickSave',1);
              }else{
                _this.$message.error(res.data.stateCode.msg);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
         this.$emit('init')
      },
      setSelectedcompanyId(val){
          console.log(val);
          this.ruleForm.companyName=val.id;
      },
      setSelectedOfficeId(val){
        console.log(val);
        this.ruleForm.officeName=val.id;
      },
      init(){
        this.ruleForm=Object.assign({},{
          photo:'',
          companyId:'',
          companyName:'',
          officeName:'',
          officeId:'',
          no:'',
          name: '',
          loginName:'',
          newPassword:'',
          oldPassword:'',
          region: '',
          email:'',
          mobile:'',
          phone:'',
          loginFlag:true,
          roleNames:'',
          createDate:'',
          userType:'',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          roleArr:[],
          resource: '',
          remarks: '',
          oldLoginName:'',
          password:''
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
   .userContent{
     width:90%;
     margin-left:2%;
     overflow-y: auto;
     .el-input{
       width:230px !important;
     }
   }
</style>
