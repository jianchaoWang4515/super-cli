export default [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
        noLoginAuth: 1,
        noCrumbs: true
    }
}];
