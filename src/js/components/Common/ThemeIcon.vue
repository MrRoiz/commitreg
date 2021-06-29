<template>
	<v-icon class="mr-3"> {{darkTheme ? lightIcon : darkIcon}} </v-icon>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		data : ()=>({
			darkIcon : 'fa fa-moon',
			lightIcon : 'fa fa-sun'
		}),
		computed : {
			...mapState({
				darkTheme : (state)=>state.global.darkTheme
			})
		}
	}
</script>