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
		repository : {
			create : {
				showModal : false
			},
			update : {
				showModal : false,
				data : {
					id         : '',
					name       : '',
					description: '',
				}
			},
			showModalCreation : false,
			repositories : []
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
		associateRepositories(state,repositories){
			state.repository.repositories = [
				...state.repository.repositories,
				...repositories
			]
		},
		defineShowModalUpdateCreationRepository(state,{show,data = null}){
			if(data){
				state.repository.updateCreate.data.id = data.id
				state.repository.updateCreate.data.name = data.name
				state.repository.updateCreate.data.description = data.description
			}else{
				Object.keys(state.repository.updateCreate.data).forEach(key=>{
					if(key == 'id'){
						state.repository.updateCreate.data[key] = null
					}else{
						state.repository.updateCreate.data[key] = ''	
					}
				})
			}

			state.repository.updateCreate.showModal = show
		},
		removeRepository(state,idRepository){
			state.repository.repositories = state.repository.repositories.filter(repository=>{
				return repository.id != idRepository
			})
		},
		defineNameRepositoryUpdateCreate(state,name){
			state.repository.updateCreate.data.name = name
		},
		defineDecriptionRepositoryUpdateCreate(state,decription){
			state.repository.updateCreate.data.decription = decription
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
			return new Promise((resolve)=>{
				ipcRenderer.once('indexRepositoryResponse',(e,response)=>{
					if(response.bool){
						commit('associateRepositories',response.message)
					}else{
						commit('showAlert',{
							message : response.message,
							type : 'danger'
						})
					}
					resolve()
				})
	
				ipcRenderer.send('indexRepository')
			})
		},
		saveRepository({commit},repository){
			return new Promise((resolve)=>{
				ipcRenderer.once('storeRepositoryResponse',(e,response)=>{
					if(response.bool){
						commit('defineShowModalUpdateCreationRepository',{
							show : false
						})

						commit('associateRepositories',[response.message])
	
						commit('showAlert',{
							message: 'Repository Saved',
							type : 'success'
						})
					}else{
						commit('showAlert',{
							message : response.message,
							type : 'danger'
						})
					}
					resolve()
				})
	
				ipcRenderer.send('storeRepository',repository)
			})
		},
		deleteRepository({commit},idRepository){
			return new Promise((resolve)=>{
				ipcRenderer.once('destroyRepositoryResponse',(event,response)=>{
	
					if(response.bool){
						commit('removeRepository',idRepository)
	
						commit('showAlert',{
							message : response.message,
							type : 'success'
						})
					}else{
						commit('showAlert',{
							message : response.message,
							type : 'danger'
						})
					}
					resolve()
				})
	
				ipcRenderer.send('destroyRepository',{
					id : idRepository
				})
			})
		}
	}
})