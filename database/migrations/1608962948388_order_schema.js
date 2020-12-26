'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
	up() {
		this.create('orders', (table) => {
			table.increments()
			
			table.decimal('total_price').nullable();
			table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');

			table.timestamps()
		})
	}

	down() {
		this.drop('orders')
	}
}

module.exports = OrderSchema
