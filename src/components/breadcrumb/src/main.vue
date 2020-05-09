<style lang="scss" src="./main.scss" scoped></style>
<template>
    <div class="sp-breadcrumbs">
        <template v-for="(item,index) in breadList" v-if="!$scopedSlots.default">
            <span class="sp-breadcrumbs__item" :key="item.path">
                <span class="sp-breadcrumbs__link">
                    <router-link
                    :to="{name: item.name, query: item.query, params: item.params}"
                    :disabled="$route.path === item.path" v-if="item.breadName"
                    :class="$route.path === item.path ? 'link-disabled' : ''">
                    {{item.breadName}}
                    </router-link>
                </span>
                <i :class="`sp-breadcrumbs__separator ${separatorClass}`" v-if="separatorClass"></i>
                <span class="sp-breadcrumbs__separator" v-else>{{separator}}</span>
            </span>
        </template>
        <slot :breadList="breadList" v-else></slot>
    </div>
</template>
<script>
export default {
    name: 'spBreadcrumbs',
    props: {
        separator: {
            type: String,
            default: '/'
        },
        separatorClass: String
    },
    data () {
        return {
        };
    },
    computed: {
        breadList () {
            return this.$spBreadcrumb.crumbs || [];
        }
    }
};
</script>