'use strict'

/*
|--------------------------------------------------------------------------
| ProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database');

const User = use('App/Models/User');

const user = {
	username: 'admin',
	email: 'admin@admin.com',
	password: '123456'
};

class ProductSeeder {
	async run() {
		try {
			const tmp = await User.create(user);
			await tmp.save();
		}
		catch {

		}

	  	const products = await Database.table('products');
		await Factory.model('App/Models/Product').createMany(20);
	}
}

module.exports = ProductSeeder
