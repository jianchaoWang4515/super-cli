import Vue from 'vue';
import { store, TOOL, Ajax } from './until';
import myRouter from './until/router';
import VueRouter from 'vue-router';
import routes from './router';
import Base from '@/modules/base';
import ElementUi from 'element-ui';
import '@/theme/index.scss';

Vue.use(VueRouter);
Vue.use(ElementUi);
// 注册工具
Vue.use(TOOL);

const Xhr = new Ajax();

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
