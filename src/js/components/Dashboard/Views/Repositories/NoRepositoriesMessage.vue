<template>
	<v-row justify='center'>
		<v-alert
			class='mt-10'
			prominent
			type='info'
		>
			No repositories to show

			<v-btn class='ml-8' @click="defineShowModalUpdateCreationRepository({show:true})">
				Create Repository
			</v-btn>

		</v-alert>
	</v-row>
</template>

<script>
	import { mapMutations } from 'vuex'
	
	export default {
		methods : {
			...mapMutations(['defineShowModalUpdateCreationRepository'])
		}
	}
</script>