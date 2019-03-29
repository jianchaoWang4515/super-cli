<template>
    <div class="my-vue-menu">
        <el-menu
			:default-active="activeIndex"
			class="el-menu-vertical-demo" @select="handleSelect">
			<el-menu-item :index="menu.id" v-for="menu in leftMenus" :key="menu.id">
				<i class="el-icon-menu"></i>
				<span slot="title">{{menu.id}}{{menu.title}}</span>
			</el-menu-item>
		</el-menu>
    </div>
</template>

<script>
import mixinsQuery from '@/mixins/query';
import { mapState, mapGetters } from 'vuex';
import { getMenuId } from '@/untils/menus';
export default {
    mixins: [mixinsQuery],
    name: 'myVueMenu',
    computed: {
        ...mapState('global', {
            menus: state => state.menus,
            topMenuId: state => state.topMenuId
        }),
        ...mapGetters('global', ['keyIdMenu', 'keyNameMenu']),
        activeIndex () {
            return getMenuId(this.menus, this.$route.name);
        },
        /**
         * 获取当前路由所在的左侧菜单数据
         */
        leftMenus () {
            let prtId = getMenuId(this.menus, this.$route.name).split('-');
            prtId.pop();
            prtId = prtId.join('-');
            return this.keyIdMenu[prtId].children;
        }
    },
    methods: {
        handleSelect (id) {
            this.$router.push({
                name: this.keyIdMenu[id].name,
                query: this.query
            });
        }
    }
};
</script>
<style lang="scss">
	.my-vue-menu{
		width: 200px;
		height: 100%;
		background: #000;
		color: #fff;
	}
</style>