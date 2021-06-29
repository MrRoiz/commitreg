<template>
	<v-list dense nav>
		<item-menu-sidebar v-for="item in items" :key="item.title" :title="item.title" :icon="item.icon" :route="item.route"></item-menu-sidebar>
     </v-list>
</template>

<script>
import ItemMenuSidebar from './ItemMenuSidebar.vue'

export default {
	data : ()=>({
		items : [
			{
				title : 'Dashboard',
				icon : 'fa fa-tachometer-alt',
				route : '/dashboard'
			},
			{
				title : 'Commits',
				icon : 'fab fa-connectdevelop',
				route : 'commits'
			},
			{
				title : 'Repositories',
				icon : 'fa fa-folder',
				route : 'repositories'
			},
			{
				title : 'Branches',
				icon : 'fa fa-code-branch',
				route : ''
			},
			{
				title : 'Modules',
				icon : 'fa fa-sitemap',
				route : ''
			},
			{
				title : 'Developers',
				icon : 'fa fa-users',
				route : ''
			}
		]
	}),
	components : {
		ItemMenuSidebar
	}
}
</script>