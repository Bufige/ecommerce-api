'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RateProductSchema extends Schema {
	up() {
		this.create('rate_products', (table) => {
			table.increments()
			
			table.integer('rate').unsigned();

			table.integer('product_id').unsigned().references('id').inTable('products').onUpdate('CASCADE').onDelete('CASCADE');
			table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');

			table.timestamps()
		})
	}

	down() {
		this.drop('rate_products')
	}
}

module.exports = RateProductSchema
