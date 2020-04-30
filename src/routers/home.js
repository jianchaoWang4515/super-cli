export default [{
    path: 'home',
    name: 'home',
    components: {
        default: () => import('@/views/home')
    },
    meta: {
        breadName: '首页',
        isHome: true
    }
}];
