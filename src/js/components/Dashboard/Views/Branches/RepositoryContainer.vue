<template>
	<v-row>
		<v-col>
			<v-card>

				<v-card-title>
					{{repository.name}}
					<v-spacer/>

					<v-btn
						text
						color='success'
						small
						@click='defineShowModalUpdateCreateBranch({show:true,idRepository:repository.id})'
					>
						<v-icon>fa fa-plus</v-icon>
					</v-btn>

				</v-card-title>

				<v-divider/>

				<v-card-text>

					<template v-if='branches.length > 0'>
						<v-slide-group multiple show-arrows>

							<v-slide-item v-for="branch of branches" :key='branch.id'>
								<branch :branch='branch' :idRepository='repository.id'/>
							</v-slide-item>

						</v-slide-group>
					</template>
					<template v-else>

						<no-content-message>
							<template v-slot:message>No branches associated to this repository</template>
							<template v-slot:action>
								<v-btn @click='defineShowModalUpdateCreateBranch({show:true,idRepository:repository.id})'>
									create branch
								</v-btn>
							</template>
						</no-content-message>
					</template>

				</v-card-text>

			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	import Branch from './Branch.vue'
	import NoContentMessage from '../../../Common/Messages/NoContentMessage.vue'
	import SkeletonLoader from '../../../Common/SkeletonLoaders/LoaderCardActions.vue'

	export default {
		components : {
			Branch,
			NoContentMessage,
			SkeletonLoader
		},
		props : {
			repository : {
				type : Object,
				required : true
			}
		},
		computed : {
			...mapState({
				fullBranches : (state)=>state.branch.branches
			}),
			branches(){
				return this.fullBranches.filter(branch=>branch.repository_id == this.repository.id)
			}
		},
		methods : {
			...mapMutations(['defineShowModalUpdateCreateBranch'])
		}
	}
</script>