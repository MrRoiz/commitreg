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
			updateCreate : {
				showModal : false,
				data : {
					id         : null,
					name       : '',
					description: '',
				}
			},
			showModalCreation : false,
			repositories : []
		},
		branch : {
			updateCreate : {
				showModal : false,
				data : {
					id         : null,
					name       : '',
					description: '',
					idRepository : null
				}
			},
			showModalCreation : false,
			branches : []
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
		defineShowModalUpdateCreateRepository(state,{show,data = null}){
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
		defineDescriptionRepositoryUpdateCreate(state,description){
			state.repository.updateCreate.data.description = description
		},
		updateRepository(state,updatedRepository){
			let repository = state.repository.repositories.find(repo=>repo.id == updatedRepository.id)
			
			Object.entries(updatedRepository).forEach(([attribute,value])=>{
				if(attribute == 'id') return
				repository[attribute] = value
			})
		},
		associateBranches(state,branches){
			state.branch.branches = [
				...state.branch.branches,
				...branches
			]
		},
		defineShowModalUpdateCreateBranch(state,{show,data = null,idRepository = null}){			
			if(data){
				state.branch.updateCreate.data.id = data.id
				state.branch.updateCreate.data.name = data.name
				state.branch.updateCreate.data.description = data.description
			}else{
				Object.keys(state.branch.updateCreate.data).forEach(key=>{
					if(key == 'id'){
						state.branch.updateCreate.data[key] = null
					}else{
						state.branch.updateCreate.data[key] = ''	
					}
				})
			}

			state.branch.updateCreate.data.idRepository = idRepository

			state.branch.updateCreate.showModal = show
		},
		defineNameBranchUpdateCreate(state,name){
			state.branch.updateCreate.data.name = name
		},
		defineDescriptionBranchUpdateCreate(state,description){
			state.branch.updateCreate.data.description = description
		},
		updateBranch(state,updatedBranch){
			let branch = state.branch.branches.find(branch=>branch.id == updatedBranch.id)
			
			Object.entries(updatedBranch).forEach(([attribute,value])=>{
				if(attribute == 'id') return
				branch[attribute] = value
			})
		},
		removeBranch(state,idBranch){
			state.branch.branches = state.branch.branches.filter(branch=>{
				return branch.id != idBranch
			})
		},
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
						commit('defineShowModalUpdateCreateRepository',{
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
		updateRepository({commit},repository){
			return new Promise((resolve)=>{
				ipcRenderer.once('updateRepositoryResponse',(e,response)=>{
					if(response.bool){
						commit('defineShowModalUpdateCreateRepository',{
							show : false
						})

						commit('updateRepository',response.message)
	
						commit('showAlert',{
							message: 'Repository Updated',
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
	
				ipcRenderer.send('updateRepository',repository)
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
		},
		getBranches({commit}){
			return new Promise((resolve)=>{
				ipcRenderer.once('indexBranchResponse',(e,response)=>{
					if(response.bool){
						commit('associateBranches',response.message)
					}else{
						commit('showAlert',{
							message : response.message,
							type : 'danger'
						})
					}
					resolve()
				})
	
				ipcRenderer.send('indexBranch')
			})
		},
		saveBranch({commit},branch){
			return new Promise((resolve)=>{
				ipcRenderer.once('storeBranchResponse',(e,response)=>{
					if(response.bool){
						commit('defineShowModalUpdateCreateBranch',{
							show : false
						})

						commit('associateBranches',[response.message])
	
						commit('showAlert',{
							message: 'Branch Saved',
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
	
				ipcRenderer.send('storeBranch',branch)
			})
		},
		updateBranch({commit},branch){
			return new Promise((resolve)=>{
				ipcRenderer.once('updateBranchResponse',(e,response)=>{
					if(response.bool){
						commit('defineShowModalUpdateCreateBranch',{
							show : false
						})

						commit('updateBranch',response.message)
	
						commit('showAlert',{
							message: 'Branch Updated',
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
	
				ipcRenderer.send('updateBranch',branch)
			})
		},
		deleteBranch({commit},idBranch){
			return new Promise((resolve)=>{
				ipcRenderer.once('destroyBranchResponse',(event,response)=>{
	
					if(response.bool){
						commit('removeBranch',idBranch)
	
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
	
				ipcRenderer.send('destroyBranch',{
					id : idBranch
				})
			})
		},
	}
})