const state = {
    loginState: false,
    loginInfor: ''
};

const mutations = {
    SET_LOGIN_INFOR(state, data) {
        state.loginInfor = data;
    },
    SET_LOGIN_STATE(state, { to, igroneUrl }) {
        for (let i = 0; i < to.matched.length; i++) {
            if (igroneUrl.indexOf(to.matched[i]) >= 0) {
            	state.loginState = true;
            } else state.loginState = false;
        }
    }
};

export default {
    state,
    mutations
};