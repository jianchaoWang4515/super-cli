import { allMenus } from '@/menu';
import Vue from 'vue';
import { clone } from '@/untils';
import { transformMenuIdKey, transformMenuNameKey } from '@/untils/menus';
const state = {
    loginInfor: '',
    menus: [],
    topMenuId: 1 // 当前选中顶部菜单Id
};

const mutations = {
    CHANGE_MENU (state, menu) {
        state.menus = menu;
    },
    CHANGE_MENU_ID (state, id) {
        state.topMenuId = id;
    }
};

const actions = {
    getSession ({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$api.loginInfo().then(res => {
                commit('CHANGE_MENU', clone(allMenus));
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
};

const getters = {
    /**
     * 菜单id字段为key值的对象
     */
    keyIdMenu: state => {
        return transformMenuIdKey(state.menus);
    },
    /**
     * 把菜单转为name为key值的对象
     */
    keyNameMenu: state => {
        return transformMenuNameKey(state.menus);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
