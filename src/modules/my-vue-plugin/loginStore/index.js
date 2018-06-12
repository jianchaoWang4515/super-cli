const state = {
    loginState: false,
    loginInfor: ''
};

const mutations = {
    SET_LOGIN_INFOR(state, data) {
        state.loginInfor = data;
    },
    SET_LOGIN_STATE(state, { to, igroneUrl }) {
        if (igroneUrl.indexOf(to.path) >= 0) {
            return true;
        }
        return false;
    }
};

export default {
    state,
    mutations
};