import Vue from 'vue';

Vue.prototype.$api = {
    /**
     * 获取登录的用户信息
     */
    loginInfo () {
        return Vue.prototype.XHR.get('/wjc/session/info');
    },
    /**
     * 登出
     */
    logout () {
        return Vue.prototype.XHR.delete('/wjc/session/logout');
    }
};
