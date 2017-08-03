/**
 * Created by 86wh2 on 2017/7/8.
 */
// 这里控制我所有的路由
import components from './routesLazy';
let router = [
    // 默认显示路由
    {
        path: '/login',
        name: '登录',
        component: components.Login,
        hidden: true
    },
    {
        path: '/404',
        name: '404页面',
        component: components.UnFind,
        hidden: true
    },
    {
        path: '/home',
        redirect: '/home/Personal',
        component: components.Home_view,
        name:'我的面板',
        iconCls: 'fa fa-address-card',//图标样式class
        children: [
            {
                path: 'Personal',
                name: '基本信息',
                component: components.MainApp,
                redirect: '/home/Personal/PersonalInfo',
                iconCls: 'icon iconfont icon-gerenxinxi',//图标样式class
                children:[
                    {
                        path: 'PersonalInfo',
                        name: '个人信息',
                        component: components.PersonalInfo,
                        leaf: true,//只有一个节点
                    },
                    {
                        path: 'pass',
                        name: '密码修改',
                        component: components.PassWord,
                        leaf: true,//只有一个节点
                    },
                ]
            },

            {
                path: 'userManage',
                name: '用户管理',
                iconCls: 'icon iconfont icon-yonghuguanli',//图标样式class
                component: components.UserManage,
                leaf: true,//只有一个节点
            },
        ]

    },
    {
        path: '/pack',
        component: components.Home_view,
        name:'业务包',
        redirect: '/pack/groupList',
        iconCls: 'fa fa-address-card',//图标样式class
        children: [
            {
                path: 'groupList',
                name: '业务包列表',
                leaf: true,//只有一个节点
                component: components.groupList
            },
            {
                path: 'listEdit',
                name: '业务包批量管理',
                component: components.groupListEdit,
                hidden:true
            },
            {
                path: 'packSQL',
                name: 'SQL数据集配置',
                component: components.packSQL,
                hidden:true
            },
            {
                path: 'packEXCELL',
                name: 'Excell数据集配置',
                component: components.packEXCELL,
                hidden:true
            },
            {
                path: 'packETL',
                name: 'ETL数据集配置',
                component: components.packETL,
                hidden:true
            },
            {
                path: 'listAdd/:id',
                name: '业务包添加',
                leaf: true,//只有一个节点
                component: components.groupListAdd,

            },
            {
                path: 'groupListAddStep',
                name: '添加业务包',
                component: components.groupListAddStep,
                hidden:true
            },
            {
                path: 'packDetail',
                name: '业务包管理详情',
                component: components.packDetail,
                hidden:true
            },
            {
                path: 'confirmAdd',
                name: '业务包保存确定页',
                component: components.confirmAdd,
                hidden:true
            },
        ]

    },
    {
        path: '/goods',
        component: components.Home_view,
        name:'商品分类配置',
        redirect: '/goods/goodsList',
        iconCls: 'fa fa-address-card',//图标样式class
        children: [
            {
                path: 'goodsList',
                name: '商品分类',
                leaf: true,//只有一个节点
                component: components.goodsList
            },
            {
                path: 'goodsListEdit',
                name: '菜单修改',
                leaf: true,//只有一个节点
                component: components.goodsListEdit,
                hidden:true
            },
        ]
    },
    {
        path: '/code',
        component: components.Home_view,
        name:'代码生成工具',
        redirect: '/code/ServiceTable',
        iconCls: 'fa fa-address-card',//图标样式class
        children: [
            {
                path: 'ServiceTable',
                name: '业务表列表',
                leaf: true,//只有一个节点
                component: components.ServiceTable
            },
            {
                path: 'programmeTable',
                name: '生成方案配置',
                leaf: true,//只有一个节点
                component: components.programmeTable
            },
            {
                path: 'addServiceTable',
                name: '新增-修改表',
                leaf: true,//只有一个节点
                component: components.addServiceTable,
                hidden:true
            },
        ]
    },
   {
        path: '/dynData',
        component: components.Home_view,
        name:'数据导入工具',
        redirect: '/dynData/DataImport',
        iconCls: 'fa fa-address-card',//图标样式class
        children: [
            {
                path: 'DataImport',
                name: '数据导入',
                component: components.MainApp,
                redirect: '/dynData/DataImport/dataSourceConfig',
                iconCls: 'icon iconfont icon-gerenxinxi',//图标样式class
                children:[
                    {
                        path: 'dataSourceConfig',
                        name: '数据源配置',
                        component: components.dataSourceConfig,
                        leaf: true,//只有一个节点
                    },{
                        path: 'extTableImport',
                        name: '外部表结构导入',
                        component: components.extTableImport,
                        leaf: true,//只有一个节点
                    },{
                        path: 'addDataTable',
                        name: '导入新外部表结构',
                        component: components.addDataTable,
                        leaf: true,//只有一个节点
                        hidden:true
                    },{
                        path: 'importTableColumn',
                        name: '查看表字段',
                        component: components.importTableColumn,
                        leaf: true,//只有一个节点
                        hidden:true
                    },{
                        path: 'dataImportTimer',
                        name: '数据导入定时任务',
                        component: components.dataImportTimer,
                        leaf: true,//只有一个节点
                    },
                ]
            },
        ]
    },
    {
        path: '/tes',
        component: components.Home_view,
        name:'测试中心',
        redirect: '/tes/test',
        iconCls: 'fa fa-plus-circle',//图标样式class
        leaf: true,//只有一个节点
        children: [
            {
                path: 'test',
                name: '测试页面',
                component: components.Test,
                leaf: true,//只有一个节点
            },
            {
                path: 'test111',
                name: '测试页面1',
                component: components.test111,
            },

        ]

    },
    // 重定向路由
    {
        path: '/*',
        hidden: true,
        redirect: {path: '/login'}
    }
];

export default router;