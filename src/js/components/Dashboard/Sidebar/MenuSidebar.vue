<template>
	<v-list dense nav>
		<v-list-item-group v-model="selected">
			<item-menu-sidebar v-for="item in items" :key="item.title" :title="item.title" :icon="item.icon" :route="item.route"></item-menu-sidebar>
		</v-list-item-group>
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
				route : 'branches'
			},
			{
				title : 'Modules',
				icon : 'fa fa-sitemap',
				route : ''
			},
			{
				title : 'Developments',
				icon : 'fa fa-laptop-code',
				route : ''
			},
			{
				title : 'Developers',
				icon : 'fa fa-users',
				route : ''
			}
		],
		selected : 0
	}),
	components : {
		ItemMenuSidebar
	}
}
</script>