const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const proxy = require('./config/proxy');

function resolve(dir) {
    return path.join(process.cwd(), dir);
};

const config = {
    mode: 'development',
    entry: resolve('/src/app.js'),
    output: {
        filename: 'bundle.js',
        path: resolve('/dist')
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: [resolve('/src'), resolve('/node_modules/element-ui/src/utils/')]
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // 将 JS 字符串生成为 style 节点
            }, {
                loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
            }, {
                loader: "sass-loader" // 将 Sass 编译成 CSS
            }]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader'
        }]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'], // 自动解析确定的扩展
        alias: { // 创建 import 或 require 的别名
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('/src')
        },
        symlinks: false
    },
    devServer: {
        contentBase: resolve('/dist'),
        port: 9000,
        hot: true,
        proxy
    },
    plugins: [
        new VueLoaderPlugin(), // 未知为什么需要本插件才可以解析vue中的html
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new HtmlWebpackPlugin({
            title: 'Development',
            filename: path.join(process.cwd(), '/dist/index.html'),
            template: path.join(process.cwd(), '/index.html'),
            hash: true
        })

    ]
};
module.exports = config;