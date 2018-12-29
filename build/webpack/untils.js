const path = require('path');


exports.postcssLoader = function() {
    return {
        loader: 'postcss-loader',
        options: {
            config: {
                path: path.resolve(__dirname, './postcss.config.js')
            }
        }
    }
}