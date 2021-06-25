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

			ipcRenderer.on('gottenUserConfig',this.setUserConfig)
			ipcRenderer.send('getUserConfig')
		},
		methods : {
			...mapMutations([
				'defineLoadingWelcomePage',
				'defineDarkTheme',
				'setUserData'
			]),
			setUserConfig(e,userConfig){
				this.defineLoadingWelcomePage(false)
				if(!userConfig){
					this.isFirstUse = true
				}else{
					let isDarkTheme = userConfig.theme == 'dark'
					
					this.defineDarkTheme(isDarkTheme)
					this.setUserData({
						username: userConfig.Developer.name,
						id      : userConfig.id_developer
					})

					this.$router.push('/dashboard')
				}
			}
		}
	}
</script>