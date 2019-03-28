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
        }, {
            path: 'leftMenu',
            name: 'leftMenu',
            components: {
                asiderMenu: () => import('@/views/components/menu'),
                default: () => import('@/views/leftMenu')
            }
        }, {
            path: 'demo',
            name: 'demo',
            components: {
                default: () => import('@/views/demo')
            }
        }, {
            path: 'demoLeftMenu',
            name: 'demoLeftMenu',
            components: {
                asiderMenu: () => import('@/views/components/menu'),
                default: () => import('@/views/demo')
            }
        }, {
            path: 'levelThree',
            name: 'levelThree',
            components: {
                asiderMenu: () => import('@/views/components/menu'),
                default: () => import('@/views/demo')
            }
        }]
    }, {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register'),
        meta: {
            noLoginAuth: 1 // 不需要判断登录权限
        }
    }, {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login'),
        meta: {
            noLoginAuth: 1
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
