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
				<v-row>
					<v-col>
						<v-text-field
							label="Full Name"
							:disabled="loading"
							v-model="fullName"
						/>
					</v-col>
					<v-col class="d-flex justify-center align-center">
						<v-btn
							text
							@click="toggleTheme"
							:disabled="loading"
						>
							<v-icon class="mr-3">{{darkTheme ? 'fa fa-moon' : 'fa fa-sun'}}</v-icon>
							Toggle Theme
						</v-btn>
					</v-col>
				</v-row>
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

	export default {
		computed : {
			...mapState({
				loading : (state)=>state.welcomePage.loading,
				darkTheme : (state)=>state.global.darkTheme
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
			fullName : ''
		}),
		methods : {
			...mapMutations([
				'defineLoadingWelcomePage',
				'toggleTheme',
				'setUserData',
				'defineDarkTheme'
			]),
			saveConfig(){
				this.defineLoadingWelcomePage(true)

				ipcRenderer.on('savedConfig',this.savedConfig)

				ipcRenderer.send('saveConfig',{
					name : this.fullName,
					theme : this.themeString
				})
			},
			savedConfig(e,savedConfig){
				this.defineLoadingWelcomePage(false)
				this.setUserData({
					username: savedConfig.Developer.name,
					id      : savedConfig.id_developer
				})

				this.$router.push('/dashboard')
			}
		}
	}
</script>