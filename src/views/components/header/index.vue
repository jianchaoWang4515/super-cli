<template>
    <div class="app-header app-flex">
        <ul class="local-box app-flex app-flex-o">
            <li class="local-box__item" :class="{active: lang === 'zh'}" @click="changelang('zh')">中</li>
            <li class="local-box__item" :class="{active: lang === 'en'}" @click="changelang('en')">英</li>
        </ul>
        <a href="javascript:;" @click="logout" class="app-header__logout">登出</a>
    </div>
</template>
<script>
import mixinsQuery from '@/mixins/query';
export default {
    mixins: [mixinsQuery],
    name: 'MyVueHeader',
    computed: {
        lang () {
            return this.query.lang || this.$i18n.locale;
        }
    },
    methods: {
        logout () {
            this.XHR.delete('/wjc/session/logout').then((res) => {
                if (res.code === 'success') {
                    this.$message({
                        message: '登出成功',
                        duration: 1000,
                        onClose: () => {
                            this.$store.dispatch('SESSION_INFO');
                        }
                    });
                }
            });
        },
        changelang (lang) {
            this.$router.push({
                query: {
                    lang: lang
                }
            });
            this.$i18n.locale = lang;
        }
    }
};
</script>
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