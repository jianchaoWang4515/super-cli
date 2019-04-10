export default [{
    path: '/register',
    name: 'register',
    component: () => import('@/views/register'),
    meta: {
        noLoginAuth: 1, // 不需要判断登录权限
        noCrumbs: true
    }
}];
