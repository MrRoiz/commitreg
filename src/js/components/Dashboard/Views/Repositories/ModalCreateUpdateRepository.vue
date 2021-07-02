<template>
	<v-dialog
		persistent
		:value="show"
		max-width='700'
	>
		<v-card :loading="saving">
			<v-card-title>Create Repository</v-card-title>
			<v-card-text>
				<v-container>
					<v-form ref="createRepositoryForm">
						<v-text-field v-model='data.name' label='Name' :rules='rules.name'/>
						<v-textarea v-model='data.description' label='Description'/>
					</v-form>
				</v-container>
			</v-card-text>

			<v-card-actions class='d-flex justify-end'>
				<v-btn
					text
					@click="defineShowModalCreateRepository(false)"
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
				showState : state=>state.repository.updateCreate.showModal,
				dataState  : state=>state.repository.updateCreate.data
			}),
			show : {
				get(){
					return this.showState
				},
				set(show){
					this.defineShowModalUpdateCreationRepository({show})
				}
			},
			name : {
				get(){
					return this.dataState.name
				},
				set(name){

				}
			}
		},
		data : ()=>({
			saving : false,
			data : {
				name       : '',
				description: '',
			},
			rules : {
				name : [
					value => !!value || 'Required Field'
				]
			}
		}),
		methods : {
			...mapMutations([
				'defineShowModalUpdateCreationRepository',
				'defineNameRepositoryUpdateCreate',
				'defineDecriptionRepositoryUpdateCreate'
			]),
			...mapActions(['saveRepository']),
			async save(){
				if(this.$refs.createRepositoryForm.validate()){
					this.saving = true

					await this.saveRepository({
						name : this.data.name,
						description : this.data.description != '' ? this.description : null
					})
					
					this.saving = false
				}
			}
		}
	}
</script>