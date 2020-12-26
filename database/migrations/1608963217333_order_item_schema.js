'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderItemSchema extends Schema {
  up () {
    this.create('order_items', (table) => {
		table.increments()

		table.string('name', 128).notNullable();
		table.decimal('price');
		
		table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE');
		table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');

		table.timestamps();
    })
  }

  down () {
    this.drop('order_items')
  }
}

module.exports = OrderItemSchema
