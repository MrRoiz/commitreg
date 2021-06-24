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
				title : 'Home',
				icon : 'fa fa-lock',
				route : '/dashboard'
			},
			{
				title : 'Settings',
				icon : 'fa fa-lock',
				route : 'settings'
			},
			{
				title : 'About',
				icon : 'fa fa-lock',
				route : 'about'
			}
		]
	}),
	components : {
		ItemMenuSidebar
	}
}
</script>