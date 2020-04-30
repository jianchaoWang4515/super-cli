export default [{
    path: 'leftMenuTwo',
    name: 'leftMenuTwo',
    components: {
        asiderMenu: () => import('@/views/components/menu'),
        default: () => import('@/views/demo')
    },
    meta: {
        breadName: '菜单二'
    }
}];
