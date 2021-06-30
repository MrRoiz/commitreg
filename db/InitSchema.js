const Migration = require('../app/Models/Migration')
const Sequelize = require('./index')
const Schema = require('./Schema.sql.json')

class InitSchema{
	async migrate(){
		await this.#updateMigrations()
		await this.#runMigrations()
	}

	async #runMigrations(){
		try{
			const pendingMigrations = await Migration.findAll({
				where : {
					executed : 0
				}
			})
			
			for(let migration of pendingMigrations){
				await Sequelize.query(migration.migration)
				migration.executed = 1
				await migration.save()
			}

		}catch(error){
			console.log(error)
		}
	}

	async #updateMigrations(){
		try{
			await Sequelize.query(Schema.migrationsTable)

			for(let migration of Schema.migrations){
				await Migration.findOrCreate({
					where: {
						migration
					}
				})
			}
		}catch(error){
			console.log(error)
		}
	}
}

module.exports = InitSchema