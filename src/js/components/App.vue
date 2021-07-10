<template>
	<v-app>
		<router-view/>
		<custom-snackbar/>
		<modal-create-update-repository/>
		<modal-create-update-branch/>
	</v-app>
</template>

<script>
	import CustomSnackbar from './Common/CustomSnackbar.vue'
	import ModalCreateUpdateRepository from './Common/Modals/CreateUpdateRepository.vue'
	import ModalCreateUpdateBranch from './Common/Modals/CreateUpdateBranch.vue'

	export default {
		components : {
			CustomSnackbar,
			ModalCreateUpdateRepository,
			ModalCreateUpdateBranch
		}
	}
</script>