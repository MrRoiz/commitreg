<template>
	<v-list dense nav>
		<v-list-item-group v-model="selected" v-if='!loading'>
			<template v-if='features.length > 0'>
				<item-menu-sidebar 
					v-for="feature in features"
					:key="feature.id"
					:feature='feature'
				/>
			</template>
			<template v-else>
				<v-list-item>
					<v-list-item-icon>
						<v-icon>fa fa-exclamation-circle</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>No features found</v-list-item-title>
					</v-list-item-content>
				</v-list-item>		
			</template>
		</v-list-item-group>
		<v-list-item v-else>
			<v-list-item-icon>
				<v-progress-circular indeterminate/>
			</v-list-item-icon>
			<v-list-item-content>
				<v-list-item-title>Loading features</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
     </v-list>
</template>

<script>
	import { mapMutations } from 'vuex'
	import { ipcRenderer } from 'electron'
	import ItemMenuSidebar from './ItemMenuSidebar.vue'

	export default {
		components : {
			ItemMenuSidebar
		},
		data : ()=>({
			selected : 0,
			loading : false,
			features : []
		}),
		async mounted(){
			if(this.features.length <= 0){
				this.loading = true
				await this.getFeatures()
				this.loading = false
			}
		},
		methods : {
			...mapMutations(['showAlert']),
			getFeatures(){
				return new Promise(resolve=>{
					let self = this
					ipcRenderer.once('indexFeatureFlagResponse',(e,response)=>{
						if(response.bool){
							self.features = response.message
						}else{
							self.showAlert({
								message : response.message,
								type : 'danger'
							})
						}
						resolve()
					})

					ipcRenderer.send('indexFeatureFlag')
				});
			},
		}
	}
</script>