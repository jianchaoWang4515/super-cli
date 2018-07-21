<style lang="scss" scoped>
.app-header {
    height: 100%;
    &__logout {
        vertical-align: middle;
        line-height: 60px;
    }
    .local-box {
        &__item {
            padding: 0 8px;
            &.active {
                color: #fff;
            }
        }
    }
}
</style>
<template>
    <div class="app-header app-flex">
        <ul class="local-box app-flex app-flex-o">
            <li class="local-box__item" :class="{active: lang === 'cn'}" @click="changelang('cn')">中</li>
            <li class="local-box__item" :class="{active: lang === 'en'}" @click="changelang('en')">英</li>
        </ul>
        <a href="javascript:;" @click="logout" class="app-header__logout">登出</a>
    </div>
</template>
<script>
export default {
    name: 'MyVueHeader',
    computed: {
        lang() {
            return this.$i18n.locale
        }
    },
    methods: {
        logout() {
            localStorage.setItem('userInfor', '');
            this.$message('登出成功');
            this.$store.commit('SET_LOGIN_INFOR', '');
            this.$router.push('/login');
            // this.XHR.post('/platform/logout').then((res) => {
            //     if (res.code === 'success') {
            //      this.$message('登出成功');
            //         this.$store.commit('SET_LOGIN_INFOR', '');
            //         setTimeout(() => {
            //          this.$router.push('/login');
            //         }, 1000);
            //     }
            // });
        },
        changelang(lang) {
            this.$store.dispatch('updateLang', { lang, i18n: this.$i18n })
        }
    }
}
</script>