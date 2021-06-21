const sqlite3 = require('sqlite3').verbose()

class Database{
	connection = null

	#getAllTableNamesQuery = /*sql*/`
	SELECT 
		name
	FROM 
		sqlite_master 
	WHERE 
		type ='table' AND 
		name NOT LIKE 'sqlite_%';
	`

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

		this.#checkSchema()
		
	}

	#checkSchema(){
		new Promise((resolve, reject)=>{
			this.#getCurrentTables().then(tables=>{
				// TODO generar schema automatico
				// this.connection.run('CREATE TABLE commits (id INTEGER)')
				if(tables.length > 0){
					this.#InitialSchema.forEach(table=>{
						
					})
				}else{

				}
			}).catch(err=>{
				reject(err);
			})
		})
	}

	#getCurrentTables(){
		return new Promise((resolve, reject)=>{
			this.connection.all(this.#getAllTableNamesQuery,[],(err,results)=>{
				if(err) reject(err);
				else{
					resolve(results.map(table=>table.name))
				}
			})
		})
	}
}

module.exports = new Database()