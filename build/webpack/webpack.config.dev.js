const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const proxy = require(process.cwd() + '/build/config/proxy');
const globalVar = require(process.cwd() + '/build/config/globalVar');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HappyPack = require('./happyPack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(dir) {
    return path.join(process.cwd(), dir);
};

const config = {
    mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
    entry: {
        main: resolve('/src/app.js')
    },
    output: {
        filename: '[name].js',
        path: resolve('/dist'),
        // publicPath: 'assets/',
        library: '[name]_library'
    },
    module: {
        rules: [{
            test: /\.(js|vue)$/,
            use: ['happypack/loader?id=eslint'],
            enforce: 'pre', // 为了安全起见，您可以使用enforce: "pre"section检查源文件，而不是由其他加载器修改（如babel-loader）
            include: [resolve('/src')]
        }, {
            test: /\.(js|jsx)$/,
            use: ['happypack/loader?id=babel'],
            include: [resolve('/src'), resolve('/node_modules/element-ui/src/utils/')] // 表示哪些目录中的 .js 文件需要进行 babel-loader
        }, {
            test: /\.css$/,
            // 编译Sass文件 提取CSS文件 把css从js中提取出来 ExtractTextPlugin 适用于webpack@3.0
            // use: ExtractTextPlugin.extract({
            //     // 如果配置成不提取，则此类文件使用style-loader插入到<head>标签中
            //     fallback: 'style-loader',
            //     use: 'HappyPack/loader?id=css'
            // })

            /**
             *  MiniCssExtractPlugin 适用于webpack@4.0+
             * 开发环境不抽离css
             * */
            use: [
                process.env.NODE_ENV === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader,
                'happypack/loader?id=css'
            ]
        }, {
            test: /\.scss$/,
            // 编译Sass文件 提取CSS文件 把css从js中提取出来 
            // 使用happypack需使用此操作提取 不然会报错
            // use: ExtractTextPlugin.extract({
            //     // 如果配置成不提取，则此类文件使用style-loader插入到<head>标签中
            //     fallback: 'style-loader',
            //     use: 'HappyPack/loader?id=scss'
            // })
            use: [
                process.env.NODE_ENV === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader,
                'happypack/loader?id=scss'
            ]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.(png|jpg|jpeg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'assets/images/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'assets/fonts/[name].[hash:7].[ext]'
            }
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
        historyApiFallback: true,
        contentBase: resolve('/dist'),
        port: 9000,
        hot: true,
        proxy
    },
    plugins: [
        new VueLoaderPlugin(), // webpack4.0需要本插件才可以解析vue中的html
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        /**
         * extract-text-webpack-plugin还不能支持webpack4.0.0以上的版本，办法如下:
         * npm install –save-dev extract-text-webpack-plugin@next 会下载到+ extract-text-webpack-plugin@4.0.0-beta.0 
         * webpack@4.0+ 建议使用mini-css-extract-plugin插件
         */
        // new ExtractTextPlugin ("style.css"),

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            title: 'Development',
            filename: path.join(process.cwd(), 'dist/index.html'),
            template: path.join(process.cwd(), '/src/index.html'),
            hash: true
        }),
        new DllReferencePlugin({
            context: resolve('dist'),
            manifest: require(resolve('/dist/vendor.manifest.json'))
        }),
        new webpack.DefinePlugin({
            globalVar: JSON.stringify(globalVar[process.env.NODE_ENV].globalVar) // 注册全局变量
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false // 删除注释
                    },
                    compress: {
                        warnings: false,
                        drop_debugger: true, // 删除debugger
                        drop_console: true // 删除console
                    }
                }
            })
        ]
    }
};
HappyPack(config);
module.exports = config;