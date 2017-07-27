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
        AJAX.get("sys/user/userinfo",{},function(msg){
            commit('userLoginMsg');
        })
    },
    //获取所有用户的信息列表
    getUserList:({commit})=>{
        AJAX.get('user.json',{},function(data){
            commit("user",data.data);
        })
    },
    //获取用户包的列表
    getPackList:({commit})=>{
        AJAX.get('packList.json',{},function(data){
            commit("handlePackList",data.data.packList);
        })
    },
    //获得商品列表
    getGoodsList:({commit})=>{
        AJAX.post('gcc/gcconfig/getData',{},function(data){
            console.log(data);
            commit("handleGoodsList",data.data);
        })
    }
}

export default  actions;