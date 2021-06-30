<template>
	<div class="mb-3">
		<v-row>
			<v-col>
				<h2>{{ title }}</h2>
			</v-col>
			
			<v-spacer/>

			<v-col class='text-right'>
				<slot/>
			</v-col>

		</v-row>
		<v-divider/>
	</div>
</template>

<script>
	export default {
		props : {
			title : {
				type : String,
				required : true
			}
		}
	}
</script>