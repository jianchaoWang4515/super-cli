import Vue from 'vue';
import Router from '@/router';
// import breadcrumb from './breadcrum';
import SpBreadcrumb from './breadcrumb/index';

// const list = [
//     breadcrumb
// ];

// list.forEach(item => {
//     Vue.component(item.name, item);
// });

Vue.use(new SpBreadcrumb(Router.routes));
