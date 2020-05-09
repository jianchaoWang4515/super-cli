export default [{
    path: 'detail/:id',
    name: 'detail',
    components: {
        asiderMenu: () => import('@/views/components/menu'),
        default: () => import('@/views/detail')
    },
    meta: {
        breadName: '详情',
        childNames: [
            'detail-children'
        ]
    }
}];
