import { allMenus } from '@/menu';
import { transformMenuIdKey, transformMenuNameKey } from '@/untils/menus';
const state = {
    loginInfor: '',
    menus: allMenus,
    topMenuId: 1 // 当前选中顶部菜单Id
};

const mutations = {
    CHANGE_MENU_ID (state, id) {
        state.topMenuId = id;
    }
};

const actions = {
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
