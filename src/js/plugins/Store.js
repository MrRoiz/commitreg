import Vue from 'vue'
import Vuex from 'vuex'
import { ipcRenderer } from 'electron'

Vue.use(Vuex)

export default new Vuex.Store({
	state : {
		welcomePage : {
			loading: false
		},
		dashboardPage : {
			showSidebar: false
		},
		repositoriesPage : {
			loading : false,
			repositories : [],
			showModalCreation : false,
			savingRepository : false
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
		},
		defineLoadingRepositoriesPage(state,boolean){
			state.repositoriesPage.loading = boolean
		},
		associateRepositories(state,repositories){
			state.repositoriesPage.repositories = [
				...state.repositoriesPage.repositories,
				...repositories
			]
		},
		defineShowModalCreationRepository(state,boolean){
			state.repositoriesPage.showModalCreation = boolean
		},
		defineSavingRepository(state,boolean){
			state.repositoriesPage.saveRepository = boolean
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
	},
	actions : {
		getRepositories({commit}){
			ipcRenderer.once('indexRepositoryResponse',(e,response)=>{
				commit('defineLoadingRepositoriesPage',false)

				if(response.bool){
					console.log(response.message)
					commit('associateRepositories',response.message)
				}else{
					commit('showAlert',{
						message : response.message,
						type : 'danger'
					})
				}
			})

			ipcRenderer.send('indexRepository')
		},
		saveRepository({commit},repository){
			ipcRenderer.once('storeRepositoryResponse',(e,response)=>{
				commit('defineSavingRepository',false)

				if(response.bool){
					commit('associateRepositories',[response.message])
					commit('defineShowModalCreationRepository',false)
				}else{
					commit('showAlert',{
						message : response.message,
						type : 'danger'
					})
				}
			})

			commit('defineSavingRepository',true)

			ipcRenderer.send('storeRepository',repository)
		}
	}
})