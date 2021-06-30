<template>
	<v-app>
		<router-view/>
		<custom-snackbar/>
	</v-app>
</template>

<script>
	import CustomSnackbar from './Common/CustomSnackbar.vue'

	export default {
		components : {
			CustomSnackbar
		}
	}
</script>