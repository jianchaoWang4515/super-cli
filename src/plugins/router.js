import Vue from 'vue';
import Qa from '@/api';
import { ROUTER, STORE } from '@superchao/super';

let vueRouter = ROUTER({ mode: 'history' });
vueRouter.beforeEach((to, from, next) => {
    if (to.meta.noLoginAuth && to.path !== '/login') {
        next();
    } else {
        Qa.session.sessionInfo().then((res) => {
            STORE.commit('SET_LOGIN_INFOR', res.data);
            if (to.path === '/login') {
                Vue.prototype.$message({ type: 'success', message: '用户已登录' });
                next('/');
                return;
            };
            next();
        }).catch((err) => {
            if (err.code === 'no-login' && to.path === '/login') next();
        }).finally(() => {
            next();
        });
    };
    // 每次切换路由清空需要取消请求的url对象
    if (Object.keys(window.__axiosPromiseArr).length) window.__axiosPromiseArr = {};
});

export default vueRouter;
