<template>
    <ul class="breadcrumb">
      <li class="breadcrumb-item" v-for="(item,index) in crumbs" :key="index">
        <span v-if="index === crumbs.length - 1 || item.noLink">{{item.meta.title}}</span>
        <router-link v-else :to="{ name: item.name }">{{item.meta.title}}</router-link>
        
      </li>
    </ul>
</template>

<script>
import store from '@/store/breadcrumb';
import { mapState } from 'vuex';
export default {
    name: 'breadcrumb',
    beforeCreate () {
        if (!this.$store.state.breadcrumb) this.$store.registerModule('breadcrumb', store);
    },
    computed: {
        ...mapState('breadcrumb', {
            crumbs: state => state.crumbs
        })
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.breadcrumb{
  &-item{
    display: inline-block;
    &:not(:last-child)::after{
        content: "\e604";
        font-family: element-icons !important;
        color: #ccc;
    }
  }
}
</style>