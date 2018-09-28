import Vue from 'vue';
import loginStore from '@/modules/my-vue-plugin/loginStore';
const ROUTER = function ({ Xhr, router, store, igroneUrl }) {
    router.beforeEach((to, from, next) => {
        if (!store.state.myLoginStore) {
            store.registerModule('myLoginStore', loginStore);
        };
        store.commit('SET_LOGIN_STATE', { to, igroneUrl });
        let loginInfor = localStorage.getItem('userInfor');
        const currentAuth = store.state.myLoginStore.currentAuth;
        if (!currentAuth) {
            if (!loginInfor && to.path !== '/login') {
                Vue.prototype.$message('用户未登陆');
                next('/login');
            } else if (loginInfor && to.path === '/login') {
                Vue.prototype.$message('用户已登录');
                next('/');
            } else {
                next();
            }
        } else {
            next();
        }
    });
};

export default ROUTER;
