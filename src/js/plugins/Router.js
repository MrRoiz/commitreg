import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../components/Views/Dashboard/Dashboard.vue'
import About from '../components/Views/Dashboard/About.vue'
import Settings from '../components/Views/Dashboard/Settings.vue'

Vue.use(Router)

const routerConfig = new Router({
	routes : [
		{
			path : '*',
			component : Dashboard
		},
		{
			path : '/settings',
			component : About
		},
		{
			path : '/about',
			component : Settings
		}
	]
})

export default routerConfig