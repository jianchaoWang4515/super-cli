import Vue from 'vue';
import axios from 'axios';

Vue.prototype.$api = {
    /**
     * 获取登录的用户信息
     */
    loginInfo () {
        return axios.get('/wjc/session/info');
    },
    /**
     * 登出
     */
    logout () {
        return axios.delete('/wjc/logout');
    }
};
