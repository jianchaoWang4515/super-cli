<template>
    <div class="sp-breadcrumb">
        <template v-for="item in breadList">
            <router-link :to="item.path" :key="item.path" v-if="item.breadName">{{item.breadName}}</router-link>
        </template>
    </div>
</template>
<script>
export default {
    name: 'spBreadcrumb',
    data () {
        return {
        };
    },
    computed: {
        breadList () {
            console.log(this);
            return this.$spBreadcrumb.crumbs || [];
        }
    }
};
</script>