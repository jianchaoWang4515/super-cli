import Vue from 'vue';
import store from './until/store';
import TOOL from './until/tool';
import VueRouter from 'vue-router';
import routes from './router';
import myRouter from './until/router';
import Base from '@/modules/base';
import ElementUi from 'element-ui';
import ajax from './until/xhr/config';
import '@/plugin/style/index.scss';

Vue.use(VueRouter);
Vue.use(ElementUi);
// 注册工具
Vue.use(TOOL);

const Xhr = ajax();

const router = new VueRouter({
    mode: 'history',
    routes: routes.routes
});

const ROUTER_CONFIG = {
    Xhr,
    router,
    store,
    igroneUrl: ['/test']
};

myRouter(ROUTER_CONFIG);

store.dispatch('initLang').then(i18n => {
    new Vue({
        el: '#app',
        name: 'test',
        store,
        i18n,
        router: router,
        template: '<Base />',
        components: { Base }
    });
});

// webpack热加载
if (module.hot) { module.hot.accept(); };
