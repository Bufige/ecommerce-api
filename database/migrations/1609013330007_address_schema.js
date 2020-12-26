'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
	up() {
		this.create('addresses', (table) => {
			table.increments()
			table.string('country');
			table.string('state');
			table.string('city');
			table.string('neighborhood');
			table.string('zipcode');
			table.string('address');
			table.string('number');

			table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');

			table.timestamps()
		})
	}

	down() {
		this.drop('addresses')
	}
}

module.exports = AddressSchema
