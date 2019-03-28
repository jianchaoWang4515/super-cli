import Vue from 'vue';
import { STORE, ROUTER } from '@superchao/super';

let vueRouter = ROUTER({ mode: 'history' });
vueRouter.beforeEach((to, from, next) => {
    if (to.meta.noLoginAuth && to.path !== '/login') {
        next();
    } else {
        Vue.prototype.$api.loginInfo().then(res => {
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
});

export default vueRouter;
