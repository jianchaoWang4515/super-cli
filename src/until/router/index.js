import Vue from 'vue';
import loginStore from '@/modules/my-vue-plugin/loginStore';
const ROUTER = function({ router, store, igroneUrl }) {
    router.beforeEach((to, from, next) => {
        if (!store.state.myLoginStore) {
            store.registerModule('myLoginStore', loginStore);
        };
        store.commit('SET_LOGIN_STATE', { to, igroneUrl });
        let loginInfor = store.state.myLoginStore.loginInfor;
        let loginState = store.state.myLoginStore.loginState;
        if (!loginInfor && to.path !== '/login') {
            Vue.prototype.$message('用户未登陆, 即将跳转到登陆页');
            setTimeout(() => {
                next('/login');
            }, 2000)
        } else {
            next();
        }
    });
}

export default ROUTER;