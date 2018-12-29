const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const pkg = require(process.cwd() + '/package.json');

module.exports = {
  // 入口文件
  entry: {
    // 项目中用到的依赖库文件
    vendor: [
      'vue/dist/vue.esm.js',
      'vue-router',
      'vuex',
      'axios',
      'vue-i18n',
      'element-ui'
    ]
  },
  // 输出文件
  output: {
    // 文件名称
    filename: '[name].dll.js',
    // 将输出的文件放到dist目录下
    path: path.join(process.cwd(), 'dist/assets'),

    /*
     存放相关的dll文件的全局变量名称，比如对于jquery来说的话就是 _dll_jquery, 在前面加 _dll
     是为了防止全局变量冲突。
    */
    library: '_dll_[name]'
  },
  plugins: [
    // 使用插件 DllPlugin
    new DllPlugin({
      /*
       该插件的name属性值需要和 output.library保存一致，该字段值，也就是输出的 manifest.json文件中name字段的值。
       比如在jquery.manifest文件中有 name: '_dll_jquery'
      */
      context: path.join(process.cwd(), 'dist'), // 这个上下文必须必须同webpack.config.js中DllReferencePlugin插件的context所指向的上下文保持一致！！
      name: '_dll_[name]',

      /* 生成manifest文件输出的位置和文件名称 */
      path: path.join(process.cwd(), 'dist', '[name].manifest.json')
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