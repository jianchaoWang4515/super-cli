<style lang="scss" src="./style/index.scss"></style>
<template>
    <el-container>
        <el-header>Header</el-header>
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
export default {
    name: 'layout',
    data() {
        return {

        };
    }
}
</script>