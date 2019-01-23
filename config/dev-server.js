
const context = ["/wjc"];

const pathRewrite = {'/wjc': ''};

context.map((item) => {
	pathRewrite[`^${item}`] = '';
})

module.exports = {
    port: 9001,
    proxy: [{
        context,
        target: "http://localhost:9998/",
        pathRewrite
    }]
};
