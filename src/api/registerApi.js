import Server from '@/plugins/axios';

function RegisterApi () {
    this.server = Server;
}

RegisterApi.prototype.parseRouter = function (name, urlOb) {
    let obj = this[name] = {};
    Object.keys(urlOb).forEach((item) => {
        obj[item] = this.sendMes.bind(this, name, item, urlOb[item]);
    });
};

RegisterApi.prototype.sendMes = function (moduleName, name, url, config) {
    let Config = config || {};
    let { type = 'get', data = {}, config: conf = {} } = Config;
    let self = this;

    // xhr响应之前全局处理内容
    let before = function (res) {
        return res;
    };

    // xhr响应之后全局处理内容
    let defaultFn = function (res) {
        return res;
    };
    return self.server[type](url, data, conf).then(before).then(defaultFn);
};

export default new RegisterApi();
