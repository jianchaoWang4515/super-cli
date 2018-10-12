
const context = ["/api"];

const pathRewrite = {};

context.map((item) => {
	pathRewrite[`^${item}`] = '';
})
const porxy = [{
    context,
    target: "http://127.0.0.1:8011/",
    pathRewrite
}];

module.exports = porxy;