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
import Vue from 'vue'
import MyVueHeader from '@/modules/my-vue-plugin/header'

Vue.use(MyVueHeader)
export default {
    name: 'layout',
    data () {
        return {

        }
    }
}
</script>