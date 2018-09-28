const OFF = 0;
const WARN = 1;
const ERROR = 2;
module.exports = {
    //此项是用来告诉eslint找当前配置文件不能往父级查找
    "root": true,
    //此项指定环境的全局变量，下面的配置指定为浏览器环境
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
    "extends": "standard",
    //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2015,
        //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
        "sourceType": "module"
    },
    // required to lint *.vue files
    // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html的
    "plugins": [
        'html' //插件，此插件用于识别文件中的js代码，没有MIME类型标识没有script标签也可以识别到，因此拿来识别.vue文件中的js代码
    ],
    "rules": {
        "indent": [WARN, 4], // 缩进
        "no-mixed-spaces-and-tabs": OFF, // spaces和tabs混合共用
        "no-new": OFF, 
        "no-tabs": OFF
    }
};