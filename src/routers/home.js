export default [{
    path: 'home',
    name: 'home',
    components: {
        default: () => import('@/views/home')
    },
    meta: {
        title: '首页'
    }
}];
