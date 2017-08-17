/**
 * Created by 86wh2 on 2017/7/8.
 */
const Login = resolve => require(['./../main/Login.vue'], resolve);
const Home_view = resolve => require(['./../main/Home.vue'], resolve);
const UnFind = resolve => require(['./../main/404.vue'], resolve);
const MainApp = resolve => require(['./../components/Layout/MainApp.vue'], resolve);
//用户管理界面
const PassWord = resolve => require(['./../pages/PersonalInfo/passWord.vue'], resolve); //密码修改页面
const PersonalInfo=resolve => require(['../pages/PersonalInfo/index.vue'], resolve); //个人信息界面
//业务包
const groupList=resolve => require(['../pages/pack/list.vue'], resolve); //业务包列表页面
const groupListEdit=resolve => require(['../pages/pack/listEdit.vue'], resolve); //业务包列表编辑
const groupListAdd=resolve => require(['../pages/pack/listAdd.vue'], resolve); //业务包列表编辑
const groupListAddStep=resolve => require(['../pages/pack/listAddStep2.vue'], resolve);//业务包添加第二步
const packDetail=resolve => require(['../pages/pack/packDetail.vue'], resolve);//业务包详情页面
const confirmAdd=resolve => require(['../pages/pack/confirmAdd.vue'], resolve);//业务包表添加确定页面
const groBusPackagesUpdate =resolve => require(['../pages/pack/groBusPackagesUpdate.vue'], resolve);//业务包管理详情页面
const packSQL=resolve => require(['../pages/pack/packSQL.vue'], resolve);//SQL数据集配置
const packEXCELL=resolve => require(['../pages/pack/packEXCELL.vue'], resolve);//SQL数据集配置
const packETL=resolve => require(['../pages/pack/packETL.vue'], resolve);//SQL数据集配置
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
const addDataTable =resolve => require(['./../pages/dynData/addDataTable.vue'], resolve);
const importTableColumn =resolve => require(['./../pages/dynData/importTableColumn.vue'], resolve);
const test111 =resolve => require(['./../pages/test/tes111.vue'], resolve);
//系统设置
const logList = resolve => require(['../pages/sys/logList.vue'], resolve)
const menu = resolve => require(['../pages/sys/Menu/menu.vue'], resolve)
const dict = resolve => require(['../pages/sys/Dict/dict.vue'], resolve)
const role = resolve => require(['../pages/sys/Role/role.vue'], resolve)
//系统设置 用户管理
const userManager = resolve => require(['../pages/sys/InstitutionalUser/userManager.vue'], resolve)
const areaManager = resolve => require(['../pages/sys/Area/area.vue'], resolve)
const officeManager = resolve => require(['../pages/sys/Office/officeManager.vue'], resolve)

export default {
    Login,
    Home_view,
    UnFind,
  MainApp,
    PassWord,
    PersonalInfo,
    Test,
    //业务包
    groupList,
    groupListEdit,
    groupListAdd,
    groupListAddStep,
    packDetail,
    confirmAdd,
    groBusPackagesUpdate,
    packSQL,
    packEXCELL,
    packETL,
    //商品分类
    goodsList,
    goodsListEdit,
    ServiceTable,
    programmeTable,
    addServiceTable,
    dataSourceConfig,
    extTableImport,
    dataImportTimer,
    addDataTable,
    logList,
    importTableColumn,
    test111,
    //用户管理
    userManager,
    //系统设置
    menu,
    dict,
    role,
    //区域管理
    areaManager,
    officeManager,
};

