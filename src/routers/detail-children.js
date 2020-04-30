export default [{
    path: 'detail-children',
    name: 'detail-children',
    components: {
        asiderMenu: () => import('@/views/components/menu'),
        default: () => import('@/views/detail-children')
    },
    meta: {
        breadName: '子详情'
    }
}];
