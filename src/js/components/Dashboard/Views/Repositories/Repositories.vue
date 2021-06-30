<template>
	<div>
		<title-header title="Repositories">
			<v-btn
				text
				color='success'
				small
				@click="defineShowModalCreationRepository(true)"
			>
				<v-icon>fa fa-plus</v-icon>
			</v-btn>
		</title-header>

		<v-row>
			<template v-if="!loading">

				<template v-if="repositories.length > 0">
					<repository v-for="repository of repositories" :key="repository.id" :repository="repository"/>
				</template>
				<template v-else>
					<v-row justify='center'>
						<v-alert
							class='mt-10'
							prominent
							type='info'
						>
							There's no repositories to show

							<v-btn class='ml-8' @click="defineShowModalCreationRepository(true)">
								Create Repository
							</v-btn>

						</v-alert>
					</v-row>

				</template>

			</template>
			<skeleton-loader v-else v-for='index in 8' :key='index'/>
		</v-row>
		<modal-create-repository/>
	</div>
</template>

<script>
	import TitleHeader from '../../../Common/TitleHeader.vue'
	import SkeletonLoader from './SkeletonLoader.vue'
	import ModalCreateRepository from './ModalCreateRepository.vue'
	import Repository from './Repository.vue'
	import { mapState, mapActions, mapMutations } from 'vuex'

	export default {
		components : {
			TitleHeader,
			SkeletonLoader,
			ModalCreateRepository,
			Repository
		},
		computed : {
			...mapState({
				repositories : (state)=>state.repositoriesPage.repositories,
				loading : (state)=>state.repositoriesPage.loading
			})
		},
		mounted(){
			if(this.repositories.length <= 0){
				this.defineLoadingRepositoriesPage(true)
				this.getRepositories()
			}
		},
		methods : {
			...mapActions(['getRepositories']),
			...mapMutations(['defineLoadingRepositoriesPage','defineShowModalCreationRepository'])
		}
	}
</script>