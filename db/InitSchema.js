const Migration = require('../app/models/Migration')
const Sequelize = require('./index')
const Schema = require('./Schema.sql.json')

class InitSchema{
	async migrate(){
		await this.#updateMigrations()
		await this.#runMigrations()
	}

	async #runMigrations(){
		const pendingMigrations = await Migration.findAll({
			where : {
				executed : 0
			}
		})

		await Promise.all(pendingMigrations.reduce((carry,migration)=>{
			carry.push(Sequelize.query(migration.migration))
			migration.executed = 1
			carry.push(migration.save())

			return carry
		},[]))
	}

	async #updateMigrations(){
		await Sequelize.query(Schema.migrationsTable)
		await Promise.all(Schema.migrations.map(migration=>{
			return Migration.findOrCreate({
				where: {
					migration
				}
			})
		}))
	}
}

module.exports = InitSchema