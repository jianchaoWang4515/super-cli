export default {
    routes: [{
        path: '/',
        component: require('@/views/components/layout').default,
        children: [{
            path: '',
            name: 'home',
            components: {
                asiderMenu: require('@/views/components/menu').default,
                default: require('@/views/home').default
            }
        }]
    }, {
        path: '/register',
        name: 'register',
        component: require('@/views/register').default,
        meta: {
            loginAuth: 1 // 不需要判断登录权限
        }
    }, {
        path: '/login',
        name: 'login',
        component: require('@/views/login').default,
        meta: {
            loginAuth: 1
        }
    }, {
        path: '/test',
        name: 'test',
        component: require('@/views/test').default
    }]
};
