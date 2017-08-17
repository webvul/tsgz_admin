/**
 * Created by 86wh2 on 2017/7/8.
 */
import Vue from 'vue'
import VueRoute from 'vue-router'
import 'babel-polyfill' //解决ie浏览器无内置promise对象
import MyRoutes from './routers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRoute);
let router = new VueRoute({
    // mode: 'history',
    routes: MyRoutes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }

});
router.beforeEach((to, from, next) => {
    NProgress.done().start();//模拟页面加载的滚动条
    if (to.path === '/login') {
        sessionStorage.removeItem('Token');
    }
    let token = JSON.parse(sessionStorage.getItem('Token'));
    if (!token && to.path !== '/login') {
        next({path: '/login'})
    } else {
        next()
    }
})
//路由完成之后的操作
router.afterEach(route => {
    NProgress.done()
})
export default router;
