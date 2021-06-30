<template>
	<v-dialog
		persistent
		v-model="show"
		max-width='500'
	>
		<v-card :loading="saving">
			<v-card-title>Create a Repository</v-card-title>
			<v-card-text>
				<v-container>
					<v-text-field v-model='name' label='Name'/>
					<v-textarea v-model='description' label='Description'/>
				</v-container>
			</v-card-text>

			<v-card-actions class='d-flex justify-end'>
				<v-btn
					text
					@click="defineShowModalCreationRepository(false)"
				>
					cancel
				</v-btn>
				<v-btn
					text
					color='success'
					@click="save"
				>
					save
				</v-btn>
			</v-card-actions>
		</v-card>

	</v-dialog>
</template>

<script>
	import { mapState, mapMutations, mapActions } from 'vuex'

	export default {
		computed : {
			...mapState({
				showState : (state)=>state.repositoriesPage.showModalCreation,
				saving : (state)=>state.repositoriesPage.savingRepository
			}),
			show : {
				get(){
					return this.showState
				},
				set(value){
					this.defineShowModalCreationRepository(value)
				}
			}
		},
		data : ()=>({
			name       : '',
			description: ''
		}),
		methods : {
			...mapMutations(['defineShowModalCreationRepository']),
			...mapActions(['saveRepository']),
			save(){
				this.saveRepository({
					name : this.name,
					description : this.description != '' ? this.description : null
				})
			}
		}
	}
</script>