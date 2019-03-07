import Vue from 'vue';
import { STORE, ROUTER } from '@superchao/super';
import loginStore from '@/views/components/loginStore';

let vueRouter = ROUTER({ mode: 'history' });
vueRouter.beforeEach((to, from, next) => {
    if (!STORE.state.myLoginStore) {
        STORE.registerModule('myLoginStore', loginStore);
    };
    let loginInfo = STORE.state.myLoginStore.loginInfor;
    if (to.meta.loginAuth && to.path !== '/login') {
        next();
    } else {
        if (loginInfo && to.path !== '/login') {
            next();
        } else {
            Vue.prototype.$api.loginInfo().then(res => {
                STORE.commit('SET_LOGIN_INFOR', res.data);
                if (to.path === '/login') {
                    Vue.prototype.$message({ type: 'success', message: '用户已登录' });
                    next('/');
                    return;
                };
                next()
            }).catch((err) => {
                if (err.code === 'no-login' && to.path === '/login') next();
            });
        };
    };
});

export default vueRouter;
