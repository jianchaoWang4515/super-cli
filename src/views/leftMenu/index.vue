<template>
    <div>
        <router-link :to="'/detail/1'">进入详情页</router-link>
        </br>
        <router-link :to="'/levelThree'">进入三级菜单</router-link>
    </div>
</template>
<script>
export default {
    name: 'left-menu'
};
</script>

