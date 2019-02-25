import Vue from 'vue';
import '@/plugins/xhr';
import '@/api';
import { TOOL, STORE } from '@superchao/super';
// import myRouter from './until/router';
import router from '@/plugins/router';
import App from './app.vue';
import ElementUi from 'element-ui';
import '@/theme/index.scss';

Vue.use(ElementUi);
// 注册工具
Vue.use(TOOL);

STORE.dispatch('initLang').then(i18n => {
    new Vue({
        el: '#app',
        store: STORE,
        i18n,
        router,
        render: createElement => createElement(App)
    });
});
