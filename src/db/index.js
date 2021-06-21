const sqlite3 = require('sqlite3').verbose()

class Database{
	connection = null

	#pathDB = './src/db/store.db'
	#InitialSchema = [
		{
			table : 'colaborators',
			columns : {
				id : {
					type : 'int' 
				},
				name : {
					type : 'varchar(255)'
				}
			}
		}
	]

	constructor(){
		this.connection = new sqlite3.Database(this.#pathDB)
	}

	checkSchema(){
		
	}
}

module.exports = new Database()