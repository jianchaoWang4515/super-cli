export default [{
    path: 'levelThree',
    name: 'levelThree',
    components: {
        asiderMenu: () => import('@/views/components/menu'),
        default: () => import('@/views/demo')
    }
}];
