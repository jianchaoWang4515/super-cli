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
                <breadcrumb></breadcrumb>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import MyVueHeader from '@/views/components/header/index';
import breadcrumbsMixins from '@/mixins/breadcrumbs';

export default {
    mixins: [breadcrumbsMixins],
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
<style lang="scss" src="./style/index.scss"></style>