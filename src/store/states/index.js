/**
 * Created by 86wh2 on 2017/7/8.
 */
const states={
    sidebar:{
        opened:true  //控制侧边栏是否关闭打开
    },
    level:0,//用户的安全等级
    testData:'', //用来测试的数据
    userList:[],//获取所有用户的信息列表
    //当前登录用户的信息状态
    loginMsg:{
        name:'方明',
        status:'普通管理员',
        sex:'男',
        introduction:'天生的天才,二货',
        avatar:'http://www.itouxiang.net/uploads/allimg/20160610/gwca2j3hbmz177945.jpg',
        limit:0,
        token:'wqwe22445refdfdfgfgfgds'
    },
    //用户的包管理列表
    packList:[],
    //用户获得商品的列表
    goodsList:[]
}

export default states;