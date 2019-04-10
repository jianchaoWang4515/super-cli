<style lang="scss" src="./style/index.scss"></style>
<template>
    <div class="vue-layout su-flex-space-between" su-role='cell'>
        <span v-t="'message.hello'"></span>
        <span>{{model}}</span>
        <img src="./image/bg2.png" width="100" height="200">
        <div class="bk-bg">aa啊啊啊</div>
        <el-button>
            <router-link to="/test">测试路由history模式</router-link>
        </el-button>
        <el-button>
            <router-link to="/leftMenu">菜单页</router-link>
        </el-button>
        <i class="iconfont icon-zuzhiguanli"></i>
    </div>
</template>
<script>
/*
global globalVar
*/
export default {
    name: 'home',
    data () {
        return {
            msg: 'Helllo my-vue'
        };
    },
    created () {
        // this.XHR.get('/wjc/get/2');
    },
    computed: {
        model () {
            let result;
            let model = globalVar.model;
            if (model === 'dev') result = '我是开发环境';
            if (model === 'test') result = '我是测试环境';
            if (model === 'pre') result = '我是预发布环境';
            if (model === 'pro') result = '我是生产环境';
            return result;
        }
    }
};
</script>