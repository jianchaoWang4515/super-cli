export default [{
    path: 'home',
    name: 'home',
    components: {
        asiderMenu: () => import('@/views/components/menu'),
        default: () => import('@/views/home')
    }
}];
