<template>
    <router-view></router-view>
</template>
<script>
import mixinsQuery from '@/mixins/query';
export default {
    mixins: [mixinsQuery],
    name: 'app-base',
    watch: {
        'query.lang': function (val) {
            this.$i18n.locale = val;
        },
        immediate: true
    }
};
</script>