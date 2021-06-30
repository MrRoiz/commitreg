<template>
	<v-menu offset-y rounded="lg">
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				v-bind="attrs"
				v-on="on"
				icon
			>
				<v-icon>fa fa-cog</v-icon>
			</v-btn>
		</template>
		<v-list>
			<v-list-item link @click="toggleThemeMiddleware">
				<v-list-item-title>
					<theme-icon/>Toggle Theme
				</v-list-item-title>
			</v-list-item>
			<v-list-item link>
				<v-list-item-title>Settings</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script>
	import { mapMutations, mapGetters} from 'vuex'
	import { ipcRenderer } from 'electron'
	import ThemeIcon from '../../Common/ThemeIcon.vue'

	export default {
		components : {
			ThemeIcon
		},
		computed : {
			...mapGetters(['oppositeThemeString'])
		},
		methods : {
			...mapMutations(['toggleTheme','showAlert']),
			toggleThemeMiddleware(){
				ipcRenderer.once('updateUserConfigResponse',this.saveThemeResponse)

				ipcRenderer.send('updateUserConfig',{
					theme : this.oppositeThemeString
				})
			},
			saveThemeResponse(e,response){
				if(response.bool) this.toggleTheme()

				this.showAlert({
					message : response.message,
					type : response.bool ? 'success' : 'danger'
				})
			}
		}
	}
</script>