export default [{
    path: 'detail',
    name: 'detail',
    components: {
        asiderMenu: () => import('@/views/components/menu'),
        default: () => import('@/views/detail')
    },
    meta: {
        title: '详情'
    }
}];
