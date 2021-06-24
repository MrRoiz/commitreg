<template>
  	<v-navigation-drawer app>
		<header-sidebar></header-sidebar>
		<menu-sidebar></menu-sidebar>
	</v-navigation-drawer>
</template>

<script>
import HeaderSidebar from './HeaderSidebar.vue'
import MenuSidebar from './MenuSidebar.vue'

export default {
	components : {
		HeaderSidebar,
		MenuSidebar
	}
}
</script>

<style>

</style>