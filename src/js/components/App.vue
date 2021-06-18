<template>
	<v-app>
		
		<sidebar></sidebar>

		<v-app-bar app>
			
		</v-app-bar>

		<v-main>
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-main>

		<v-footer app>
			<v-col
				class="text-center"
				cols="12"
    			>
      			{{ new Date().getFullYear() }} — <strong>By Mr. Roiz</strong>
    			</v-col>
		</v-footer>
	</v-app>
</template>

<script>
import Sidebar from './Sidebar/Sidebar.vue'

export default {
	components : {
		Sidebar
	}
}
</script>