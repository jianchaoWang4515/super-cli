import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import XHR from '../xhr/config';
Vuex.Store.prototype.XHR = XHR.axios;
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    	test: '测试Vuex',
    	locale: 'cn'
    },
    mutations,
    actions
});
