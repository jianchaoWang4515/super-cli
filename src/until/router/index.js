import Vue from 'vue';
import loginStore from '@/modules/my-vue-plugin/loginStore';
const ROUTER = function ({ Xhr, router, store, igroneUrl }) {
    router.beforeEach((to, from, next) => {
        if (!store.state.myLoginStore) {
            store.registerModule('myLoginStore', loginStore);
        };
        store.commit('SET_LOGIN_STATE', { to, igroneUrl });
        let loginInfo = store.state.myLoginStore.loginInfor;
        if (to.meta.loginAuth && to.path !== '/login') {
            next();
        } else {
            if (loginInfo && to.path !== '/login') {
                next();
            } else {
                Xhr.axios.get('/wjc/get/2').then(res => {
                    if (res.code !== 'no-login') {
                        store.commit('SET_LOGIN_INFOR', { name: 'jianchao.wang' });
                        if (to.path === '/login') {
                            Vue.prototype.$message({ type: 'success', message: '用户已登录' });
                            next('/');
                        } else {
                            next();
                        }
                    } else {
                        if (to.path === '/login') next();
                    }
                });
            };
        };
    });
};

export default ROUTER;
