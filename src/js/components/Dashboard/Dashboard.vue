<template>
	<v-container>
		<sidebar/>

		<toolbar/>

		<v-main>
			<v-container fluid>
				<router-view/>
			</v-container>
		</v-main>

		<v-footer app>
			<v-col class="text-center" cols="12">
				{{ new Date().getFullYear() }} — <strong>By Mr. Roiz</strong>
			</v-col>
		</v-footer>
	</v-container>
</template>

<script>
import Sidebar from './Sidebar/Sidebar.vue'
import Toolbar from './Toolbar/Toolbar.vue'

export default {
	components : {
		Sidebar,
		Toolbar
	}
};
</script>