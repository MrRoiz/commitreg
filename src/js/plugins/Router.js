import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '../components/Welcome/Welcome.vue'
import Dashboard from '../components/Dashboard/Dashboard.vue'
import DashboardMain from '../components/Dashboard/Views/Main.vue'
import DashboardCommits from '../components/Dashboard/Views/Commits.vue'
import DashboardBranches from '../components/Dashboard/Views/Branches/Branches.vue'
import DashboardRepositories from '../components/Dashboard/Views/Repositories/Repositories.vue'
import DashboardModules from '../components/Dashboard/Views/Modules/Modules.vue'

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
				},
				{
					path : '/repositories',
					component : DashboardRepositories
				},
				{
					path : '/branches',
					component : DashboardBranches
				},
				{
					path : '/modules',
					component : DashboardModules
				}
			]
		}
	]
})

export default routerConfig