import Vue from 'vue';
import XHR from './index';

const XHR_CON = {
    config: {
        baseURL: '',
        maxStatus: 506
    },
    catchContent (status, codeText) {
        let codeContent = {
            400: {
                text: '<p>错误编码：400</p>'
            },
            401: {
                text: '对不起，您没有权限，请重新登录后再打开。<p>错误编码：401</p>'
            },
            403: {
                text: '<p>错误编码：403</p>'
            },
            404: {
                text: '<p>对不起，没有找到页面或者数据</p><p>错误编码：404</p>'
            },
            409: {
                text: '对不起，资源冲突<p>错误编码：409</p>'
            },
            500: {
                text: '<p>错误编码：500</p>'
            },
            503: {
                text: '<p>错误编码：503</p>'
            }
        };
        if (codeContent[status]) {
            Vue.prototype.$message.error({
                dangerouslyUseHTMLString: true,
                message: codeContent[status].text
            });
        };
    },
    interceptors: {
        request (req) {
            return req;
        },
        response (res) {
            let { data } = { ...res };
            if (data.code === 'no-login' && location.pathname !== '/login') {
                Vue.prototype.$message({
                    message: data.message,
                    duration: 1000,
                    onClose () {
                        location.href = '/login';
                    }
                });
            }
            return data;
        }
    }
};

export default new XHR(XHR_CON);
