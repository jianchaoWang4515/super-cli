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
        path: '/login',
        name: 'login',
        component: require('@/modules/login').default
    }, {
        path: '/test',
        name: 'test',
        component: require('@/modules/test').default
    }]
}
