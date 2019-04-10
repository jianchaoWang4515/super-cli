import Vue from 'vue';
import breadcrumb from './breadcrumb';

const list = [
    breadcrumb
];

list.forEach(item => {
    Vue.component(item.name, item);
});
