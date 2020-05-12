module.exports = {
    plugins: {
        autoprefixer: {
            browsers: ['last 30 versions', '> 2%', 'Firefox >= 10', 'ie >= 9', 'Android >= 4.0', 'iOS >= 8']
        },
        'postcss-pxtorem': {
            rootValue: 37.5,
            propList: ['*']
        }
    }
};
