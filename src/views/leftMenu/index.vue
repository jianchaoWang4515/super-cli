<template>
    <div>
        <router-link :to="'/'">进入子菜单</router-link>
        </br>
        <router-link :to="'/levelThree'">进入三级菜单</router-link>
    </div>
</template>
<script>
export default {
    name: 'left-menu'
};
</script>

