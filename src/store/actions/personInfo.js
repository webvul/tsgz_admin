/**
 * Created by Administrator on 2017/8/17 0017.
 */
/*vuex 全局配置方法*/
import AJAX from './../../assets/js/ajax';
let personAction={
  toggleSidebar:({commit})=>{
    commit('toggleSidebar') //触发sidebar开启和隐藏
  },
  //获取登录的信息
  getUserMsg:({commit})=>{
    AJAX.get("website/sys/user/userinfo",{},function(msg){
      commit('userLoginMsg',msg.data);
    })
  },
  //修改并保存用户信息
  submitPersonInfo({commit},dat){
    console.log(dat.user_msg);
    AJAX.post('website/sys/user/info',{params:JSON.stringify(dat.user_msg)},(res)=>{
      dat.editable = false;
    })
  },
  //checkPassWord
  submitPassword({commit},_this){
    AJAX.post('website/sys/user/modifyPwd',{
      oldPassword:_this.passwordForm.oldPassword,
      newPassword:_this.passwordForm.newPassword2
    },function(data){
      _this.init();
      if(data.data.stateCode.code==-100){
        _this.$message.info(data.data.stateCode.message);
      }else{
        _this.$message.info("修改成功");
        _this.$router.push({
                path:'/login',
        })
      }

    })
  },





  //获取用户包的列表
  getPackList:({commit})=>{
    AJAX.get('website/pack/findAllList',{},function(data){
      console.log(data);
      commit("handlePackList",data.data.listGroup);
    })
  },
  //获得商品列表
  getGoodsList:({commit})=>{
    AJAX.post('gcc/gcconfig/getData',{},function(data){
      console.log(data);
      commit("handleGoodsList",data.data);
    })
  },
  //获取业务表列表
  handleBusinessTableList:({commit},dat)=>{
    AJAX.get('website/gen/findAllList',dat,(res)=>{
      console.log(res);
      commit('getBusinessTableList',res);
    })
  },
  //搜索业务表
  handleSearchBusinessTableList:({commit},dat)=>{
    AJAX.get('website/gen/findAllList',dat,(res)=>{
      commit('getBusinessTableList',res);
    })
  },
  //删除业务表
  handleDelectBusinessTableList:({commit},dat)=>{
    AJAX.get('website/gen/deleteGenById',{id:dat.id},(res)=>{
      AJAX.get('website/gen/findAllList',{
        pageSize:dat.pageSize,
        pageNo:dat.pageNo
      },(res1)=>{
        commit('getBusinessTableList',res1);
      })
    })
  },
  //获取新增业务表
  handleFormList:({commit})=>{
    AJAX.get('website/gen/findAllData',{},(res)=>{
      commit('getFormList',res);
    })
  },
  //选择新增业务表
  handleSubmitFormList:({commit},dat)=>{
    AJAX.get('website/gen/isExist',dat,(res)=>{
      commit('submitFormList',res);
    })
  },
  //获取新增/修改业务表
  handleAddFormList:({commit},dat)=>{
    AJAX.get('website/gen/findDataByNext',dat,(res)=>{
      commit('AddFormList',res);
    })
  }
}

export {personAction}
