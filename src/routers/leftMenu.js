export default [{
    path: 'leftMenu',
    name: 'leftMenu',
    components: {
        asiderMenu: () => import('@/views/components/menu'),
        default: () => import('@/views/leftMenu')
    },
    meta: {
        title: '菜单一'
    }
}];
