import Vue from 'vue';
import Router from '@/router';
import SpBreadcrumb from 'sp-breadcrumbs';
// import SpBreadcrumb from './breadcrumb';

Vue.use(new SpBreadcrumb(Router.routes));
