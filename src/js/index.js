import Vue from 'vue'
import router from './plugins/Router'
import vuetify from './plugins/Vuetify'
import store from './plugins/Store'
import App from './components/App.vue'
import { mapState } from 'vuex'

new Vue({
	render : render=>render('App'),
	router,
	vuetify,
	store,
	components : {
		App
	},
	computed : {
		...mapState({
			darkTheme : (state)=>state.global.darkTheme
		})
	},
	watch : {
		darkTheme(isDarkTheme){
			this.$vuetify.theme.dark = isDarkTheme
		}
	}
}).$mount('#app')