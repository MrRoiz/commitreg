<template>
	<v-app-bar app>
		<v-app-bar-nav-icon @click="toggleShowSidebar">
			<v-icon>fa fa-bars</v-icon>
		</v-app-bar-nav-icon>
	</v-app-bar>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		methods : {
			...mapMutations(['toggleShowSidebar'])
		}
	}
</script>