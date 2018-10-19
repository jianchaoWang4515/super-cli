/* eslint-disable */
let TOOL = {
    /*
     * 判断是否为模糊对象
     **/
    isObject(value) {
        return typeof value === 'object' && value !== null;
    },
    /*
     * 判断是否为纯粹对象 由new Object()创建的
     * @params {value} 需要判断的值
     * @return {boolean} true or false
     **/
    isPlainObject(value) {
        if (!this.isObject(value)) {
            return false;
        }

        try {
            const { constructor } = value;
            const { prototype } = constructor;

            return constructor && prototype && Object.prototype.hasOwnProperty.call(prototype, 'isPrototypeOf');
        } catch (e) {
            return false;
        }
    },
    /*
     * 对象处理
     * @return {object}
     * @returnKey {extend} 深复制
     **/
    object: (function() {
        var extend,
            _extend,
            _isObject

        _isObject = function(o) {
            return Object.prototype.toString.call(o) === '[object Object]'
        }

        _extend = function self(destination, source) {
            var property
            for (property in destination) {
                if (destination.hasOwnProperty(property)) {
                    // 若destination[property]和sourc[property]都是对象，则递归
                    if (_isObject(destination[property]) && _isObject(source[property])) {
                        self(destination[property], source[property])
                    };

                    // 若sourc[property]已存在，则跳过
                    if (source.hasOwnProperty(property)) {
                        continue
                    } else {
                        source[property] = destination[property]
                    }
                }
            }
        }

        extend = function() {
            var arr = arguments,
                result = {},
                i

            if (!arr.length) return {}

            for (i = arr.length - 1; i >= 0; i--) {
                if (_isObject(arr[i])) {
                    _extend(arr[i], result)
                };
            }

            arr[0] = result
            return result
        }

        return { extend }
    })(),
    /*
     * url处理
     **/
    GetQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
    },
    /*
     * 根据hash值str获取参数值
     **/
    // 根据hash值str获取参数值
    GetSearchVal(str, name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var r = url.substr(0).match(reg)
        return r
    },
    /*
     * 字符串消除前后空格
     * @params {string} 需要处理的值
     * @return {string} 处理后的结果
     **/
    removeSpace(string) {
        if (string) string = string.replace(/(^\s+)|(\s+$)/g, '')
        return string
    },
    /*
     * 导出功能
     * @params {url} 后台接口
     * @params {methods} api类型
     * @params {params} 参数对象
     **/
    export (url, methods, params) {
        var form = document.createElement('form')
        form.style.display = 'none'
        form.action = url
        form.method = methods
        document.body.appendChild(form)

        for (var key in params) {
            var input = document.createElement('input')
            input.type = 'hidden'
            input.name = key
            input.value = params[key]
            form.appendChild(input)
        }
        form.submit()
        document.body.removeChild(form)
    }
}

TOOL.install = function(Vue) {
    if (Vue.prototype.$TOOL) return false
    Vue.prototype.$TOOL = this
}

export default TOOL