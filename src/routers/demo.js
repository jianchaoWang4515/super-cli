export default [{
    path: 'demo',
    name: 'demo',
    components: {
        default: () => import('@/views/demo')
    },
    meta: {
        breadName: '一级菜单二'
    }
}];
