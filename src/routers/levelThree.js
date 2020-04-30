export default [{
    path: 'levelThree',
    name: 'levelThree',
    components: {
        asiderMenu: () => import('@/views/components/menu'),
        default: () => import('@/views/demo')
    },
    meta: {
        breadName: '三级菜单'
    }
}];
