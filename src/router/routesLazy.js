/**
 * Created by 86wh2 on 2017/7/8.
 */
const Login = resolve => require(['./../main/Login.vue'], resolve);
const Home_view = resolve => require(['./../main/Home.vue'], resolve);
const UnFind = resolve => require(['./../main/404.vue'], resolve);
const MainApp = resolve => require(['./../components/Layout/MainApp.vue'], resolve);
//用户管理界面
const PassWord = resolve => require(['./../pages/PersonalInfo/passWord.vue'], resolve); //密码修改页面
const UserManage =resolve => require(['../pages/PersonalInfo/UserManage.vue'], resolve); //用户账号管理界面
const PersonalInfo=resolve => require(['../pages/PersonalInfo/index.vue'], resolve); //个人信息界面
//业务包
const groupList=resolve => require(['../pages/pack/list.vue'], resolve); //业务包列表页面
const groupListEdit=resolve => require(['../pages/pack/listEdit.vue'], resolve); //业务包列表编辑
const groupListAdd=resolve => require(['../pages/pack/listAdd.vue'], resolve); //业务包列表编辑
const groupListAddStep=resolve => require(['../pages/pack/listAddStep2.vue'], resolve);//业务包添加第二步
const packDetail=resolve => require(['../pages/pack/packDetail.vue'], resolve);//业务包详情页面
const confirmAdd=resolve => require(['../pages/pack/confirmAdd.vue'], resolve);//业务包表添加确定页面
//商品分类配置
const goodsList = resolve => require(['../pages/goodsClassification/goodsList.vue'], resolve)
const goodsListEdit = resolve => require(['../pages/goodsClassification/addGoodsFrom.vue'], resolve)
const Test =resolve => require(['./../pages/test/test.vue'], resolve); //测试的无用界面
//代码生成工具
const ServiceTable = resolve => require(['../pages/code/ServiceTable.vue'], resolve)
const programmeTable =resolve => require(['./../pages/code/programmeTable.vue'], resolve);
const addServiceTable =resolve => require(['./../pages/code/addServiceTable.vue'], resolve);

//数据导入工具
const dataSourceConfig = resolve => require(['../pages/dynData/dataSourceConfig.vue'], resolve)
const extTableImport =resolve => require(['./../pages/dynData/extTableImport.vue'], resolve);
const dataImportTimer =resolve => require(['./../pages/dynData/dataImportTimer.vue'], resolve);

const test111 =resolve => require(['./../pages/test/tes111.vue'], resolve);
export default {
    Login,
    Home_view,
    UnFind,
    MainApp,
    PassWord,
    UserManage,
    PersonalInfo,
    Test,
    groupList,
    groupListEdit,
    groupListAdd,
    groupListAddStep,
    packDetail,
    confirmAdd,
    goodsList,
    goodsListEdit,
    ServiceTable,
    programmeTable,
    addServiceTable,
   dataSourceConfig,
    extTableImport,
    dataImportTimer,
    test111
};