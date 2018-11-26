export default {
    routes: [{
        path: '/',
        component: require('@/modules/layout').default,
        children: [{
            path: '',
            name: 'home',
            components: {
                asiderMenu: require('@/modules/my-vue-plugin/menu').default,
                default: require('@/modules/home').default
            }
        }]
    }, {
        path: '/register',
        name: 'register',
        component: require('@/modules/register').default,
        meta: {
            loginAuth: 1 // 不需要判断登录权限
        }
    }, {
        path: '/login',
        name: 'login',
        component: require('@/modules/login').default,
        meta: {
            loginAuth: 1
        }
    }, {
        path: '/test',
        name: 'test',
        component: require('@/modules/test').default,
        meta: {
        }
    }]
};
