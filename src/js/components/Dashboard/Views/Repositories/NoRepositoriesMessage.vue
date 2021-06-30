<template>
	<v-row justify='center'>
		<v-alert
			class='mt-10'
			prominent
			type='info'
		>
			There's no repositories to show

			<v-btn class='ml-8' @click="defineShowModalCreationRepository(true)">
				Create Repository
			</v-btn>

		</v-alert>
	</v-row>
</template>

<script>
	import { mapMutations } from 'vuex'
	
	export default {
		methods : {
			...mapMutations(['defineShowModalCreationRepository'])
		}
	}
</script>