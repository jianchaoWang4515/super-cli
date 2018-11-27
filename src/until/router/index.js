import Vue from 'vue';
import store from '../store';
import XHR from '../xhr/config';
import VueRouter from 'vue-router';
import routers from '@/router';
import loginStore from '@/modules/components/loginStore';
class Router {
    constructor ({ XHR, store }) {
        this.Xhr = XHR;
        this.router = this.initRouter('history', routers.routes);
        this.store = store;
        this.beforeEach();
    }
    initRouter (mode = 'history', routes) {
        Vue.use(VueRouter);
        return new VueRouter({
            mode,
            routes
        });
    }
    beforeEach () {
        this.router.beforeEach((to, from, next) => {
            if (!this.store.state.myLoginStore) {
                this.store.registerModule('myLoginStore', loginStore);
            };
            let loginInfo = this.store.state.myLoginStore.loginInfor;
            if (to.meta.loginAuth && to.path !== '/login') {
                next();
            } else {
                if (loginInfo && to.path !== '/login') {
                    next();
                } else {
                    this.store.dispatch('SESSION_INFO').then(res => {
                        if (res.code !== 'no-login') {
                            this.store.commit('SET_LOGIN_INFOR', res.data);
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
    }
}
export default new Router({ XHR, store });
