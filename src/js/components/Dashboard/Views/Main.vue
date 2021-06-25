<template>
	<h1>Dashboard</h1>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'

	export default {
		computed : {
			...mapState({
				username : (state)=>state.global.userData.username
			}),
			...mapGetters(['upperUsername'])
		}
	}
</script>