import Vue from 'vue';
import store from './until/store';
import VueRouter from 'vue-router';
import routes from './router';
import myRouter from './until/router';
import Base from '@/modules/base';
import ElementUi from 'element-ui';
import ajax from './until/xhr/config';
import '@/plugin/style/index.scss';

Vue.use(VueRouter);
Vue.use(ElementUi);

ajax();

const router = new VueRouter({
    routes: routes.routes
});

const ROUTER_CONFIG = {
	router,
	store,
	igroneUrl: ['/login']
}

myRouter(ROUTER_CONFIG);

new Vue({
    el: '#app',
    name: 'test',
    store,
    router: router,
    template: '<Base />',
    components: { Base }
});


// webpack热加载
if (module.hot) { module.hot.accept(); };