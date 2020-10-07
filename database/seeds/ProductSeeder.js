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
const ImageProduct = use('App/Models/ImageProduct');
const Product = use('App/Models/Product');

const user = {
	username: 'admin',
	email: 'admin@admin.com',
	password: '123456'
};

const images = [
	"https://via.placeholder.com/400x400",
	"https://via.placeholder.com/500x500",
	"https://via.placeholder.com/600x600",
	"https://via.placeholder.com/700x700",
	"https://via.placeholder.com/800x800"
];

class ProductSeeder {
	async run() {
		try {
			const tmp = await User.create(user);
			await tmp.save();
		}
		catch {

		}

	  	const products = await Database.table('products');
		const tmp = await Factory.model('App/Models/Product').createMany(20);

		for(let product of tmp) {
			const product_id = product.id;

			for(let image of images)  {
				const ip = await ImageProduct.create({path: image, product_id: product_id});
			}
		}
	}
}

module.exports = ProductSeeder
