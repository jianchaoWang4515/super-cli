import { allMenus } from '@/menu';
import { clone } from '@/untils';
import { transformMenuIdKey, transformMenuNameKey } from '@/untils/menus';
const state = {
    loginInfor: '',
    menus: clone(allMenus),
    topMenuId: 1 // 当前选中顶部菜单name
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
};

const getters = {
    keyIdMenu: state => {
        return transformMenuIdKey(state.menus);
    },
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
