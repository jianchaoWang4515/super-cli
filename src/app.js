import Vue from 'vue';
import { store, TOOL } from './until';
import myRouter from './until/router';
import Base from '@/components/base';
import ElementUi from 'element-ui';
import '@/theme/index.scss';

Vue.use(ElementUi);
// 注册工具
Vue.use(TOOL);

store.dispatch('initLang').then(i18n => {
    new Vue({
        el: '#app',
        name: 'test',
        store,
        i18n,
        router: myRouter.router,
        template: '<Base />',
        components: { Base }
    });
});
