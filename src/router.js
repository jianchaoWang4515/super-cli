import home from '@/routers/home';
import menu from '@/routers/menu';
import leftMenu from '@/routers/leftMenu';
import detail from '@/routers/detail';
import demo from '@/routers/demo';
import leftMenuTwo from '@/routers/leftMenuTwo';
import levelThree from '@/routers/levelThree';
import register from '@/routers/register';
import login from '@/routers/login';
import test from '@/routers/test';
import notFount from '@/routers/404';
import detailChildren from './routers/detail-children';
export default {
    routes: [{
        path: '/',
        component: () => import('@/views/components/layout/index.vue'),
        redirect: '/home',
        children: [
            ...menu,
            ...home,
            ...leftMenu,
            ...demo,
            ...leftMenuTwo,
            ...levelThree,
            ...detail,
            ...detailChildren
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
