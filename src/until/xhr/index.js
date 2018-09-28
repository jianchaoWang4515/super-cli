import Vue from 'vue'
import axios from 'axios'
import tool from '../tool'

let XHR = function (config) {
    this.reg()
    let that = this
    let deConfig = {
        config: {
            baseURL: '',
            maxStatus: 500,
            validateStatus (status) {
                return that.catchStatus(status)
            }
        },
        interceptors: {
            request (req) {
                return req
            },
            response (res) {
                return res
            }
        }
    }
    this.OPTION = this.TOOL.object.extend(true, deConfig, config)
    this.axios = axios.create(this.OPTION.config)
    Vue.prototype.XHR = this.axios
    // 请求拦截器
    this.setIntercept()
}

XHR.prototype = {
    reg () {
        this.TOOL = tool
    },
    setIntercept () {
        let intercept = this.OPTION.interceptors
        let req = intercept.request
        let res = intercept.response
        if (req && typeof req === 'function') this.axios.interceptors.request.use(req)
        if (res && typeof res === 'function') this.axios.interceptors.response.use(res)
    },
    setValidateStatus (status) {
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
        }
        if (this.OPTION.catchContent && codeContent[status] && typeof this.OPTION.catchContent === 'function') {
            this.OPTION.catchContent(status, codeContent[status])
        } else if (codeContent[status]) {
            Vue.prototype.$message.error({
                dangerouslyUseHTMLString: true,
                message: codeContent[status].text
            })
        }
    },
    catchStatus (status) {
        this.setValidateStatus(status)
        return status < this.OPTION.config.maxStatus
    }
}

export default XHR
