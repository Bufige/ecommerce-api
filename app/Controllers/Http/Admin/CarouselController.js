'use strict'

const Carousel = require('../../Models/Carousel')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with carousels
 */
class CarouselController {
	/**
	 * Show a list of all carousels.
	 * GET carousels
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, view }) {
		const images = await Carousel.all();

		return {
			data: images
		};
	}

	/**
	 * Create/save a new carousel.
	 * POST carousels
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */

	async store({ request, response }) {
		const data = request.only(['path', 'status']);

		try {
			const carousel = Carousel.create(data);
			carousel.save();

			return {
				data: carousel
			};
		}
		catch(e) {
			return response.status(422).json({error: {
				message: 'Unable to create carousel.'
			}});
		} 
	}

	/**
	 * Display a single carousel.
	 * GET carousels/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show({ params, request, response, view }) {
		const id = {params};
		try {
			const carousel = Carousel.find(id);

			return {
				data: carousel 
			};
		}
		catch(e) {
			return response.status(404).json({error: {
				message: 'Unable to retrieve carousel.'
			}}); 
		}
	}

	/**
	 * Update carousel details.
	 * PUT or PATCH carousels/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({ params, request, response }) {
		const id = {params};
		try {
			const carousel = Carousel.find(id);
			const {path, status} = request.only(['path', 'status']);
			carousel.path = path;
			carousel.status = status;
			carousel.save();

			return {
				data: carousel 
			};
		}
		catch(e) {
			return response.status(404).json({error: {
				message: 'Unable to retrieve carousel.'
			}}); 
		}
	}

	/**
	 * Delete a carousel with id.
	 * DELETE carousels/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, request, response }) {
		const {id} = params;

		try {
			const carousel = await Carousel.find(id);
			await carousel.delete();
			return response.json({data : 'Carousel has been deleted.'})
		}
		catch {
			return response.status(422).json({error: {
				message: 'Unable to delete Carousel.'
			}});
		}
	}
}

module.exports = CarouselController
