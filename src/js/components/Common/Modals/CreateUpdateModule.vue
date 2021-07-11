<template>
	<v-dialog
		persistent
		:value="show"
		max-width='700'
	>
		<v-card :loading="saving">
			<v-card-title>{{ !id ? 'Create Module' : 'Update Module'}}</v-card-title>
			<v-card-text>
				<v-container>
					<v-form ref="createModuleForm" @submit.prevent='save'>
						<v-text-field v-model='name' label='Name' :rules='rules.name'/>
						<v-textarea v-model='description' label='Description'/>
					</v-form>
				</v-container>
			</v-card-text>

			<v-card-actions class='d-flex justify-end'>
				<v-btn
					text
					@click='defineShowModalUpdateCreateModule({show:false})'
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
				showState : state=>state.module.updateCreate.showModal,
				dataState  : state=>state.module.updateCreate.data
			}),
			show : {
				get(){
					return this.showState
				},
				set(show){
					this.defineShowModalUpdateCreateModule({show})
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
					this.defineNameModuleUpdateCreate(name)
				}
			},
			description : {
				get(){
					return this.dataState.description
				},
				set(description){
					this.defineDescriptionModuleUpdateCreate(description)
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
				'defineShowModalUpdateCreateModule',
				'defineNameModuleUpdateCreate',
				'defineDescriptionModuleUpdateCreate'
			]),
			...mapActions(['saveModule','updateModule']),
			async save(){
				if(this.$refs.createModuleForm.validate()){
					this.saving = true
					
					// Save
					if(!this.id){
						await this.saveModule({
							name : this.name,
							description : this.description != '' ? this.description : null,
							idRepository : this.idRepository
						})
					}else{
						// Update
						await this.updateModule({
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