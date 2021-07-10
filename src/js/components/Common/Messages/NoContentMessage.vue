<template>
	<v-col>
		<v-alert
			prominent
			type='info'
			class='mx-10'
		>
			<v-row align='center'>
				<v-col>
					<slot name='message'/>
				</v-col>
				<v-spacer/>
				<v-col class='text-right'>
					<slot name='action'/>
				</v-col>
			</v-row>
		</v-alert>
	</v-col>
</template>

<script>
	export default {}
</script>