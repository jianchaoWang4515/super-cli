/**
 * 多维路由数据转为以name字段为key值的对象
 * @param { Array } routers 路由数据
 * @return { Object } name为key值的对象
 */
export const transformRouterNameKey = function (routers) {
    let obj = {};
    function transform (data) {
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (!obj[item.name] && item.name) obj[item.name] = item;
            if (item.children && item.children.length) {
                transform(item.children);
            };
        };
    }
    transform(routers);
    return obj;
};
/**
 * 克隆一个对象
 * @param {object|array} obj 要克隆的对象
 * @returns {object|array} 克隆后的对象
 */
export const deepClone = function (obj) {
    if (!obj) return;
    if (typeof obj !== 'object') return obj;
    let result;
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = deepClone(obj[key]);
            }
        }
    } else if (Object.prototype.toString.call(obj) === '[object Array]') {
        result = [];
        obj.forEach(function (item) {
            result.push(deepClone(item));
        });
    } else {
        result = obj;
    }
    return result;
};
/**
* 动态向菜单数据增加有层级结构的id
* {
*  id: 1,
*  prtId: -1,
*  children:[{
*      id: 1-1,
*      prtId: 1,
*  }]
* }
* @param { String } menu 菜单数据
* @return { Array } 增加id唯一值后的菜单
*/
export const addRoutesId = function (menu) {
    let arr = deepClone(menu);
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
            } else if (item.twoLevel && item.twoLevel.length) {
                transform(item.twoLevel, item.id);
            }
        };
    };
    transform(arr);
    return arr;
};
