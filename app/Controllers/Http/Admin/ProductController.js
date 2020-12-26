'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Product = use('App/Models/Product');
const ImageProduct = use('App/Models/ImageProduct');

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
	/**
	 * Show a list of all products.
	 * GET products
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, view }) {
		const products = await Product.query().with('images').with('ratings').fetch()
		return {
			data:products
		};
	}

	/**
	 * Create/save a new product.
	 * POST products
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request, response, auth}) {
		const data = request.only(['name', 'description', 'price']);
		try {
			const user = await auth.getUser();
			data.discount = '0';
			data.user_id = user.id;
			
			const product = await Product.create(data);

			const images = request.input('images');

			const timages = [];

			for(let image of images) {
				const ip = await ImageProduct.create({path: image, product_id: product.id});
				await ip.save();
				timages.push(ip);
			}
			return {
				data: Object.assign({}, product.toJSON(), {images: timages})
			};
		}
		catch(e) {
			return response.status(422).json({error: {
				message: 'Unable to create product.'
			}});
		}
	}

	/**
	 * Display a single product.
	 * GET products/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show({ params, request, response, view }) {
		const {id} = params;

		try {
			const product = await Product.query().with('images').with('ratings').where('id', id).first();
			return {
				data:product 
			};
		}
		catch{
			return response.status(404).json({error: {
				message: 'Unable to retrieve product.'
			}});
		}
	}

	/**
	 * Update product details.
	 * PUT or PATCH products/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({ params, request, response }) {
		const {id} = params;
		try {
			const product = await Product.query().with('images').where('id', id).first();
			const {name, description, price, discount} = request.only(['name', 'description', 'price', 'discount']);

			product.name = name;
			product.description = description;
			product.price = price;
			if(discount)
				product.discount = discount;
			product.save();

			const images = request.input('images');

			if(images) {
				const timages = [];
				const tproduct = await Product.find(id);
				await tproduct.images().delete();

				for(let image of images) {
					const ip = await ImageProduct.create({path: image, product_id: id});
					await ip.save();
					timages.push(ip);
				}

				return {
					data: Object.assign({}, tproduct.toJSON(), {images: timages}) 
				};
			}			
			return product;
		}
		catch(e) {
			return response.status(422).json({error: {
				message: 'Unable to update product.'
			}});
		}
	}

	/**
	 * Delete a product with id.
	 * DELETE products/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, response}) {
		const {id} = params;

		try {
			const product = await Product.find(id);
			await product.delete();
			return response.json({data : 'Product has been deleted.'})
		}
		catch {
			return response.status(422).json({error: {
				message: 'Unable to delete product.'
			}});
		}
	}
}

module.exports = ProductController
