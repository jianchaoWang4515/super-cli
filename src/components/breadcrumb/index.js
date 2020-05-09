import breadcrumbs from './src/main';
import { addRoutesId, transformRouterNameKey } from './src/util/route';

function spBreadcrumb (routes) {
    if (!routes || !Array.isArray(routes)) new Error('routes type error');
    this.routes = addRoutesId(routes);
    this.routesNameKeyObj = transformRouterNameKey(this.routes);
    this.crumbs = [];
    this.existHome = false;
    this.init();
}
spBreadcrumb.prototype.init = function () {
    let historyBread = JSON.parse(sessionStorage.getItem('spBread'));
    let historyHome = historyBread && historyBread[0] ? historyBread[0] : {};
    let home = null;

    for (const key in this.routesNameKeyObj) {
        let item = this.routesNameKeyObj[key];
        let { meta = {} } = item;
        let { isHome, breadName } = meta;
        let { path, name } = item;
        if (isHome) {
            this.existHome = true;
            home = {
                path,
                breadName,
                name,
                isHome: true
            };
        }
    }
    // 未设置首页 初始化首页
    if (!home || !historyBread) {
        return false;
    }
    if (home && historyHome && historyHome.name !== home.name) {
        this.crumbs = [home, ...historyBread.slice(1)];
        sessionStorage.setItem('spBread', JSON.stringify(this.crumbs));
    } else {
        this.crumbs = historyBread;
    }
};

spBreadcrumb.prototype.getIndex = function (name) {
    return this.crumbs.findIndex((item) => {
        return item.name === name;
    });
};

/**
 * 判断是否是同级路由
 * @param {string} toRouteName 路由name
 */
spBreadcrumb.prototype.theSamePrtIdIndex = function (toRouteName) {
    let { prtId: toRoutePrtId } = this.routesNameKeyObj[toRouteName];
    return this.crumbs.findIndex(item => {
        let { name } = item;
        let { prtId } = this.routesNameKeyObj[name];
        return prtId === toRoutePrtId;
    });
};

/**
 * 判断是与当前路由有无关联
 * @param {object} toRoute 要访问的路由对象
 */
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
    try {
        if (!name) {
            throw new Error(`${path} name未定义`);
        }
        let existIndex = this.getIndex(name);
        let base = {
            path,
            breadName,
            query,
            params,
            name
        };
        if (!this.crumbs.length) {
            this.crumbs = [base];
            return false;
        }
        // 面包屑中不存在当前路由
        if (existIndex === -1) {
            // 判断是否在当前路由的childNames中 存在直接push
            if (this.isChild(route)) {
                this.crumbs = [...this.crumbs, base];
            } else if (this.theSamePrtIdIndex(name) !== -1) {
                // 与历史面包屑中某一项属于同级路由则直接替换
                if (this.existHome) {
                    // 存在固定首页
                    this.crumbs = [this.crumbs[0], ...this.crumbs.slice(1, this.theSamePrtIdIndex(name)), base];
                } else {
                    // 不存在固定首页
                    this.crumbs = [...this.crumbs.slice(0, this.theSamePrtIdIndex(name)), base];
                }
            } else {
                // 否则直接添加
                this.crumbs = [...this.crumbs, base];
            }
        } else {
            this.crumbs = [...this.crumbs.slice(0, existIndex), base];
        }
        sessionStorage.setItem('spBread', JSON.stringify(this.crumbs));
    } catch (error) {
        console.error(error);
    }
};

spBreadcrumb.prototype.install = function (Vue) {
    Vue.prototype.$spBreadcrumb = this;
    Vue.util.defineReactive(this, 'crumbs', this.crumbs);

    Vue.mixin({
        beforeCreate () {
            this.$crumbs = this.$spBreadcrumb.crumbs;
        },
        beforeRouteEnter (to, from, next) {
            const { meta = {} } = to;
            const { breadName } = meta;
            next((vm) => {
                if (breadName) {
                    vm.$spBreadcrumb.setCrumbs(to);
                }
            });
        },
        beforeRouteUpdate (to, from, next) {
            const { meta = {} } = to;
            const { breadName } = meta;
            if (breadName) {
                this.$spBreadcrumb.setCrumbs(to);
            }
            next();
        }
    });

    Vue.component(breadcrumbs.name, breadcrumbs);
};

export default spBreadcrumb;
