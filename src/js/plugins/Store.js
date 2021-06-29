import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state : {
		welcomePage : {
			loading: false
		},
		dashboardPage : {
			showSidebar: false
		},
		global : {
			darkTheme: true,
			userData : {
				username: '',
				id      : null
			},
			snackbar : {
				show   : false,
				message: '',
				type   : ''
			}
		}
	},
	mutations : {
		defineLoadingWelcomePage(state,showLoading){
			state.welcomePage.loading = showLoading
		},
		toggleTheme(state){
			state.global.darkTheme = !state.global.darkTheme
		},
		setUserData(state,{username,id}){
			state.global.userData.username = username
			state.global.userData.id = id
		},
		defineDarkTheme(state,boolean){
			state.global.darkTheme = boolean
		},
		toggleShowSidebar(state){
			state.dashboardPage.showSidebar = !state.dashboardPage.showSidebar
		},
		defineShowSidebar(state,boolean){
			state.dashboardPage.showSidebar = boolean
		},
		showAlert(state,{message,type=''}){
			state.global.snackbar.show = true
			state.global.snackbar.message = message
			state.global.snackbar.type = type
		},
		defineShowAlert(state,boolean){
			state.global.snackbar.show = boolean
		}
	},
	getters : {
		themeString(state){
			return state.global.darkTheme ? 'dark' : 'light'
		},
		oppositeThemeString(state){
			return state.global.darkTheme ? 'light' : 'dark'
		},
		upperUsername(state){
			return state.global.userData.username.toUpperCase()
		}
	}
})