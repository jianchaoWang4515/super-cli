import Vue from 'vue';
import axios from 'axios';
import vueAxios from 'vue-axios';

Vue.use(vueAxios, axios);
window.__axiosPromiseArr = {}; // 储存cancel回调
let CancelToken = axios.CancelToken;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    let { data, params } = config
    // 参数中带有$isCancel时下一次请求前会手动取消上一次未完成响应的请求
    if ((data && data.$isCancel) || (params && params.$isCancel)) {
        config.cancelToken = new CancelToken(function executor (cancel) {
            if (window.__axiosPromiseArr[config.url]) {
                window.__axiosPromiseArr[config.url]('操作取消')
                window.__axiosPromiseArr[config.url] = cancel
            } else {
                window.__axiosPromiseArr[config.url] = cancel
            }
            if (data && data.$isCancel) delete config.data.$isCancel
            if (params && params.$isCancel) delete config.params.$isCancel
        })
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    let { data } = { ...response };
    let message;
    if (response.status >= 200 && response.status < 400) {
        if (data.code !== 'success') {
            ({ message } = { ...data });
            if (data.code === 'no-login' && location.pathname !== '/login') {
                Vue.prototype.$message({
                    duration: 2000,
                    message: data.message
                });
                location.href = '/login';
                return;
            }
        }
    } else {
        message = data.message || '';
    }

    if (message) {
        let err = new Error();
        err = { ...data };
        throw err;
    };
    return data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios;
