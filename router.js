export default {
	routes: [{
		path: '/',
		name: '/',
		redirect: '/home',
		component: require('@/modules/layout').default,
		children: [{
			path: '/home',
			name: 'home',
			components: {
				asiderMenu: require('@/modules/my-vue-plugin/menu').default,
				default: require('@/modules/home').default
			}
		}]
	}, {
		path: '/login',
		name: 'login',
		component: require('@/modules/login').default
	}]
}