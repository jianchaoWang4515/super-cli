import { clone } from '@/untils';
import sessionStorage from '@/untils/session-storage.js';
const state = {
    crumbs: sessionStorage.getItem('crumbs', true) || []
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
        let keyNameMenu = this.getters['global/keyNameMenu'];
        return new Promise((resolve, reject) => {
            // 如果已存在 截掉后面内容并更新此路由数据
            if (crumbsName[to.name]) {
                crumbs = crumbs.slice(0, crumbsName[to.name].index);
                crumbs.push(newCrumb);
            } else {
                if (crumbs.length) {
                    let isBrother = false;
                    let myCrumbs = clone(crumbs);
                    try {
                        myCrumbs.forEach((item) => {
                            if (keyNameMenu[to.name] && keyNameMenu[item.name] && keyNameMenu[to.name].prtId === keyNameMenu[item.name].prtId) {
                                // 访问的是面包屑中的某一个兄弟菜单需更新
                                isBrother = true;
                                crumbs = crumbs.slice(0, crumbsName[item.name].index);
                                crumbs.push(newCrumb);
                                throw new Error('找到同级节点');
                            };
                        });
                    } catch (error) {
                    }
                    if (!isBrother) {
                        // 访问的不是面包屑中的兄弟节点则增加
                        crumbs.push(newCrumb);
                    }
                }
                // if (!keyNameMenu[to.name]) {
                //     // 当前路由不存在菜单层级结构中
                //     let isChild = false; // 判断是否
                //     crumbs.forEach((item) => {
                //         if (keyNameMenu[item.name] && keyNameMenu[item.name].child && keyNameMenu[item.name].child.includes(to.name)) {
                //             isChild = true;
                //         };
                //     });
                //     // 当前路由不存在菜单层级结构中在判断是否存在child中
                //     if (!isChild) {
                //         // 当前路由也不存在child中重新赋值面包屑
                //         crumbs = [newCrumb];
                //     } else {
                //         crumbs.push(newCrumb);
                //     }
                // } else {
                //     let prtId = keyNameMenu[to.name].prtId;
                //     if (!prtId) {
                //         crumbs = [newCrumb];
                //     } else {
                //         let prtName = keyIdMenu[prtId].name;
                //         let isChildren = false;
                //         crumbs.forEach((item) => {
                //             if (item.name === prtName) {
                //                 isChildren = true;
                //             };
                //             if (keyNameMenu[item.name] && keyNameMenu[item.name].prtId && (keyNameMenu[item.name].prtId === prtId)) {
                //                 isChildren = false;
                //             }
                //             if (keyNameMenu[item.name] && keyNameMenu[item.name].id && (keyNameMenu[item.name].id === prtId)) {
                //                 isChildren = true;
                //             }
                //         });
                //         if (isChildren) crumbs.push(newCrumb);
                //         else crumbs = [newCrumb];
                //     }
                // }
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
