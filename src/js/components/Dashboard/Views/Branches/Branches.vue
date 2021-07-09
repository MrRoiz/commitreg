<template>
	<div>
		<title-header title="Branches">
			<v-btn
				text
				color='success'
				small
				@click="defineShowModalUpdateCreateBranch({show:true})"
			>
				<v-icon>fa fa-plus</v-icon>
			</v-btn>
		</title-header>

		<v-row>
			<template v-if="!loading">

				<template v-if="branches.length > 0">
					<branch v-for="branch of branches" :key="branch.id" :branch="branch"/>
				</template>
				<no-branches-message v-else/>

			</template>
			<skeleton-loader v-else v-for='index in 8' :key='index'/>
		</v-row>
		<modal-create-update-branch/>
	</div>
</template>

<script>
	import Branch from './Branch.vue'
	import NoBranchesMessage from './NoBranchesMessage.vue'
	import TitleHeader from '../../../Common/TitleHeader.vue'
	import { mapState, mapActions, mapMutations } from 'vuex'
	import ModalCreateUpdateBranch from '../../../Common/Modals/CreateUpdateBranch.vue'
	import SkeletonLoader from '../../../Common/SkeletonLoaders/LoaderCardActions.vue'

	export default {
		components : {
			TitleHeader,
			SkeletonLoader,
			NoBranchesMessage,
			ModalCreateUpdateBranch,
			Branch
		},
		computed : {
			...mapState({
				branches : (state)=>state.branch.branches
			})
		},
		data : ()=>({
			loading : false
		}),
		async mounted(){
			if(this.branches.length <= 0){
				this.loading = true
				await this.getBranches()
				this.loading = false
			}
		},
		methods : {
			...mapActions(['getBranches']),
			...mapMutations(['defineShowModalUpdateCreateBranch'])
		}
	}
</script>