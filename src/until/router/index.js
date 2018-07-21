import Vue from 'vue';
import loginStore from '@/modules/my-vue-plugin/loginStore';
const ROUTER = function({ Xhr, router, store, igroneUrl }) {
    router.beforeEach((to, from, next) => {
        if (!store.state.myLoginStore) {
            store.registerModule('myLoginStore', loginStore);
        };
        store.commit('SET_LOGIN_STATE', { to, igroneUrl });
        // let loginInfor = store.state.myLoginStore.loginInfor;
        // let loginState = store.state.myLoginStore.loginState;
        let loginInfor = localStorage.getItem('userInfor');
        if (!loginInfor && to.path !== '/login') {
            Vue.prototype.$message('用户未登陆');
            next('/login');
            // Xhr.axios.get('/platform/session-info').then((res) => {
            //     if (res.code === 'success') {
            //         store.commit('SET_LOGIN_INFOR', res.data);
            //         next('/')
            //     } else if (res.code === 'user-not-login') {
            //         if (to.path === '/login') {
            //             next()
            //         } else {
            //             Vue.prototype.$message('用户未登陆, 即将跳转到登陆页');
            //             setTimeout(() => {
            //                 next('/login');
            //             }, 2000)
            //         }
            //     }
            // });
        } else if (loginInfor && to.path === '/login') {
            Vue.prototype.$message('用户已登录');
            next('/');
        } else {
            next()
        }
    });
}

export default ROUTER;