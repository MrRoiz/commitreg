<template>
	<v-dialog
		persistent
		:value="show"
		max-width='700'
	>
		<v-card :loading="saving">
			<v-card-title>{{ !id ? 'Create Repository' : 'Update Repository'}}</v-card-title>
			<v-card-text>
				<v-container>
					<v-form ref="createRepositoryForm">
						<v-text-field v-model='name' label='Name' :rules='rules.name'/>
						<v-textarea v-model='description' label='Description'/>
					</v-form>
				</v-container>
			</v-card-text>

			<v-card-actions class='d-flex justify-end'>
				<v-btn
					text
					@click="defineShowModalUpdateCreateRepository({show:false})"
				>
					cancel
				</v-btn>
				<v-btn
					text
					color='success'
					@click="save"
				>
					{{ !id ? 'save' : 'update'}}
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
					this.defineShowModalUpdateCreateRepository({show})
				}
			},
			id(){
				return this.dataState.id
			},
			name : {
				get(){
					return this.dataState.name
				},
				set(name){
					this.defineNameRepositoryUpdateCreate(name)
				}
			},
			description : {
				get(){
					return this.dataState.description
				},
				set(description){
					this.defineDescriptionRepositoryUpdateCreate(description)
				}
			}
		},
		data : ()=>({
			saving : false,
			rules : {
				name : [
					value => !!value || 'Required Field'
				]
			}
		}),
		methods : {
			...mapMutations([
				'defineShowModalUpdateCreateRepository',
				'defineNameRepositoryUpdateCreate',
				'defineDescriptionRepositoryUpdateCreate'
			]),
			...mapActions(['saveRepository','updateRepository']),
			async save(){
				if(this.$refs.createRepositoryForm.validate()){
					this.saving = true
					
					// Save
					if(!this.id){
						await this.saveRepository({
							name : this.name,
							description : this.description != '' ? this.description : null
						})
					}else{
						// Update
						await this.updateRepository({
							id : this.id,
							name : this.name,
							description : this.description != '' ? this.description : null
						})
					}
					
					this.saving = false
				}
			}
		}
	}
</script>