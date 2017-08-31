/**
 * Created by Administrator on 2017/8/17 0017.
 */
/*vuex 全局配置方法*/
import AJAX from './../../assets/js/ajax';
import {tranlateDataTreeManagement} from '@/utils';
let sysAction={
  //获取日志
  getSysLoglist({commit},_this){
      let exception = _this.checked;
      if(exception==true){
        exception = '1';
      }else{
        exception = '';
      }
      let beginDate = _this.labelData2.beginDate;
      let endDate = _this.labelData2.endDate ;
      if(_this.labelData2.beginDate!=''){
        beginDate = Date.parse(_this.labelData2.beginDate) ;
      }
      if(_this.labelData2.endDate!=''){
        endDate = Date.parse(_this.labelData2.endDate);
      }
      AJAX.post('website/sys/log/findAllLogs',{
        pageSize:_this.pageSize,
        pageNo:_this.page,
        title:_this.labelData.title,
        userName:_this.labelData.userName,
        requestUri:_this.labelData.requestUri,
        beginDate:  beginDate,
        endDate:endDate,
        exception:exception
      },function(data){
        _this.msg = data.data.data.data;
        _this.total=data.data.data.count;
      })
  },
  //获取用户列表
  getUserList({commit},_this){
    AJAX.post("website/sys/user/getUserList", {
      companyId: _this.managerDetail.form.companyId,
      officeId: _this.managerDetail.form.officeId,
      loginName: _this.managerDetail.form.loginName,
      name: _this.managerDetail.form.name,
      pageSize: _this.managerDetail.pageSize,
      pageNo: _this.managerDetail.pageNo
    }, (res) => {
      _this.tableList = res.data.data.list;
      _this.total = res.data.data.count;
    })
  },
  //获取归属公司，归属部门的接口
  getsourceTree({commit},_this){
    AJAX.get("website/sys/office/treeData", {},(res)=>{
      _this.managementMenu = tranlateDataTreeManagement(res.data);
    })
  },
  //获取公司列表
  getCompanySource({commit},_this){
    AJAX.get("website/sys/office/getCompanys", {
      type:1,
      useable:1
    },(res)=>{
      _this.managerDetail.companyTree =res.data;
      _this.managerDetail.form.companyId=res.data[0].id;
      _this.orginCompanyId=res.data[0].id;

    })
  },
  //根据公司查询部门列表
  getOfficeSource({commit},_this){
    AJAX.get("website/sys/office/getOfficeByCompanyId", {
      companyId:_this.managerDetail.form.companyId
    },(res)=>{
      _this.managerDetail.officeTree =res.data;
      _this.managerDetail.form.officeId='';
      _this.orginOfficeId=res.data[0].id;

    })
  },
  //根据部门Id查询公司Id
  getParentsCompanyId({commit},_this){
    AJAX.get("website/sys/office/getCompanyByOfficeId", {
      officeId:_this.temp_id
    },(res)=>{
      _this.managerDetail.form.companyId = res.data.companyId;
      window.setTimeout(()=>{
        _this.managerDetail.form.officeId=_this.temp_id;
        _this.getUserList(_this);
      },200)
    })
  },
  //获取用户类型列表
  getDictList({commit},_this){
    AJAX.get('website/sys/user/getDictList',{type:_this.sys_type},(res)=>{
      _this.user_type=res.data.type;
    })
  },
  getRoleList({commit},_this){
    AJAX.get('website/sys/role/getRoleList',{},(res)=>{
      _this.allRoles=res.data;
    })
  },
  //获取用户信息的接口
  getUserForm({commit},_this){
    AJAX.get('website/sys/user/getUseInfo',{userId:_this.ruleForm.id},(res)=>{
      _this.allRoles=res.data.allRoles;
      res.data.user.roleArr=[];
      _this.ruleForm=Object.assign({},res.data.user);
      _this.ruleForm.companyId=res.data.companyId;
      _this.ruleForm.officeId=res.data.officeId;
      if(res.data.user.loginFlag=='1'){
        _this.ruleForm.loginFlag=true;
      }else{
        _this.ruleForm.loginFlag=false;
      }
      _this.ruleForm.roleArr=_this.ruleForm.roleNames.split(',');
    })
  },
  //保存新增、修改用户信息
  handleSaveUser({commit},_this){
    AJAX.post("website/sys/user/saveOrUpdate",{
      params:JSON.stringify(_this.ruleForm)
    },(res)=>{
      if(res.data.stateCode.code===200){
        _this.dialogGoodsVisible=false;
        _this.init();
        _this.getUserList(_this);
      }else{
        _this.$message.error(res.data.stateCode.msg);
      }
    })
  },
  handleDeleteUserList({commit},_this){
    AJAX.delete('website/sys/user/deleteByIds',{
      ids:JSON.stringify(_this.deleteGroup),
    },function(data){
      _this.getUserList(_this);
    })
  }

}

export {sysAction}
