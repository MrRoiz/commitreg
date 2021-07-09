<template>
	<v-row justify='center'>
		<v-alert
			class='mt-10'
			prominent
			type='info'
		>
			No branches to show

			<v-btn class='ml-8' @click="defineShowModalUpdateCreateBranch({show:true})">
				Create Branch
			</v-btn>

		</v-alert>
	</v-row>
</template>

<script>
	import { mapMutations } from 'vuex'
	
	export default {
		methods : {
			...mapMutations(['defineShowModalUpdateCreateBranch'])
		}
	}
</script>