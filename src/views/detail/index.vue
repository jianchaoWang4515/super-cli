<template>
    <div>
        <p>详情页</p>
        <router-link to="/detail-children">子详情页</router-link>
        <router-link :to="{params: {id:2}}">更换params</router-link>
    </div>
</template>

<script>
export default {
    name: 'detail'
};
</script>
