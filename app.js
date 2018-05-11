import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';
import Base from '@/modules/base';
Vue.use(VueRouter);
const router = new VueRouter({
    routes: routes.routes
});
new Vue({
    el: '#app',
    name: 'test',
    router: router,
    template: '<Base />',
    components: { Base }
});


// webpack热加载
if (module.hot) { module.hot.accept(); };