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
