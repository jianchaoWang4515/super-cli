<style lang="scss" scoped>
	.app-header{
		height: 100%;
		&__logout{
			float: right;
			vertical-align: middle;
			line-height: 60px;
		}
	}
</style>
<template>
    <div class="app-header">
        <a href="javascript:;" @click="logout" class="app-header__logout">登出</a>
    </div>
</template>
<script>
export default {
    name: 'MyVueHeader',
    methods: {
        logout() {
            this.XHR.post('/platform/logout').then((res) => {
                if (res.code === 'success') {
                	this.$message('登出成功');
                    this.$store.commit('SET_LOGIN_INFOR', '');
                    setTimeout(() => {
                    	this.$router.push('/login');
                    }, 1000);
                }
            });
        }
    }
}
</script>