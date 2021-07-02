<template>
	<v-snackbar 
		app
		v-model="show"
		:color='type'
	>
		{{ message }}

		<template v-slot:action="{ attrs }">
			<v-btn
				text
				v-bind="attrs"
				@click="defineShowAlert(false)"
			>
				Close
			</v-btn>
		</template>

	</v-snackbar>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'

	export default {
		computed : {
			...mapState({
				showState: (state)=>state.global.snackbar.show,
				message  : (state)=>state.global.snackbar.message,
				typeState: (state)=>state.global.snackbar.type
			}),
			show : {
				get(){
					return this.showState
				},
				set(value){
					this.defineShowAlert(value)
				}
			},
			type(){
				if(this.types[this.typeState]) return this.typeState
				return this.types.default
			}
		},
		data : ()=>({
			types : {
				success : 'success',
				warning : 'warning',
				info	   : 'info',
				danger  : 'error',
				default : 'default'
			}
		}),
		methods : {
			...mapMutations(['defineShowAlert','showAlert'])
		}
	}
</script>