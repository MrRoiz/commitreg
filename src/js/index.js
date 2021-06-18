import Vue from 'vue'
import router from './plugins/Router'
import vuetify from './plugins/Vuetify'
import App from './components/App.vue'

new Vue({
	render : render=>render('App'),
	router,
	vuetify,
	components : {
		App
	}
}).$mount('#app')