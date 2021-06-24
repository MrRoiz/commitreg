<template>
	<v-row align="center" justify="center">
		<v-col lg="8" sm="8">
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
			this.toggleLoadingWelcomePage(true)

			ipcRenderer.on('gottenUserConfig',this.setUserConfig)
			ipcRenderer.send('getUserConfig')
		},
		methods : {
			...mapMutations(['toggleLoadingWelcomePage']),
			setUserConfig(e,userConfig){
				if(!userConfig){
					this.toggleLoadingWelcomePage(false)
					this.isFirstUse = true

				}else this.$router.push('/dashboard')
			}
		}
	}
</script>