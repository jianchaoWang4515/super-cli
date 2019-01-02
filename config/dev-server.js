
const context = ["/wjc"];

const pathRewrite = {'/wjc': ''};

context.map((item) => {
	pathRewrite[`^${item}`] = '';
})

module.exports = {
    port: 9001,
    porxy: [{
        context,
        target: "http://localhost:9999/",
        pathRewrite
    }]
};
