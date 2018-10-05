<style lang="scss" src="./style/index.scss"></style>
<template>
    <div class="vue-layout">
        <span v-t="'message.hello'"></span>
        <img src="./images/bg2.png" width="100">
    </div>
</template>
<script>
export default {
    name: 'home',
    data () {
        return {
            msg: 'Helllo my-vue'
        };
    },
    created () {
        this.XHR.post('/mydb/getUsers');
    }
};
</script>