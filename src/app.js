import Vue from 'vue';
import '@/plugins/axios';
import '@/api';
import { TOOL, STORE } from '@superchao/super';
import router from '@/plugins/router';
import App from './app.vue';
import ElementUi from 'element-ui';
import i18n from '@superchao/super/i18n';
import '@/theme/index.scss';
import globalStore from '@/store/global';
import '@/components';

Vue.use(ElementUi);
// 注册工具
Vue.use(TOOL);
STORE.registerModule('global', globalStore);

new Vue({
    el: '#app',
    store: STORE,
    i18n,
    router,
    render: createElement => createElement(App)
});
