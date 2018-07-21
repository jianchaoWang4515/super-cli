<style lang="scss" src="./style/index.scss"></style>

<template>
    <div class="vue-layout" v-t="'message.hello'"></div>
</template>
<script>

export default {
    name: 'home',
    data() {
    	return {
    		msg: 'Helllo my-vue'
    	}
    },
    created() {
    	console.log(this.TOOL)
        console.log(this.$i18n)
    }
};
</script>