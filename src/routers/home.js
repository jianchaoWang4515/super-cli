export default [{
    path: 'home',
    name: 'home',
    components: {
        default: () => import('@/views/home')
    },
    children: [{
        path: 'test',
        name: 'home-test',
        component: () => import('@/views/test'),
        meta: {
            breadName: '首页测试'
        }
    }],
    meta: {
        breadName: '首页',
        isHome: true
    }
}];
