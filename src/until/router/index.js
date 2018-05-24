import loginStore from '@/modules/my-vue-plugin/loginStore';
const ROUTER = function({ router, store, igroneUrl }) {
    router.beforeEach((to, from, next) => {
        if (!store.state.myLoginStore) {
            store.registerModule('myLoginStore', loginStore);
        };
        store.commit('SET_LOGIN_STATE', { to, igroneUrl });
        let loginInfor = store.state.myLoginStore.loginInfor;
        let loginState = store.state.myLoginStore.loginState;
        if (!loginInfor) {
            // window.location.href = '/#/login';
            next();
            // next(false);
        } else {
            next();
        }
    });
}

export default ROUTER;