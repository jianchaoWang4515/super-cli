import routers from '@/router';
import { clone } from '@/untils';
import { getTopMenuId, getMenuId } from '@/untils/menus';
import { transformRouterNameKey } from '@/untils/router';
import sessionStorage from '@/untils/session-storage.js';
const state = {
    crumbs: []
};

const mutations = {
    UPDATE_CRUMBS (state, data) {
        state.crumbs = data;
    }
};

const actions = {
    updateCrumbs ({ commit, state, getters }, { to, from }) {
        let { name, meta, params, query } = to;
        let newCrumb = { name, meta, params, query };
        let crumbsName = getters.crumbsName;
        let crumbs = clone(state.crumbs);
        let preTopMenuId = this.state.global.topMenuId;
        let keyNameRouter = transformRouterNameKey(routers.routes);
        let currentTopMenuId = getTopMenuId(this.state.global.menus, to.name);
        let currentMenuId = getMenuId(this.state.global.menus, to.name);
        let keyNameMenu = this.getters['global/keyNameMenu'];
        let keyIdMenu = this.getters['global/keyIdMenu'];
        return new Promise((resolve, reject) => {
            // 利用根菜单id的变化说明面包屑要重新计算
            if (preTopMenuId !== currentTopMenuId || !crumbs.length) {
                crumbs = [];
                let menus = currentMenuId.split('-');
                menus.forEach((item, index) => {
                    let prtId = menus.slice(0, index + 1).join('-');
                    let currentMenu = keyIdMenu[prtId];
                    if (!currentMenu.noRouter) {
                        let crumbsBase = {
                            name: currentMenu.name,
                            meta: { ...keyNameRouter[currentMenu.name].meta },
                            params: currentMenu.params || {},
                            query: currentMenu.query || {}
                        };
                        crumbs.push(crumbsBase);
                    };
                });
                if (keyIdMenu[currentMenuId].child && keyIdMenu[currentMenuId].child.includes(to.name)) {
                    crumbs.push(newCrumb);
                }
            } else {
                if (crumbs.length) {
                    let isBrother = false;
                    let myCrumbs = clone(crumbs);
                    try {
                        myCrumbs.forEach((item) => {
                            if (keyNameMenu[to.name] && keyNameMenu[item.name] && keyNameMenu[to.name].prtId === keyNameMenu[item.name].prtId) {
                                // 如果访问的是面包屑中的同级菜单路由只需更新此路由并删除子面包屑
                                isBrother = true;
                                crumbs = crumbs.slice(0, crumbsName[item.name].index);
                                crumbs.push(newCrumb);
                                throw new Error('找到同级节点');
                            };
                        });
                    } catch (error) {
                    }
                    if (!isBrother) {
                        if (crumbsName[to.name]) {
                            // 如果访问的是面包屑中已存在的路由更新此路由
                            crumbs = crumbs.slice(0, crumbsName[to.name].index);
                            crumbs.push(newCrumb);
                        } else {
                            // 访问的不是面包屑中的同级菜单属于子面包屑，增加即可
                            crumbs.push(newCrumb);
                        }
                    }
                }
            }
            if (!crumbs.length) {
                crumbs.push(newCrumb);
            }
            sessionStorage.setItem('crumbs', crumbs).then(() => {
                commit('UPDATE_CRUMBS', crumbs);
                resolve();
            });
        });
    }
};

const getters = {
    /**
     * crumbs的name属性为key组成的对象
     */
    crumbsName: (state) => {
        let obj = {};
        state.crumbs.forEach((item, index) => {
            if (!obj[item.name]) {
                let data = clone(item);
                data.index = index;
                obj[data.name] = data;
            };
        });
        return obj;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
