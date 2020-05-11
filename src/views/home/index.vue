<style lang="scss" src="./style/index.scss" scoped></style>
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
        <el-button>
            <router-link to="/home/test">children</router-link>
        </el-button>
        <el-button @click="getUsers">
            获取用户列表(多次点击测试取消重复请求)
        </el-button>
        <i class="iconfont icon-zuzhiguanli"></i>
        <router-view></router-view>
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
    },
    methods: {
        getUsers () {
            this._api.session.sessionInfo({
                data: {
                    params: {
                        $isCancel: true
                    }
                }
            });
        }
    }
};
</script>