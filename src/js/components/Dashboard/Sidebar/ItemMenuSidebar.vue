<template>
	<router-link :to="route" class="text-decoration-none">
  		<v-list-item link>
          	<v-list-item-icon>
            		<v-icon>{{ icon }}</v-icon>
          	</v-list-item-icon>

			<v-list-item-content>
				<v-list-item-title>{{ title }}</v-list-item-title>
			</v-list-item-content>
        	</v-list-item>
	</router-link>
</template>

<script>
export default {
	props : ['title','icon','route']
}
</script>