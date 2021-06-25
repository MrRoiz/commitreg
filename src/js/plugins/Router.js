import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '../components/Welcome/Welcome.vue'
import Dashboard from '../components/Dashboard/Dashboard.vue'
import DashboardMain from '../components/Dashboard/Views/Main.vue'
import DashboardAbout from '../components/Dashboard/Views/About.vue'
import DashboardCommits from '../components/Dashboard/Views/Commits.vue'

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
					path : '/commits',
					component : DashboardCommits
				}
			]
		}
	]
})

export default routerConfig