/**
 * Created by 86wh2 on 2017/7/8.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill' //解决ie浏览器无内置promise对象
//引入模块
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './states'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
