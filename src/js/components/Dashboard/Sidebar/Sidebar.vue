<template>
  	<v-navigation-drawer app v-model="showSidebar">
		<header-sidebar></header-sidebar>
		<menu-sidebar></menu-sidebar>
	</v-navigation-drawer>
</template>

<script>
import HeaderSidebar from './HeaderSidebar.vue'
import MenuSidebar from './MenuSidebar.vue'
import { mapState } from 'vuex'

export default {
	components : {
		HeaderSidebar,
		MenuSidebar
	},
	computed: {
		...mapState({
			showSidebar : (state)=>state.dashboardPage.showSidebar
		}),
	}
}
</script>