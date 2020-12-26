'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarouselSchema extends Schema {
	up() {
		this.create('carousels', (table) => {
			table.increments()
			table.string("path");
			table.boolean("status");
			
			table.timestamps()
		})
	}

	down() {
		this.drop('carousels')
	}
}

module.exports = CarouselSchema
