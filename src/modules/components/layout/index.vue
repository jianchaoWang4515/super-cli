<style lang="scss" src="./style/index.scss"></style>
<template>
    <el-container>
        <el-header>
            <my-vue-header></my-vue-header>
        </el-header>
        <el-container>
            <el-aside width="auto">
                <router-view name="asiderMenu"></router-view>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import MyVueHeader from '@/modules/components/header/index';

export default {
    name: 'layout',
    components: {
        MyVueHeader
    },
    data () {
        return {

        };
    }
};
</script>