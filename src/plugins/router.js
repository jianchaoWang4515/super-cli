import Vue from 'vue';
import { STORE, ROUTER } from '@superchao/super';

let vueRouter = ROUTER({ mode: 'history' });
vueRouter.beforeEach((to, from, next) => {
    if (to.meta.noLoginAuth && to.path !== '/login') {
        next();
    } else {
        STORE.dispatch('global/getSession').then(res => {
            STORE.commit('SET_LOGIN_INFOR', res.data);
            if (to.path === '/login') {
                Vue.prototype.$message({ type: 'success', message: '用户已登录' });
                next('/');
                return;
            };
            next();
        }).catch((err) => {
            if (err.code === 'no-login' && to.path === '/login') next();
        });
    };
    // 每次切换路由清空需要取消请求的url对象
    if (Object.keys(window.__axiosPromiseArr).length) window.__axiosPromiseArr = {};
});

export default vueRouter;
