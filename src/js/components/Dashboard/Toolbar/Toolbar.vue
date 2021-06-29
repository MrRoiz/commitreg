<template>
	<v-app-bar app>
		<v-app-bar-nav-icon @click="toggleShowSidebar">
			<v-icon>fa fa-bars</v-icon>
		</v-app-bar-nav-icon>

		<v-spacer/>

		<toolbar-options/>
	</v-app-bar>
</template>

<script>
	import ToolbarOptions from './Options.vue'
	import { mapMutations } from 'vuex'

	export default {
		components : {
			ToolbarOptions
		},
		methods : {
			...mapMutations(['toggleShowSidebar'])
		}
	}
</script>