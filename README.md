# webpack-vue
> webpack+vue (内部嵌入了vuex,i18n国际化等插件)简单脚手架 完成登录退出功能。</br>
>    >(有自动化面包屑及api封装)</br>
>    >(建议使用cli命令下载)</br>


`1.npm i @superchao/super-cli -g`</br>
`2.super init <projectName>`</br>
`3.cd <projectName>`</br>
`5.npm install`</br>
`6.npm run build:dll`</br>
`7.npm start`</br>

## Project directory specification
```
project
    config
        dev-server.js -----------------proxy配置
        globalVar.js  -----------------各个环境中不同的变量配置
    dist
    node_modules
    public
        index.html  ----------------html模版
    src
        api  -----------------------api目录
            registerApi.js ---------api封装文件
        components -----------------全局组件
        local ----------------------国际化
        mixins ---------------------mixins
        plugins --------------------插件
            axios
            router
        routers
        store
        theme
        utils
        views ----------------------业务组件
        app.js  --------------------入口
        app.vue
        menu.js
        router.js
    package.json
    *
    *
    *
```
