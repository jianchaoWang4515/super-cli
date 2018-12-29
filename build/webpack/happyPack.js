/**
 * HappyPack 允许 Webpack 使用 Node 多线程进行构建来提升构建的速度
 */

const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });
const untils = require('./untils');

module.exports = function(config) {
    let conf = {
        babel: new HappyPack({
            id: 'babel',
            // 使用共享进程池中的子进程去处理任务
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader'
            }]
        }),
        eslint: new HappyPack({
            id: 'eslint',
            // 使用共享进程池中的子进程去处理任务
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'eslint-loader'
            }]
        }),
        scss: new HappyPack({
            id: 'scss',
            // 使用共享进程池中的子进程去处理任务
            threadPool: happyThreadPool,
            // 将 CSS 转化成 CommonJS 模块、将 Sass 编译成 CSS
            loaders: [
                {
                    loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
                    options: {
                        minimize: true,
                        sourceMap: false
                    }
                },
                untils.postcssLoader(),
                'fast-sass-loader' // 将 Sass 编译成 CSS
            ]
        }),
        css: new HappyPack({
            id: 'css',
            // 使用共享进程池中的子进程去处理任务
            threadPool: happyThreadPool,
            // 将 CSS 转化成 CommonJS 模块
            loaders: [
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        sourceMap: false
                    }
                }, 
                untils.postcssLoader()
            ]
        })
    }
    for(var key in conf) {
    	const plugin = conf[key];
    	config.plugins.push(plugin)
    }
}