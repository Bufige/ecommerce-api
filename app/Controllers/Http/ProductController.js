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
}

module.exports = ProductController
