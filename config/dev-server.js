
const context = ['/wjc'];

const pathRewrite = { '/wjc': '' };

context.map((item) => {
    pathRewrite[`^${item}`] = '';
});

module.exports = {
    port: 9001,
    proxy: [{
        context,
        target: 'http://127.0.0.1:8080/',
        pathRewrite
    }]
};
