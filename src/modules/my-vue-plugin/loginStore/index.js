const state = {
    loginState: false,
    loginInfor: '',
    currentAuth: false
};

const mutations = {
    SET_LOGIN_INFOR (state, data) {
        state.loginInfor = data;
    },
    SET_LOGIN_STATE (state, { to, igroneUrl }) {
        state.currentAuth = false;
        if (igroneUrl.indexOf(to.path) >= 0) {
            state.currentAuth = true;
        }
    }
};

const actions = {
};

export default {
    state,
    mutations,
    actions
};
