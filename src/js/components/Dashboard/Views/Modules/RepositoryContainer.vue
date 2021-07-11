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
						@click='defineShowModalUpdateCreateModule({show:true,idRepository:repository.id})'
					>
						<v-icon>fa fa-plus</v-icon>
					</v-btn>

				</v-card-title>

				<v-divider/>

				<v-card-text>
					<template v-if='modules.length > 0'>
						<v-slide-group multiple show-arrows>

							<module v-for='module of modules' :key='module.id' :module='module' :idRepository='repository.id'/>

						</v-slide-group>
					</template>
					<template v-else>

						<no-content-message>
							<template v-slot:message>No modules associated to this repository</template>
							<template v-slot:action>
								<v-btn @click='defineShowModalUpdateCreateModule({show:true,idRepository:repository.id})'>
									create module
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
	import Module from './Module.vue'
	import { mapMutations, mapState } from 'vuex'
	import NoContentMessage from '../../../Common/Messages/NoContentMessage.vue'
	import SkeletonLoader from '../../../Common/SkeletonLoaders/LoaderCardActions.vue'

	export default {
		components : {
			NoContentMessage,
			SkeletonLoader,
			Module
		},
		props : {
			repository : {
				type : Object,
				required : true
			}
		},
		computed : {
			...mapState({
				fullModules : (state)=>state.module.modules
			}),
			modules(){
				return this.fullModules.filter(module=>module.id_repository == this.repository.id)
			}
		},
		methods : {
			...mapMutations(['defineShowModalUpdateCreateModule'])
		}
	}
</script>