/**
 * Created by 86wh2 on 2017/7/8.
 */
import AJAX from './../../assets/js/ajax';
const actions ={
    LOAD_NUM:({commit})=>{
        commit('GET_NUM',{list:23})
    },
    toggleSidebar:({commit})=>{
        commit('toggleSidebar') //触发sidebar开启和隐藏
    },
    testData:({commit})=>{
        AJAX.get('test.json',{},(data)=>{
            console.log(data.data);
            commit('testDat',data.data) //测试数据的处理
        })
    },
    //获取所有用户的信息列表
    getUserList:({commit})=>{
        AJAX.get('user.json',{},function(data){
            commit("user",data.data);
        })
    },
    //切换用户权限
    changeLogin:({commit})=>{
        AJAX.get('loginMsg.json',{},function(data){
            commit("loginMsg",data.data);
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
        AJAX.get1('gcc/gcconfig/getData',{},function(data){
            commit("handleGoodsList",data.data);
        })
    }
}

export default  actions;