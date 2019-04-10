import { clone } from '@/untils';
/**
 * 动态向菜单数据增加有层级结构的id
 * {
 *  id: 1,
 *  children:[{
 *      id: 1-1
 *  }]
 * }
 * @param { String } menu 菜单数据
 * @return { Array } 增加id唯一值后的菜单
 */
export const addMenuId = function (menu) {
    let arr = clone(menu);
    function transform (data, prev = '') {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (!prev) {
                item.id = `${i + 1}`;
                item.prtId = '-1';
            } else {
                item.id = `${prev}-${i + 1}`;
                item.prtId = prev;
            };
            if (item.children && item.children.length) {
                transform(item.children, item.id);
            }
        };
    };
    transform(arr);
    return arr;
};

/**
 * 根据路由name获取当前跟菜单id
 * @param { String } menu 菜单数据
 * @param { String } name 路由name
 * @return { String|Number } id 根菜单id
 */
export const getTopMenuId = function (menu, name) {
    let arr = clone(menu);
    let id;
    function transform (m, n) {
        for (let i = 0; i < m.length; i++) {
            let item = m[i];
            if (item.name === n || (item.child && item.child.includes(n))) {
                id = item.id.split('-')[0];
                break;
            };
            if (!id && item.children && item.children.length) {
                transform(item.children, n);
            };
        }
    }
    transform(arr, name);
    return id;
};

/**
 * 根据路由name获取当前所在的层级菜单id
 * @param { String } menu 菜单数据
 * @param { String } name 路由name
 * @return { String|Number } id 根菜单id
 */
export const getMenuId = function (menu, name) {
    let arr = clone(menu);
    let id;
    function transform (m, n) {
        for (let i = 0; i < m.length; i++) {
            let item = m[i];
            if (!item.noRouter && (item.name === n || (item.child && item.child.includes(n)))) {
                id = item.id;
                break;
            };
            if (!id && item.children && item.children.length) {
                transform(item.children, n);
            };
        }
    }
    transform(arr, name);
    return id;
};

/**
 * 多维菜单数据转为以id字段为key的对象
 * @param { Array } menu 菜单数据
 * @param { String } key 选做为key的字段
 * @return { Object } id为key值的对象
 */
export const transformMenuIdKey = function (menu) {
    let obj = {};
    function transform (data) {
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (!obj[item.id]) obj[item.id] = item;
            if (item.children && item.children.length) {
                transform(item.children);
            };
        };
    }
    transform(menu);
    return obj;
};

/**
 * 多维菜单数据转为以name字段为key值的对象
 * @param { Array } menu 菜单数据
 * @param { String } key 选做为key的字段
 * @return { Object } id为key值的对象
 */
export const transformMenuNameKey = function (menu) {
    let obj = {};
    function transform (data) {
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (!obj[item.name] && !item.noRouter) obj[item.name] = item;
            if (item.children && item.children.length) {
                transform(item.children);
            };
        };
    }
    transform(menu);
    return obj;
};
