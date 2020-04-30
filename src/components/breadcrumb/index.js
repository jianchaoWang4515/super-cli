import breadcrumb from './src/main';
import { addRoutesId, transformRouterNameKey } from './src/util/route';

function spBreadcrumb (routes) {
    if (!routes || !Array.isArray(routes)) new Error('routes type error');
    this.routes = addRoutesId(routes);
    this.routesNameKeyObj = transformRouterNameKey(this.routes);
    console.log(this.routesNameKeyObj);
    this.crumbs = [];
    this.init();
}
spBreadcrumb.prototype.init = function () {
    for (const key in this.routesNameKeyObj) {
        let item = this.routesNameKeyObj[key];
        let { meta = {} } = item;
        let { isHome, breadName } = meta;
        let { path, name } = item;
        if (isHome) {
            this.crumbs = [{
                path,
                breadName,
                name
            }];
        }
    }
};

spBreadcrumb.prototype.getIndex = function (name) {
    return this.crumbs.findIndex((item) => {
        return item.name === name;
    });
};
// 判断是否有相同父ID的路由
spBreadcrumb.prototype.theSamePrtIdIndex = function (toRouteName) {
    let { prtId: toRoutePrtId } = this.routesNameKeyObj[toRouteName];
    return this.crumbs.findIndex(item => {
        let { name } = item;
        let { prtId } = this.routesNameKeyObj[name];
        return prtId === toRoutePrtId;
    });
};

// 判断是与当前路由有无关联
spBreadcrumb.prototype.isChild = function (toRoute) {
    let lastCrumb = this.crumbs[this.crumbs.length - 1];
    let { name: lastCrumbName } = lastCrumb;
    let { meta: lastCrumbMeta = {} } = this.routesNameKeyObj[lastCrumbName];
    let { childNames = [] } = lastCrumbMeta;
    let { name } = toRoute;
    return childNames.includes(name);
};

spBreadcrumb.prototype.setCrumbs = function (route) {
    let { path, meta = {}, query, params, name } = route;
    let { breadName } = meta;
    if (!name) {
        throw new Error('路由name未定义');
    }
    let existIndex = this.getIndex(name);
    let base = {
        path,
        breadName,
        query,
        params,
        name
    };
    if (existIndex === -1) {
        if (this.isChild(route)) {
            this.crumbs.push(base);
        } else if (this.theSamePrtIdIndex(name) !== -1) {
            this.crumbs = [this.crumbs[0], ...this.crumbs.slice(1, this.theSamePrtIdIndex(name)), base];
        }
    } else {
        this.crumbs = [...this.crumbs.slice(0, existIndex), base];
    }
};

spBreadcrumb.prototype.install = function (Vue) {
    Vue.prototype.$spBreadcrumb = this;
    Vue.util.defineReactive(this, 'crumbs', this.crumbs);

    Vue.mixin({
        beforeCreate () {
            this._crumbs = this.$spBreadcrumb.crumbs;
        },
        beforeRouteEnter (to, from, next) {
            const { meta } = to;
            const { breadName } = meta;
            next((vm) => {
                if (breadName) {
                    vm.$spBreadcrumb.setCrumbs(to);
                }
            });
        }
    });

    Vue.component(breadcrumb.name, breadcrumb);
};

export default spBreadcrumb;
