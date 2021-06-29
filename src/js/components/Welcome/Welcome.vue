<template>
	<v-row align="center" justify="center">
		<v-col lg="7" sm="8">
			<configuration-card :isFirstUse="isFirstUse"/>
		</v-col>
	</v-row>
</template>

<script>
	import ConfigurationCard from './Main.vue'
	import { ipcRenderer } from 'electron'
	import { mapState, mapMutations } from 'vuex'

	export default {
		components : {
			ConfigurationCard
		},
		computed : {
			...mapState({
				loading : (state)=>state.welcomePage.loading
			})
		},
		data : ()=>({
			isFirstUse : false
		}),
		mounted(){
			this.defineLoadingWelcomePage(true)

			ipcRenderer.on('showUserConfigResponse',this.setUserConfig)
			ipcRenderer.send('showUserConfig')
		},
		methods : {
			...mapMutations([
				'defineLoadingWelcomePage',
				'defineDarkTheme',
				'setUserData',
				'showAlert'
			]),
			setUserConfig(e,response){
				this.defineLoadingWelcomePage(false)
				if(response.bool){
					if(!response.message){
						this.isFirstUse = true
					}else{
						let isDarkTheme = response.message.theme == 'dark'
						
						this.defineDarkTheme(isDarkTheme)
						this.setUserData({
							username: response.message.Developer.name,
							id      : response.message.id_developer
						})
	
						this.$router.push('/dashboard')
					}
				}else{
					this.isFirstUse = true
					this.showAlert({
						message : response.message,
						type : 'danger'
					})
				}
			}
		}
	}
</script>