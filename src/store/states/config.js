 /*vuex 全局配置方法*/

let configState={
  router:[
    {test:[1,2,1]}
  ],
  sidebar:{
    opened:true  //控制侧边栏是否关闭打开
  },
  prefix:'http://192.168.10.228:8080', //服务器前缀配置
 // prefix:'http://127.0.0.1:8080', //服务器前缀配置
  //prefix:'http://192.168.134.111:8080', //服务器前缀配置
  user_msg:{}, //用户的登录信息
  level:0,//用户密码的安全等级
  userList:[],//获取所有用户的信息列表
  //当前登录用户的信息状态
  //用户的包管理列表
  packList:[],
  //用户获得商品的列表
  goodsList:[],
  //业务表列表
  BusinessTableList:[],
  chooseTableList:{
    name:'',
    id:'',
    list:[]
  },
  formList:[],
  addFormListMsg:'',//用户新增业务表返回的信息
  addFormList:{
    genTable:{}
  }, //用户新增或者修改返回数据列表
  //路由高亮
  headerCurRouter:'',
  sidebarCurrentRouter:'',
  //全局窗口自适应数据
  screenHeight:0,
  scrollBarState:true,//控制滚动条只出现一次
  //获取菜单列表
  menu_router:[],
}

export {configState}
