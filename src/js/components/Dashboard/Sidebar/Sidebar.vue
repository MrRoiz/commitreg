<template>
  	<v-navigation-drawer app v-model="showSidebar">
		<header-sidebar></header-sidebar>
		<menu-sidebar></menu-sidebar>
	</v-navigation-drawer>
</template>

<script>
import HeaderSidebar from './HeaderSidebar.vue'
import MenuSidebar from './MenuSidebar.vue'
import { mapMutations, mapState } from 'vuex'

export default {
	components : {
		HeaderSidebar,
		MenuSidebar
	},
	computed: {
		...mapState({
			stateSidebar : (state)=>state.dashboardPage.showSidebar
		}),
		showSidebar:{
			get(){
				return this.stateSidebar
			},
			set(show){
				this.defineShowSidebar(show)
			}
		}
	},
	methods : {
		...mapMutations(['defineShowSidebar'])
	}
}
</script>