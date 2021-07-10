<template>
	<v-dialog
		persistent
		:value="show"
		max-width='700'
	>
		<v-card :loading="saving">
			<v-card-title>{{ !id ? 'Create Branch' : 'Update Branch'}}</v-card-title>
			<v-card-text>
				<v-container>
					<v-form ref="createBranchForm" @submit.prevent='save'>
						<v-text-field v-model='name' label='Name' :rules='rules.name'/>
						<v-textarea v-model='description' label='Description'/>
					</v-form>
				</v-container>
			</v-card-text>

			<v-card-actions class='d-flex justify-end'>
				<v-btn
					text
					@click='defineShowModalUpdateCreateBranch({show:false})'
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
				showState : state=>state.branch.updateCreate.showModal,
				dataState  : state=>state.branch.updateCreate.data
			}),
			show : {
				get(){
					return this.showState
				},
				set(show){
					this.defineShowModalUpdateCreateBranch({show})
				}
			},
			id(){
				return this.dataState.id
			},
			idRepository(){
				return this.dataState.idRepository
			},
			name : {
				get(){
					return this.dataState.name
				},
				set(name){
					this.defineNameBranchUpdateCreate(name)
				}
			},
			description : {
				get(){
					return this.dataState.description
				},
				set(description){
					this.defineDescriptionBranchUpdateCreate(description)
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
				'defineShowModalUpdateCreateBranch',
				'defineNameBranchUpdateCreate',
				'defineDescriptionBranchUpdateCreate'
			]),
			...mapActions(['saveBranch','updateBranch']),
			async save(){
				if(this.$refs.createBranchForm.validate()){
					this.saving = true
					
					// Save
					if(!this.id){
						await this.saveBranch({
							name : this.name,
							description : this.description != '' ? this.description : null,
							idRepository : this.idRepository
						})
					}else{
						// Update
						await this.updateBranch({
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