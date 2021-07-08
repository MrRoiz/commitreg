<template>
	<div>
		<title-header title="Repositories">
			<v-btn
				text
				color='success'
				small
				@click="defineShowModalUpdateCreateRepository({show:true})"
			>
				<v-icon>fa fa-plus</v-icon>
			</v-btn>
		</title-header>

		<v-row>
			<template v-if="!loading">

				<template v-if="repositories.length > 0">
					<repository v-for="repository of repositories" :key="repository.id" :repository="repository"/>
				</template>
				<no-repositories-message v-else/>

			</template>
			<skeleton-loader v-else v-for='index in 8' :key='index'/>
		</v-row>
		<modal-create-update-repository/>
	</div>
</template>

<script>
	import TitleHeader from '../../../Common/TitleHeader.vue'
	import SkeletonLoader from './SkeletonLoader.vue'
	import ModalCreateUpdateRepository from './ModalCreateUpdateRepository.vue'
	import Repository from './Repository.vue'
	import NoRepositoriesMessage from './NoRepositoriesMessage.vue'
	import { mapState, mapActions, mapMutations } from 'vuex'

	export default {
		components : {
			TitleHeader,
			SkeletonLoader,
			ModalCreateUpdateRepository,
			Repository,
			NoRepositoriesMessage
		},
		computed : {
			...mapState({
				repositories : (state)=>state.repository.repositories
			})
		},
		data : ()=>({
			loading : false
		}),
		async mounted(){
			if(this.repositories.length <= 0){
				this.loading = true
				await this.getRepositories()
				this.loading = false
			}
		},
		methods : {
			...mapActions(['getRepositories']),
			...mapMutations(['defineShowModalUpdateCreateRepository'])
		}
	}
</script>