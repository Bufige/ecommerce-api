'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageProductSchema extends Schema {
	up() {
		this.create('image_products', (table) => {
			table.increments()
			table.string('path', 512).notNullable();
			table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
			table.timestamps()
		})
	}

	down() {
		this.drop('image_products')
	}
}

module.exports = ImageProductSchema
