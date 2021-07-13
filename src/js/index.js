import Vue from 'vue'
import router from './plugins/Router'
import vuetify from './plugins/Vuetify'
import store from './plugins/Store'
import App from './components/App.vue'
import { mapState } from 'vuex'

Vue.filter('capitalize', function (value) {
	if (!value) return ''
	value = value.toString()
	return value.charAt(0).toUpperCase() + value.slice(1)
})

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