<template>
	<v-col :cols='noCols || 3'>
		<v-skeleton-loader type="article, actions"/>
	</v-col>
</template>

<script>
	export default {
		props : {
			noCols : {
				required : false,
				default(){
					return false
				},
				type : Boolean
			}
		}
	}
</script>