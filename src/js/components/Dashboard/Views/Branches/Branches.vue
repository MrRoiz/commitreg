<template>
	<div>
		<title-header title="Branches"/>

		<div v-if="!loading">
			<template v-if='repositories.length > 0'>
				<repository-container v-for='repository of repositories' :key='repository.id' :repository='repository'/>
			</template>
			<no-content-message v-else>
				<template v-slot:message>
					No repositories to associate branches
				</template>
				<template v-slot:action>
					<v-btn @click='defineShowModalUpdateCreateRepository({show:true})'>
						create repository
					</v-btn>
				</template>
			</no-content-message>
		</div>
		<skeleton-loader v-else v-for='index in 2' :key='index'/>
	</div>
</template>

<script>
	import TitleHeader from '../../../Common/TitleHeader.vue'
	import { mapState, mapActions, mapMutations } from 'vuex'
	import RepositoryContainer from './RepositoryContainer.vue'
	import NoContentMessage from '../../../Common/Messages/NoContentMessage.vue'
	import SkeletonLoader from '../../../Common/SkeletonLoaders/LoaderRowHeaderImage.vue'

	export default {
		components : {
			TitleHeader,
			SkeletonLoader,
			NoContentMessage,
			RepositoryContainer,
		},
		computed : {
			...mapState({
				repositories : state=>state.repository.repositories
			})
		},
		data : ()=>({
			loading : false
		}),
		async mounted(){
			if(this.repositories.length <= 0){
				this.loading = true
				if(this.repositories.length <= 0) await this.getRepositories()
				this.loading = false
			}
		},
		methods : {
			...mapActions(['getRepositories']),
			...mapMutations(['defineShowModalUpdateCreateRepository'])
		}
	}
</script>