<template>
    <div class="app-header app-flex">
        <sp-breadcrumbs>
        </sp-breadcrumbs>
        <!-- <div v-if="activeIndex" class="su-flex-1">
            <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
                <el-menu-item v-for="menu in menus" :key="menu.id" :index="menu.id">{{menu.title}}</el-menu-item>
            </el-menu>
        </div> -->
        <ul class="local-box app-flex app-flex-o">
            <li class="local-box__item" :class="{active: lang === 'zh'}" @click="changelang('zh')">中</li>
            <li class="local-box__item" :class="{active: lang === 'en'}" @click="changelang('en')">英</li>
        </ul>
        <a href="javascript:;" @click="logout" class="app-header__logout">登出</a>
    </div>
</template>
<script>
import mixinsQuery from '@/mixins/query';
import { mapState, mapGetters } from 'vuex';
import { getTopMenuId } from '@/utils/menus';
export default {
    mixins: [mixinsQuery],
    name: 'MyVueHeader',
    computed: {
        ...mapState('global', {
            menus: state => state.menus,
            topMenuId: state => state.topMenuId
        }),
        ...mapGetters('global', ['keyIdMenu', 'keyNameMenu']),
        activeIndex () {
            return this.topMenuId;
        },
        lang () {
            return this.query.lang || this.$i18n.locale;
        }
    },
    watch: {
        '$route': {
            handler: 'setRootId',
            immediate: true
        }
    },
    methods: {
        logout () {
            this._api.login.logOut({
                type: 'delete'
            }).then((res) => {
                this.$message({
                    message: '登出成功',
                    duration: 500,
                    onClose: () => {
                        this.$router.push({
                            name: 'login'
                        });
                    }
                });
            });
        },
        changelang (lang) {
            this.$router.push({
                query: {
                    lang: lang
                }
            });
            this.$i18n.locale = lang;
        },
        handleSelect (id) {
            this.$router.push({
                name: this.keyIdMenu[id].name,
                query: this.query
            });
        },
        /**
         * 设置跟菜单ID
         */
        setRootId () {
            let rootId = getTopMenuId(this.menus, this.$route.name) || '';
            this.$store.commit('global/CHANGE_MENU_ID', rootId);
        }
    }
};
</script>
<style lang="scss" scoped>
.app-header {
    height: 100%;
    justify-content: flex-end;
    &__logout {
        vertical-align: middle;
        line-height: 60px;
    }
    .local-box {
        &__item {
            cursor: pointer;
            padding: 0 8px;
            &.active {
                color: #fff;
            }
        }
    }
    .el-menu{
        background-color: transparent;
        flex: 1;
    }
}
</style>
<style lang="scss">
.app-header{
    .el-menu--horizontal>.el-menu-item.is-active {
        background: #000;
        color: #fff;
    }
}
</style>
