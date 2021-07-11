<template>
	<v-app>
		<router-view/>
		<custom-snackbar/>
		<modal-create-update-repository/>
		<modal-create-update-branch/>
		<modal-create-update-module/>
	</v-app>
</template>

<script>
	import CustomSnackbar from './Common/CustomSnackbar.vue'
	import ModalCreateUpdateRepository from './Common/Modals/CreateUpdateRepository.vue'
	import ModalCreateUpdateBranch from './Common/Modals/CreateUpdateBranch.vue'
	import ModalCreateUpdateModule from './Common/Modals/CreateUpdateModule.vue'

	export default {
		components : {
			CustomSnackbar,
			ModalCreateUpdateRepository,
			ModalCreateUpdateBranch,
			ModalCreateUpdateModule
		}
	}
</script>