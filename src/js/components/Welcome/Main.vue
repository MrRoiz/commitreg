<template>
	<v-card
		:loading="loading"
	>

		<v-card-title>
			<v-icon>fa fa-terminal</v-icon> CommitReg
		</v-card-title>

		<v-card-subtitle>
			{{ loading || !isFirstUse ? 'Please wait...' : 'First use configuration'}}
		</v-card-subtitle>

		<template v-if="isFirstUse">
			<v-divider class="mx-3"/>

			<v-card-text>
				<v-form ref="userConfigForm" @submit.prevent='saveConfig'>
					<v-row>
						<v-col>
							<v-text-field
								label="Full Name"
								:disabled="loading"
								v-model="fullName"
								:rules='rules.name'
							/>
						</v-col>
						<v-col class="d-flex justify-center align-center">
							<v-btn
								text
								@click="toggleTheme"
								:disabled="loading"
							>
								<theme-icon/>Toggle Theme
							</v-btn>
						</v-col>
					</v-row>
				</v-form>
			</v-card-text>

			<v-card-actions class="d-flex justify-end">
				<v-btn 
					text
					:disabled="loading"
					@click="saveConfig"
				>
					Save and start
				</v-btn>
			</v-card-actions>
		</template>

	</v-card>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	import { ipcRenderer } from 'electron'
	import ThemeIcon from '../Common/ThemeIcon.vue'

	export default {
		components : {
			ThemeIcon
		},
		computed : {
			...mapState({
				loading : (state)=>state.welcomePage.loading
			}),
			...mapGetters(['themeString'])
		},
		props : {
			isFirstUse : {
				type : Boolean,
				default : false
			}
		},
		data : ()=>({
			fullName : '',
			rules : {
				name : [
					value=> !!value || 'Required Field'
				]
			}		
		}),
		methods : {
			...mapMutations([
				'defineLoadingWelcomePage',
				'toggleTheme',
				'setUserData',
				'defineDarkTheme',
				'showAlert'
			]),
			saveConfig(){
				if(this.$refs.userConfigForm.validate()){
					this.defineLoadingWelcomePage(true)

					ipcRenderer.once('storeUserConfigResponse',this.savedConfig)

					ipcRenderer.send('storeUserConfig',{
						name : this.fullName,
						theme : this.themeString
					})
				}
			},
			savedConfig(e,response){
				this.defineLoadingWelcomePage(false)

				if(response.bool){
					this.setUserData({
						username: response.message.Developer.name,
						id      : response.message.id_developer
					})
	
					this.$router.push('/dashboard')
				}else{
					this.showAlert({
						message : response.message,
						type : 'danger'
					})
				}
			}
		}
	}
</script>