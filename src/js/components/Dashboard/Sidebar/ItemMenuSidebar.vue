<template>
	<router-link :to="feature.route" class="text-decoration-none" :disabled='!comingSoon'>
  		<v-list-item link>
          	<v-list-item-icon>
            		<v-icon>{{ feature.icon }}</v-icon>
          	</v-list-item-icon>

			<v-list-item-content>
				<v-list-item-title>{{ feature.feature | capitalize }}</v-list-item-title>
			</v-list-item-content>

			<template v-if="comingSoon">
				<v-list-item-icon>
						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
								<v-icon 
									x-small
									v-bind='attrs'
									v-on='on'
								>fa fa-lightbulb</v-icon>
							</template>
							<span>Coming Soon!</span>
						</v-tooltip>
				</v-list-item-icon>
			</template>

        </v-list-item>
	</router-link>
</template>

<script>
export default {
	props : {
		feature : {
			required : true,
			type : Object
		}
	},
	computed : {
		comingSoon(){
			return this.feature.status == 'coming soon'
		}
	}
}
</script>