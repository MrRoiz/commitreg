<template>
	<v-col cols='3'>
		<v-card>
			<v-card-title>{{ repository.name }}</v-card-title>
			<v-card-text>{{ description }}</v-card-text>
		</v-card>
	</v-col>
</template>

<script>
	export default {
		props : {
			repository : {
				type : Object,
				required : true,
			}
		},
		computed : {
			description(){
				return this.repository.description ?? 'No description'
			}
		}
	}
</script>