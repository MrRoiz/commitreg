<template>
	<v-col cols='3'>
		<v-card :loading="deleting">
			<v-card-title>{{ branch.name }}</v-card-title>
			<v-card-text>{{ description }}</v-card-text>

			<v-card-actions class='d-flex justify-end'>

				<template v-if='deleting'>
					<v-btn text disabled>DELETING...</v-btn>
				</template>
				<template v-else-if='!deleteConfirmation'>
					<v-btn text color='info' @click='editBranch'>edit</v-btn>
					<v-btn text color='error' @click="deleteConfirmation = true">delete</v-btn>
				</template>
				<template v-else-if='deleteConfirmation'>
					<v-btn text color='error' @click="deleteBranchMiddleware">delete?</v-btn>
					<v-btn text color='success' @click="deleteConfirmation = false">cancel</v-btn>
				</template>
			</v-card-actions>

		</v-card>
	</v-col>
</template>

<script>
	import { mapActions, mapMutations } from 'vuex'

	export default {
		props : {
			branch : {
				type : Object,
				required : true,
			}
		},
		computed : {
			description(){
				return this.branch.description ?? 'No description'
			}
		},
		data : ()=>({
			deleteConfirmation : false,
			deleting : false
		}),
		methods : {
			...mapActions(['deleteBranch']),
			...mapMutations(['defineShowModalUpdateCreateBranch']),
			async deleteBranchMiddleware(){
				this.deleting = true
				this.deleteConfirmation = false

				await this.deleteBranch(this.branch.id)

				this.deleting = false
			},
			editBranch(){
				this.defineShowModalUpdateCreateBranch({
					show : true,
					data : this.branch
				})
			}
		}
	}
</script>