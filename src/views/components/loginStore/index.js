const state = {
    loginInfor: ''
};

const mutations = {
    SET_LOGIN_INFOR (state, data) {
        state.loginInfor = data;
    }
};

const actions = {
    SESSION_INFO () {
        return this.XHR.get('/wjc/session/info');
    }
};

export default {
    state,
    mutations,
    actions
};
