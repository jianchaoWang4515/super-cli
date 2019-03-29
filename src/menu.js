import { addMenuId } from '@/untils/menus';
/**
 * 菜单数据
 * name字段当noRouter不存在时要保证是唯一值
 * child 为当前菜单下子页面 比如详情页
 */

export const topMenu = [
    {
        name: 'leftMenu',
        title: '一级菜单一',
        noRouter: true,
        children: [{
            name: 'leftMenu',
            title: '二级菜单一',
            children: [{
                name: 'aaa',
                title: '三级菜单一',
                children: [{
                    name: 'bbb',
                    title: '四级菜单一'
                }],
                child: [
                    'levelThree'
                ]
            }],
            child: [
                'home'
            ]
        }, {
            name: 'leftMenuTwo',
            title: '二级菜单二',
            children: []
        }]
    },
    {
        name: 'demo',
        title: '一级菜单二'
    }
];
export const allMenus = addMenuId(topMenu);
