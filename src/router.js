export default {
    routes: [{
        path: '/',
        component: () => import('@/views/components/layout/index.vue'),
        children: [{
            path: '',
            name: 'home',
            components: {
                asiderMenu: () => import('@/views/components/menu'),
                default: () => import('@/views/home')
            }
        }]
    }, {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register'),
        meta: {
            loginAuth: 1 // 不需要判断登录权限
        }
    }, {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login'),
        meta: {
            loginAuth: 1
        }
    }, {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test')
    }, {
        path: '/404',
        name: '404',
        component: () => import('@/views/errors/404')
    }, {
        path: '*',
        redirect: '/404'
    }]
};
