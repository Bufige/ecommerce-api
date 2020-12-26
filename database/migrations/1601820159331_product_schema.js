'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
	up() {
		this.create('products', (table) => {
			table.increments()
			table.string('name', 128).notNullable();
			table.text('description', 512);
			table.decimal('price');
			table.decimal('discount').default(0);

			table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
			table.timestamps();

		})
	}

	down() {
		this.drop('products')
	}
}

module.exports = ProductSchema
