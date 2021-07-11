<template>
	<v-card class='mr-5' style='border:1px solid rgba(255, 255, 255, 0.12)' elevation="10">
		<v-card-title>{{module.name}}</v-card-title>
		<v-card-text>{{description}}</v-card-text>

		<v-card-actions class='d-flex justify-end'>

				<template v-if='deleting'>
					<v-btn text disabled>DELETING...</v-btn>
				</template>
				<template v-else-if='!deleteConfirmation'>
					<v-btn text color='info' @click='editModule'>edit</v-btn>
					<v-btn text color='error' @click="deleteConfirmation = true">delete</v-btn>
				</template>
				<template v-else-if='deleteConfirmation'>
					<v-btn text color='error' @click='deleteCurrentModule'>delete?</v-btn>
					<v-btn text color='success' @click="deleteConfirmation = false">cancel</v-btn>
				</template>
			</v-card-actions>
	</v-card>
</template>

<script>
	import { mapMutations, mapActions } from 'vuex'

	export default {
		props : {
			module : {
				required : true,
				type : Object
			},
			idRepository : {
				required : true,
				type : Number
			}
		},
		computed : {
			description(){
				return this.module.description ?? 'No description'
			}
		},
		data : ()=>({
			deleting : false,
			deleteConfirmation : false
		}),
		methods : {
			...mapMutations(['defineShowModalUpdateCreateModule']),
			...mapActions(['deleteModule']),
			editModule(){
				this.defineShowModalUpdateCreateModule({
					show : true,
					data : this.module
				})
			},
			async deleteCurrentModule(){
				this.deleting = true
				await this.deleteModule(this.module.id)
				this.deleting = false
			}
		}
	}
</script>