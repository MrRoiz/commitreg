<template>
	<v-col cols='3'>
		<v-card :loading="deleting">
			<v-card-title>{{ repository.name }}</v-card-title>
			<v-card-text>{{ description }}</v-card-text>

			<v-card-actions class='d-flex justify-end'>

				<template v-if='deleting'>
					<v-btn text disabled>DELETING...</v-btn>
				</template>
				<template v-else-if='!deleteConfirmation'>
					<v-btn text color='info' @click='editRepository'>edit</v-btn>
					<v-btn text color='error' @click="deleteConfirmation = true">delete</v-btn>
				</template>
				<template v-else-if='deleteConfirmation'>
					<v-btn text color='error' @click="deleteRepositoryMiddleware">delete?</v-btn>
					<v-btn text color='success' @click="deleteConfirmation = false">cancel</v-btn>
				</template>
			</v-card-actions>

		</v-card>
	</v-col>
</template>

<script>
	import { mapActions, mapMutations } from 'vuex'

	export default {
		props : {
			repository : {
				type : Object,
				required : true,
			}
		},
		computed : {
			description(){
				return this.repository.description ?? 'No description'
			}
		},
		data : ()=>({
			deleteConfirmation : false,
			deleting : false
		}),
		methods : {
			...mapActions(['deleteRepository']),
			...mapMutations(['defineShowModalUpdateCreateRepository']),
			async deleteRepositoryMiddleware(){
				this.deleting = true
				this.deleteConfirmation = false

				await this.deleteRepository(this.repository.id)

				this.deleting = false
			},
			editRepository(){
				this.defineShowModalUpdateCreateRepository({
					show : true,
					data : this.repository
				})
			}
		}
	}
</script>