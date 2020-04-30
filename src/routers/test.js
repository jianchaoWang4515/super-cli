export default [{
    path: '/test',
    name: 'test',
    component: () => import('@/views/test'),
    children: [{
        path: 'testDetail',
        name: 'testDetail',
        component: () => import('@/views/login')
    }]
}];
