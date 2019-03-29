import home from '@/routers/home';
import leftMenu from '@/routers/leftMenu';
import demo from '@/routers/demo';
import leftMenuTwo from '@/routers/leftMenuTwo';
import levelThree from '@/routers/levelThree';
import register from '@/routers/register';
import login from '@/routers/login';
import test from '@/routers/test';
import notFount from '@/routers/404';
export default {
    routes: [{
        path: '/',
        component: () => import('@/views/components/layout/index.vue'),
        redirect: '/home',
        children: [
            ...home,
            ...leftMenu,
            ...demo,
            ...leftMenuTwo,
            ...levelThree
        ]
    },
    ...register,
    ...login,
    ...test,
    ...notFount,
    {
        path: '*',
        redirect: '/404'
    }]
};
