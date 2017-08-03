/**
 * Created by 86wh2 on 2017/7/8.
 */
import AJAX from './../../assets/js/ajax';
const actions ={
    toggleSidebar:({commit})=>{
        commit('toggleSidebar') //触发sidebar开启和隐藏
    },
    //获取用户登录信息
    handleUserMsg:({commit})=>{
        AJAX.get("website/sys/user/userinfo",{},function(msg){
            console.log(msg);
            commit('userLoginMsg',msg.data);
        })
    },
    //获取用户包的列表
    getPackList:({commit})=>{
        AJAX.get('website/pack/findAllList',{},function(data){
            console.log(data);
            commit("handlePackList",data.listGroup);
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

export default  actions;