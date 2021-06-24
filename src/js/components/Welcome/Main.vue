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
					<v-col>
						<v-switch
							v-model="darkTheme"
							:disabled="loading"
							inset
							@change="toggleTheme"
							:label="darkTheme ? 'Dark Theme' : 'Light Theme'"
						/>
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
			darkTheme : true
		}),
		methods : {
			...mapMutations([
				'toggleLoadingWelcomePage',
				'toggleTheme',
				'setUsername'
			]),
			saveConfig(){
				this.toggleLoadingWelcomePage(true)

				ipcRenderer.on('savedConfig',this.savedConfig)

				ipcRenderer.send('saveConfig',{
					name : this.fullName,
					theme : this.themeString
				})
			},
			savedConfig(e,savedConfig){
				this.toggleLoadingWelcomePage(true)
				console.log(savedConfig.username,savedConfig.theme)
				this.setUsername(savedConfig.username)

				this.$router.push('/dashboard')
			}
		}
	}
</script>