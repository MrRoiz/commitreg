import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '../components/Welcome/Welcome.vue'
import Dashboard from '../components/Dashboard/Dashboard.vue'
import DashboardMain from '../components/Dashboard/Views/Main.vue'
import DashboardAbout from '../components/Dashboard/Views/About.vue'
import DashboardSettings from '../components/Dashboard/Views/Settings.vue'

Vue.use(Router)

const routerConfig = new Router({
	routes : [
		{
			path : '*',
			component : Welcome
		},
		{
			path : '/dashboard',
			component : Dashboard,
			children : [
				{
					path : '/',
					component : DashboardMain
				},
				{
					path : '/settings',
					component : DashboardSettings
				},
				{
					path : '/about',
					component : DashboardAbout
				}
			]
		}
	]
})

export default routerConfig