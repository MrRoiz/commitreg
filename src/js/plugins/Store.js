import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state : {
		welcomePage : {
			loading : false
		},
		global : {
			darkTheme : true,
			username : ''
		}
	},
	mutations : {
		toggleLoadingWelcomePage(state,showLoading){
			state.welcomePage.loading = showLoading
		},
		toggleTheme(state){
			state.global.darkTheme = !state.global.darkTheme
		},
		setUsername(state,username){
			state.global.username = username
		}
	},
	getters : {
		themeString(state){
			return state.global.darkTheme ? 'dark' : 'light'
		}
	}
})