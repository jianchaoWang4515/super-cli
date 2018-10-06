<style lang="scss" src="./style/index.scss"></style>
<template>
    <div class="vue-layout">
        <span v-t="'message.hello'"></span>
        <span>{{model}}</span>
        <img src="./images/bg2.png" width="100">
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
        this.XHR.post('/mydb/getUsers');
    },
    computed: {
        model () {
            let result;
            let model = globalVar.model;
            if (model === 'dev') result = '我是开发环境';
            if (model === 'pre') result = '我是预发布环境';
            if (model === 'pro') result = '我是生产环境';
            return result;
        }
    }
};
</script>