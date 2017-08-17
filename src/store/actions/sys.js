/**
 * Created by Administrator on 2017/8/17 0017.
 */
/*vuex 全局配置方法*/
import AJAX from './../../assets/js/ajax';
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
        beginDate = _this.parse(_this.labelData2.beginDate) ;
      }
      if(_this.labelData2.endDate!=''){
        endDate = _this.parse(_this.labelData2.endDate);
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
      _this.managerDetail.data = res.data.data;
      _this.managerDetail.total = res.data.data.count;
    })
  },
  // //获取归属公司 归属部门 以及总的树结构
  // getListTypeTree({commit},_this,type){
  //   AJAX.get("/website/sys/office/treeData", {
  //     type: type
  //   }, (res) => {
  //     switch (type) {
  //       case 1 : {
  //         _this.managerDetail.companyTree = tranlateDataTreeManagement(res.data);
  //         break;
  //       }
  //       case 2 : {
  //         _this.managerDetail.officeTree = tranlateDataTreeManagement(res.data);
  //         break;
  //       }
  //       default: {
  //         _this.managementMenu = tranlateDataTreeManagement(res.data);
  //       }
  //     }
  //   })
  // },
}

export {sysAction}
