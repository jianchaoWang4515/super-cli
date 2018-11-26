
const context = ["/wjc"];

const pathRewrite = {'/wjc': ''};

context.map((item) => {
	pathRewrite[`^${item}`] = '';
})
const porxy = [{
    context,
    target: "http://localhost:9999/",
    pathRewrite
}];

module.exports = porxy;