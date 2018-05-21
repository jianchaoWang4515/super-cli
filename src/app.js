import Vue from 'vue';
import store from './store';
import VueRouter from 'vue-router';
import routes from './router';
import Base from '@/modules/base';
import ElementUi from 'element-ui';
import '@/plugin/style/index.scss';

Vue.use(VueRouter);
Vue.use(ElementUi);

const router = new VueRouter({
    routes: routes.routes
});

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