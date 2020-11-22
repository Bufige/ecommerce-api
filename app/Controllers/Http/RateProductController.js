'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const RateProduct = use('App/Models/RateProduct');

/**
 * Resourceful controller for interacting with rateproducts
 */
class RateProductController {
	/**
	 * Show a list of all rateproducts.
	 * GET rateproducts
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, view }) {
		const rateProducts = await RateProduct.all();
		return {
			data: rateProducts
		};
	}

	/**
	 * Render a form to be used for creating a new rateproduct.
	 * GET rateproducts/create
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async create({ request, response, view }) {
	}

	/**
	 * Create/save a new rateproduct.
	 * POST rateproducts
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request, response }) {
		const data = request.only(['product_id', 'user_id', 'rate']);

		try {
			const rateProduct = await RateProduct.create(data);
			
			return {
				data: rateProduct
			}
		}
		catch {
			return response.status(422).json({error: {
				message: 'Unable to create product.'
			}});
		}
	}

	/**
	 * Display a single rateproduct.
	 * GET rateproducts/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show({ params, request, response, view }) {
	}

	/**
	 * Render a form to update an existing rateproduct.
	 * GET rateproducts/:id/edit
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async edit({ params, request, response, view }) {
	}

	/**
	 * Update rateproduct details.
	 * PUT or PATCH rateproducts/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({ params, request, response }) {
	}

	/**
	 * Delete a rateproduct with id.
	 * DELETE rateproducts/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, request, response }) {
	}
}

module.exports = RateProductController
